const express = require("express");
const router = express();
const { Op } = require("sequelize");
const { Project, Application, Tag, User, Expert } = require("../models");
const { authorization, verifyToken } = require("../middlewares/jwt");
const { toExperts } = require("../middlewares/mailer");

/**
 * 프로젝트 생성
 */
router.post("/", authorization, async (req, res, next) => {
    const UserId = req.verified.id;
    const { title, content, price, duration, tags } = req.body;

    try {
        await Project.create({ title, content, price, duration, tags, UserId });
        res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }

    try {
        const t = tags.split(",").map((name) => ({ tags: { [Op.substring]: name } }));
        const where = { [Op.or]: t };
        const experts = await Expert.findAll({
            attributes: ["tags"],
            where,
            include: [{ model: User, attributes: ["email"], where: { isAllowedNotification: true } }],
            raw: true,
            nest: true,
        });
        if (!experts.length) return;
        const mails = experts.map((v) => ({
            ...v.User,
            tags: v.tags
                .split(",")
                .filter((vv) => tags.includes(vv))
                .toString(),
            title,
            price,
            duration,
        }));
    } catch (error) {
        console.log(error);
    }
});

/**
 * 프로젝트 마감
 */
router.put("/:id", authorization, async (req, res, next) => {
    const UserId = req.verified.id;
    const { id } = req.params;
    try {
        await Project.update({ isOpen: false }, { where: { id, UserId } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 최근 등록된 프로젝트
 */
router.get("/recents", async (req, res, next) => {
    try {
        const ps = await Project.findAll({
            attributes: ["id", "title", "price", "duration", "createdAt"],
            order: [["createdAt", "DESC"]],
            limit: 6,
            raw: true,
        });
        return res.send(ps);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 의뢰한 프로젝트
 */
router.get("/requests", authorization, async (req, res, next) => {
    const { id } = req.verified;

    try {
        const projects = await Project.findAll({
            include: [{ model: Application, attributes: ["id"] }],
            where: { UserId: id },
            order: [
                ["isOpen", "DESC"],
                ["createdAt", "DESC"],
            ],
        });

        return res.send(projects);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 프로젝트 조회
 */
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const project = await Project.findByPk(id, { raw: true });
        if (!project) return res.sendStatus(400);

        let isR = false;
        let isA = false;
        let As = [];
        let A = {};

        const token = req.headers.authorization?.replace("Bearer ", "");
        const UserId = verifyToken(token)?.id;

        if (!!UserId) {
            isR = project.UserId === UserId;
            if (isR)
                As = await Application.findAll({
                    attributes: ["content", "createdAt"],
                    where: { ProjectId: id },
                    include: [{ model: User, attributes: ["email"], include: [{ model: Expert, attributes: ["nickname", "introduction", "tags"] }] }],
                    raw: true,
                    nest: true,
                    order: [["createdAt", "ASC"]],
                });
            const application = await Application.findOne({
                attributes: ["content", "createdAt"],
                where: { ProjectId: id, UserId },
                include: [{ model: User, attributes: ["email"], include: [{ model: Expert, attributes: ["nickname", "introduction", "tags"] }] }],
                raw: true,
                nest: true,
            });
            isA = !!application;
            if (isA) A = application;
        }

        project.isOpen = !!project.isOpen;
        project.isApplied = isA;
        project.isRequested = isR;
        project.Applications = As;
        project.Application = A;

        return res.send(project);
    } catch (error) {
        return res.sendStatus(500);
    }
});

/**
 * 프로젝트 목록
 */
router.get("/", async (req, res, next) => {
    const { perPage, page, tags } = req.query;
    const limit = Number(perPage);
    const offset = limit * (Number(page) - 1);
    const t = tags.split(",");

    const token = req.headers.authorization?.replace("Bearer ", "");
    const UserId = verifyToken(token)?.id;

    try {
        const allTags = await Tag.findAll();
        const t2 = allTags.filter(({ sequence }) => t.includes(String(sequence))).map(({ name }) => ({ tags: { [Op.substring]: name } }));
        const where = t2.length === 0 ? {} : { [Op.or]: t2 };

        let { count, rows } = await Project.findAndCountAll({
            limit,
            offset,
            where,
            order: [
                ["isOpen", "DESC"],
                ["createdAt", "DESC"],
            ],
            raw: true,
        });

        if (!!UserId) {
            const applications = await Application.findAll({ attributes: ["ProjectId"], where: { UserId }, raw: true });
            rows = rows.map((v) => ({ ...v, isApplied: applications.some((vv) => vv.ProjectId === v.id), isRequested: v.UserId === UserId }));
        }

        return res.send({ count, rows });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;
