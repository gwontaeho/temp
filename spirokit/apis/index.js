import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { persistor } from "@/redux/store";

axios.defaults.baseURL = "api";

axios.interceptors.request.use((config) => {
    const isRenewal = config.url.startsWith("/auth/renewal");
    const token = isRenewal ? getCookie("refreshToken") : getCookie("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const isRenewal = err.config.url.startsWith("/auth/renewal");
        const isUnauthorized = err.response.status === 401;
        if (isRenewal) {
            persistor.purge();
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            window.location.href = "/";
        }
        if (!isRenewal && isUnauthorized) {
            try {
                const r = await renewalToken();
                const accessToken = r?.response?.accessToken;
                setCookie("accessToken", accessToken);
                err.config.headers.Authorization = `Bearer ${accessToken}`;
                return await axios.request(err.config);
            } catch (error) {
                console.log(error);
            }
        }
        return Promise.reject(err);
    }
);

// 액세스 토큰 갱신
const renewalToken = async () => {
    const { data } = await axios.get("/auth/renewal");
    return data;
};

// 로그인
const signin = async (values) => {
    const { data } = await axios.post("/auth/sign-in", values);
    return data;
};

// 회원가입
const signup = async (values) => {
    const { data } = await axios.post("/auth/sign-up", values);
    return data;
};

// 회원가입
const duplicateCheck = async (loginId) => {
    const { data } = await axios.post("/auth/duplicate-check", { loginId });
    return data;
};

// 국가 목록 조회
const getContries = async () => {
    const { data } = await axios.get("/countries");
    return data;
};

// 기관 목록 조회
const getOrganizations = async (countryId) => {
    const { data } = await axios.get(`/countries/${countryId}/organizations`);
    return data;
};

// 직책 목록 조회
const getRoles = async (organizationId) => {
    const { data } = await axios.get(`/organizations/${organizationId}/roles`);
    return data;
};

// 피검사자 목록 조회
const getExaminees = async (name) => {
    const { data } = await axios.get(`/examinees?name=${name}`);
    return data;
};

// 피검사자 상세 정보 조회
const getExaminee = async (examineeId) => {
    const { data } = await axios.get(`/examinees/${examineeId}`);
    return data;
};

// 검사 날짜 목록 조회
const getDates = async ({ examineeId, from, to }) => {
    const { data } = await axios.get(`/examinees/${examineeId}/measurements/date?from=${from}&to=${to}`);
    return data;
};

// 검사 요약 조회
const getSimpleResult = async ({ examineeId, type, date }) => {
    const { data } = await axios.get(`/examinees/${examineeId}/measurements/simple-result?type=${type}&date=${date}`);
    return data;
};

// 결과 그래프 목록 조회
const getGraphs = async ({ examineeId, date, type, graphType }) => {
    const { data } = await axios.get(`/examinees/${examineeId}/measurements/graph?date=${date}&type=${type}&graph-type=${graphType}`);
    return data;
};

// 검사 적합성 요청
const getConformity = async ({ examineeId, type, measurementIds }) => {
    const { data } = await axios.post(`/examinees/${examineeId}/measurements/conformity?type=${type}`, { measurementIds });
    return data;
};

// 검사 상세 조회
const getDetailResult = async ({ examineeId, type, date, measurementIds }) => {
    const { data } = await axios.post(`/examinees/${examineeId}/measurements/detail-result?type=${type}&date=${date}`, { measurementIds });
    return data;
};

// FEV1 일별, 월별 트렌드 조회
const getFev1 = async ({ examineeId, from, to }) => {
    const { data } = await axios.get(`/examinees/${examineeId}/fev1?from=${from}&to=${to}`);
    return data;
};

// ==================================================================================== //

// 매니저 목록 조회
const getManagers = async ({ name = "", loginId }) => {
    const query = {
        loginId: !!loginId ? `&loginId=${loginId}` : "",
    };
    const { data } = await axios.get(`/managers?name=${name}${query.loginId}`);
    return data;
};

// 매니저 가입 승인, 거부
const updateManagerActivation = async ({ managerId, activation }) => {
    const { data } = await axios.patch(`/managers/${managerId}/activation`, { activation });
    return data;
};

// 피검사자 추가
const createExaminee = async (values) => {
    const { data } = await axios.post("/examinees", values);
    return data;
};

// 피검사자 수정
const updateExaminee = async (examineeId, values) => {
    const { data } = await axios.patch(`/examinees/${examineeId}`, values);
    return data;
};

// 결과지
const getReport = async ({ examineeId, type, date }) => {
    const { data, status } = await axios.get(`/examinees/${examineeId}/measurements/report?type=${type}&date=${date}`);
    return { ...data, status };
};

export {
    // signin
    signin,
    // signup
    signup,
    duplicateCheck,
    getContries,
    getOrganizations,
    getRoles,
    // index
    getExaminees,
    getExaminee,
    getDates,
    getSimpleResult,
    getGraphs,
    getConformity,
    getDetailResult,
    getFev1,
    getReport,
    // settings
    getManagers,
    updateManagerActivation,
    createExaminee,
    updateExaminee,
};
