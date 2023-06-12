const express = require("express");
const router = express();
const { Application, Project, Notification, User } = require("../models");
const { authorization } = require("../middlewares/jwt");
const { toRequester } = require("../middlewares/mailer");

/**
 * 지원한 프로젝트
 */
router.get("/", authorization, async (req, res, next) => {
    const UserId = req.verified.id;
    try {
        const applications = await Application.findAll({
            attributes: ["id", "createdAt"],
            include: [{ model: Project, attributes: ["id", "title", "price", "duration", "isOpen"] }],
            where: { UserId },
            order: [
                [Project, "isOpen", "DESC"],
                ["createdAt", "DESC"],
            ],
            raw: true,
            nest: true,
        });
        return res.send(applications);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 프로젝트 지원
 */
router.post("/", authorization, async (req, res, next) => {
    const UserId = req.verified.id;
    const { content, ProjectId } = req.body;

    try {
        await Application.create({ content, UserId, ProjectId });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    try {
        /**
         * 프로젝트 지원 시 의뢰자에게 알림 전송
         */
        const project = await Project.findByPk(ProjectId, {
            attributes: ["title"],
            include: [{ model: User, attributes: ["id", "email"] }],
            raw: true,
            nest: true,
        });
        User.update({ hasNewNotification: true }, { where: { id: project.User.id } });
        Notification.create({
            title: "새 지원서가 도착했습니다",
            content: `프로젝트 : ${project.title}`,
            href: `/projects/${ProjectId}`,
            UserId: project.User.id,
        });
        toRequester(project.User.email, ProjectId, project.title);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
