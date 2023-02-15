import axios from "axios";
import { getCookie } from "cookies-next";

// import CryptoJS from "crypto-js";
// 배포

axios.defaults.baseURL = "https://homethai365.com/api";
// axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use((config) => {
    const token = getCookie("token");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/******************************************************************************/

// const sms = async ({ content, to }) => {
//     const timestamp = Date.now().toString();
//     const serviceId = "ncp:sms:kr:298068677090:kys";
//     const accessKey = "fnMwr5h3YNZTNUTUPXb5";
//     const secretKey = "p30vrXFZ571Vkk2ehG717RaWaZUj8KvZWhDiWjxR";

//     const makeSignature = () => {
//         const space = " ";
//         const newLine = "\n";
//         const method = "POST";
//         const url = `/sms/v2/services/${serviceId}/messages`;

//         const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

//         hmac.update(method);
//         hmac.update(space);
//         hmac.update(url);
//         hmac.update(newLine);
//         hmac.update(timestamp);
//         hmac.update(newLine);
//         hmac.update(accessKey);

//         const hash = hmac.finalize();

//         return hash.toString(CryptoJS.enc.Base64);
//     };

//     const signature = makeSignature();

//     const { data } = await axios.post(
//         `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`,
//         {
//             type: "SMS",
//             from: "01083668948",
//             content,
//             messages: [{ to }],
//         },
//         {
//             headers: {
//                 "Content-type": "application/json; charset=utf-8",
//                 "x-ncp-apigw-timestamp": timestamp,
//                 "x-ncp-iam-access-key": accessKey,
//                 "x-ncp-apigw-signature-v2": signature,
//             },
//         }
//     );
//     return data;
// };

/******************************************************************************/

// 사용자 조회
const getUser = async (id) => {
    const { data } = await axios.get(`/users/${id}`);
    return data;
};

// 로그인, 회원가입
const sign = async (values) => {
    const { data } = await axios.post("/users/sign", values);
    return data;
};

// 업체등록 문의
const inquiry = async (values) => {
    const { data } = await axios.post("/users/inquiry", values);
    return data;
};

// 업체 평균 희망단가 조회
const getAveragePrices = async (values) => {
    const { data } = await axios.get("/prices");
    return data;
};

// 유저 : 약관 동의
const updateUserTerms = async (id) => {
    const { data } = await axios.put(`/users/${id}/terms`);
    return data;
};

// 업체, 유저 : 요청 생성
const createRequest = async (values) => {
    const { data } = await axios.post("/requests", values);
    return data;
};

/******************************************************************************/

// 유저 : 요청 조회
const getLastRequestOfUser = async (UserId) => {
    const { data } = await axios.get(`/requests/users/${UserId}/last`);
    return data;
};

// 유저 : 요청 취소
const cancelRequestByUser = async (id) => {
    const { data } = await axios.put(`/requests/${id}/users/cancel`);
    return data;
};

// 유저 : 요청 수락
const acceptRequestByUser = async (id) => {
    const { data } = await axios.put(`/requests/${id}/users/accept`);
    return data;
};

// 유저 : 요청 거부
const rejectRequestByUser = async (id) => {
    const { data } = await axios.put(`/requests/${id}/users/reject`);
    return data;
};

// 유저 : 요청 완료
const completeRequestByUser = async (values) => {
    const { id, ...rest } = values;
    const { data } = await axios.put(`/requests/${id}/users/complete`, rest);
    return data;
};

/******************************************************************************/

// 업체 : 특정 요청 조회
const getRequest = async (id) => {
    const { data } = await axios.get(`/requests/${id}`);
    return data;
};

// 업체 : 인근 요청 조회
const getNearbyRequests = async ({ latitude, longitude, distance, sort, filter, TargetId }) => {
    const { time } = filter;
    const { data } = await axios.get(
        `/requests?TargetId=${TargetId}&latitude=${latitude}&longitude=${longitude}&distance=${distance}&sort=${sort}&time=${time}`
    );
    return data;
};

// 업체 : 매칭된 모든 요청 조회
const getHistories = async (TargetId) => {
    const { data } = await axios.get(`/requests/targets/${TargetId}`);
    return data;
};

// 업체 : 공유목록 조회
const getShares = async (UserId) => {
    const { data } = await axios.get(`/requests/users/${UserId}/shares`);
    return data;
};

// 업체 : 요청 수락
const acceptRequestByCompany = async (values) => {
    const { id, ...rest } = values;
    const { data } = await axios.put(`/requests/${id}/targets/accept`, rest);
    return data;
};

// 업체 : 요청 완료
const completeRequestByCompany = async (id) => {
    const { data } = await axios.put(`/requests/${id}/targets/complete`);
    return data;
};

// 업체 : 요청 취소
const cancelRequestByCompany = async (id) => {
    const { data } = await axios.put(`/requests/${id}/targets/cancel`);
    return data;
};

// 업체 : 희망 단가 조회
const getPrices = async (CompanyId) => {
    const { data } = await axios.get(`/prices/companies/${CompanyId}`);
    return data;
};

// 업체 : 희망 단가 생성
const upsertPrice = async (values) => {
    const { data } = await axios.post("/prices", values);
    return data;
};

/******************************************************************************/

// 관리자 : 대시보드
const getDashboard = async () => {
    const { data } = await axios.get("/admin/dashboard");
    return data;
};

// 관리자 : 모든 업체 조회
const getCompanies = async () => {
    const { data } = await axios.get("/admin/companies");
    return data;
};

// 관리자 : 모든 사용자 조회
const getUsers = async () => {
    const { data } = await axios.get("/admin/users");
    return data;
};

// 관리자 : 업체등록 문의 조회
const getInquiries = async () => {
    const { data } = await axios.get("/admin/inquiries");
    return data;
};

// 관리자 : 업체등록 승인
const acceptInquiry = async (values) => {
    const { data } = await axios.put("/admin/inquiry-accept", values);
    return data;
};

// 관리자 : 업체등록 전체 승인
const acceptInquiryAll = async (values) => {
    const { data } = await axios.put("/admin/inquiry-accept-all", values);
    return data;
};

// 관리자 : 업체등록 거절
const rejectInquiry = async (values) => {
    const { data } = await axios.put("/admin/inquiry-reject", values);
    return data;
};

// 관리자 : 업체등록 전체 거절
const rejectInquiryAll = async (values) => {
    const { data } = await axios.put("/admin/inquiry-reject-all", values);
    return data;
};

// 관리자 : 계정 비 활성화
const blockUser = async (values) => {
    const { data } = await axios.put("/admin/user-block", values);
    return data;
};

// 관리자 : 계정 활성화
const restoreUser = async (values) => {
    const { data } = await axios.put("/admin/user-restore", values);
    return data;
};

// 관리자 : 만료일 설정
const updateExpiration = async (values) => {
    const { data } = await axios.put("/admin/company-expiration", values);
    return data;
};

// 관리자 : 콜 횟수 설정
const updateCount = async (values) => {
    const { data } = await axios.put("/admin/company-count", values);
    return data;
};

// 관리자 : 거리 설정
const updateDistance = async (values) => {
    const { data } = await axios.put("/admin/company-distance", values);
    return data;
};

// 관리자 : 이름 설정
const updateName = async (values) => {
    const { data } = await axios.put("/admin/company-name", values);
    return data;
};

// 관리자 : 로그인
const deleteDevice = async (values) => {
    const { data } = await axios.put("/admin/company-device", values);
    return data;
};

// 관리자 : 로그인
const signAdmin = async (values) => {
    const { data } = await axios.post("/admin/sign", values);
    return data;
};

// 관리자 : 업체생성
const createCompany = async (values) => {
    const { data } = await axios.post("/admin/company", values);
    return data;
};

// 관리자 : 비밀번호 변경
const updatePassword = async (values) => {
    const { data } = await axios.put("/admin/password", values);
    return data;
};

/******************************************************************************/

// 유저
export { getLastRequestOfUser, cancelRequestByUser, acceptRequestByUser, rejectRequestByUser, completeRequestByUser };

// 업체
export {
    getRequest,
    getNearbyRequests,
    getHistories,
    getShares,
    acceptRequestByCompany,
    cancelRequestByCompany,
    completeRequestByCompany,
    getPrices,
    upsertPrice,
};

// 관리자
export {
    getDashboard,
    getCompanies,
    getUsers,
    getInquiries,
    acceptInquiry,
    rejectInquiry,
    blockUser,
    restoreUser,
    updateExpiration,
    updateCount,
    updateDistance,
    signAdmin,
    createCompany,
    acceptInquiryAll,
    rejectInquiryAll,
    updateName,
    updatePassword,
    deleteDevice,
};

export {
    // sms,
    sign,
    inquiry,
    createRequest,
    getAveragePrices,
    updateUserTerms,
    getUser,
};
