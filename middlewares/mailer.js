const nodemailer = require("nodemailer");
const dayjs = require("dayjs");

const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 465,
    auth: {
        user: "0135947@naver.com",
        pass: "attyg08821!",
    },
});

const from = '"외주123" <0135947@naver.com>';

/**
 * 회원가입, 비밀번호 재설정 메일 전송
 */
exports.forSignup = async (to, token) => {
    try {
        await transporter.sendMail({
            from,
            to,
            subject: "비밀번호 설정",
            html: `
            <div>
                <p>안녕하세요. 외주123입니다.<br/>아래 링크로 접속하여 비밀번호를 설정해주세요</p>
                <a href="${process.env.NEXT_URL}/password?t=${token}">비밀번호 설정하기</a>
            </div>
            `,
        });
        return 200;
    } catch (error) {
        return 400;
    }
};

/**
 * 프로젝트 지원 시 의뢰자에게
 */
exports.toRequester = (to, ProjectId, title) => {
    transporter.sendMail(
        {
            from,
            to,
            subject: `새 지원서 “${title}” ${dayjs().valueOf()}`,
            html: `
            <div>
                <p>안녕하세요. 외주123입니다.<br/>등록한 프로젝트에 새 지원서가 도착했습니다</p>
                <br />
                <p><b>${title}</b></p>
                <a href="${process.env.NEXT_URL}/projects/${ProjectId}">지원서 확인하기</a>
            </div>
            `,
        },
        () => {}
    );
};

/**
 * 프로젝트 의뢰 시 전문가들에게
 */
exports.toExperts = (emails, ProjectId, title, price, duration) => {
    emails.forEach((to) => {
        transporter.sendMail(
            {
                from,
                to,
                subject: `새 프로젝트 “${title}”`,
                html: `
                <div>
                    <p>안녕하세요. 외주123입니다.<br/>전문가님이 설정한 태그에 해당하는 새로운 프로젝트가 등록되어 알려드립니다</p>
                    <br />
                    <p><b>${title}</b><br/>${!price ? "계약 시 협의" : `${price}원`} · ${!duration ? "계약 시 협의" : `${duration}일`}</p>
                    <a href="${process.env.NEXT_URL}/projects/${ProjectId}">프로젝트 확인하기</a>
                </div>
                `,
            },
            () => {}
        );
    });
};
