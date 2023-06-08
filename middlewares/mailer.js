const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 465,
    auth: {
        user: "0135947@naver.com",
        pass: "attyg08821!",
    },
});

/**
 * 회원가입, 비밀번호 재설정 메일 전송
 * @param {string} to
 * @param {string} token
 * @returns
 */
exports.forSignup = async (to, token) => {
    try {
        await transporter.sendMail({
            from: '"외주123" <0135947@naver.com>',
            to,
            subject: "[외주123] 비밀번호 설정",
            html: `
                <table style="width: 600px; border: 1px solid #999; border-radius: 5px; text-align: center">
                    <tr>
                        <td style="padding: 20px">
                            <p>아래 버튼을 눌러 비밀번호를 설정해주세요</p>
                            <a href="http://localhost:3000/password?t=${token}">
                                <button style="border-radius: 3px; padding: 10px; width: 100%; max-width: 300px; background-color: #fff; border: 1px solid #999">
                                    비밀번호 설정하기
                                </button>
                            </a>
                        </td>
                    </tr>
                </table>
                `,
        });
        return 200;
    } catch (error) {
        return 400;
    }
};

/**
 * 프로젝트 지원 시 의뢰자에게
 * @param {string} to
 * @param {string} title
 */
exports.toRequester = (to, title) => {
    try {
        transporter.sendMail({
            from: '"Fred Foo 👻" <0135947@naver.com>', // sender address
            to, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
    } catch (error) {}
};

/**
 * 프로젝트 의뢰 시 전문가들에게
 * @param {string} to
 * @param {string} title
 * @param {string} content
 * @param {string} price
 * @param {string} duration
 */
exports.toExperts = (bcc, title, content, price, duration) => {
    try {
        transporter.sendMail({
            from: '"Fred Foo 👻" <0135947@naver.com>', // sender address
            bcc,
            subject: "", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
    } catch (error) {}
};

// let test = await transporter.sendMail({
//     from: '"OUTSOURCING" <0135947@naver.com>', // sender address
//     to: email,
//     subject: "SUBJECT",
//     html:
//`<table border="0" cellpadding="0" cellspacing="0" width="100%" bgColor="#F4F5F7" style="padding: 20px 16px 82px; color: #191919; font-family: 'Noto Sans KR', sans-serif;" class="wrapper">
//     <tbody style="display: block; max-width: 600px; margin: 0 auto;">
//       <tr width="100%" style="display: block;">
//         <td width="100%" style="display: block;">
//           <table width="100%" border="0" cellpadding="0" cellspacing="0" bgColor="#FFFFFF" style="display: inline-block; padding: 32px; text-align: left; border-top: 3px solid #008000; border-collapse: collapse;" class="container">
//             <tbody style="display: block;">

//               <tr>
//                 <td style="padding-bottom: 32px; font-size: 20px; font-weight: bold;">
//                   <p>OUTSOURCING</p>
//                 </td>
//               </tr>

//               <tr width="100%" style="display: block; margin-bottom: 32px;">
//                 <td width="100%" style="display: block;">
//                   <table border="0" cellpadding="0" cellspacing="0" width="100%" bgColor="#F8F9FA" style="padding: 40px 20px; border-radius: 4px; text-align: center;" class="content">
//                     <tbody style="display: block;">
//                       <tr style="display: block;">
//                         <td style="display: block; font-size: 32px; font-weight: bold;">
//                           ${code}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>

//               <tr>
//                 <td style="padding-bottom: 24px; color: #A7A7A7; font-size: 12px; line-height: 20px;">© 2022 Bigpicture Interactive Co., Ltd. All Rights Reserved.</td>
//               </tr>

//               <tr width="100%" style="display:block; padding-top: 24px; border-top: 1px solid #e9e9e9;">
//                 <td style="position: relative;">
//                 푸터내용
//                 </td>
//               </tr>

//             </tbody>
//           </table>
//         </td>
//       </tr>
//     </tbody>
//   </table>`,
// });
