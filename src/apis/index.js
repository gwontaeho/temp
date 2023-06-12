import axios from "axios";
import { getCookie } from "cookies-next";

axios.interceptors.request.use((config) => {
    const token = getCookie("token");
    if (!!token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/**
 * 이메일 알람 on, off
 * @returns
 */
export const toggleNotification = async () => {
    const { data } = await axios.put("/api/users/toggle-notification");
    return data;
};

/**
 * 회원가입, 비밀번호 재설정 이메일 전송
 * @returns
 */
export const sendEmail = async ({ email }) => {
    const { data } = await axios.post("/api/users/email", { email });
    return data;
};

/**
 * 회원가입, 비밀번호 재설정
 * @returns
 */
export const signup = async ({ token, password }) => {
    const { data } = await axios.post("/api/users/signup", { token, password });
    return data;
};

/**
 * 로그인
 * @returns
 */
export const signin = async ({ email, password }) => {
    const { data } = await axios.post("/api/users/signin", { email, password });
    return data;
};

/**
 * 사용자 정보 조회
 * @returns
 */
export const getUser = async () => {
    const { data } = await axios.get("/api/users");
    return data;
};

/**
 * 전문가 정보 조회
 * @returns
 */
export const getExpert = async () => {
    const { data } = await axios.get("/api/experts");
    return data;
};

/**
 * 전문가 정보 등록, 수정
 * @returns
 */
export const updateExpert = async ({ nickname, contact, introduction, tags }) => {
    const { data } = await axios.post("/api/experts", { nickname, contact, introduction, tags });
    return data;
};

/**
 * 프로젝트 등록
 * @returns
 */
export const createProject = async ({ title, content, price, duration, tags }) => {
    const { data } = await axios.post("/api/projects", { title, content, price, duration, tags });
    return data;
};

/**
 * 프로젝트 지원
 * @returns
 */
export const createApplication = async ({ ProjectId, content }) => {
    const { data } = await axios.post("/api/applications", { ProjectId, content });
    return data;
};

/**
 * 의뢰한 프로젝트 목록
 * @returns
 */
export const getRequests = async () => {
    const { data } = await axios.get("/api/projects/requests");
    return data;
};

/**
 * 지원한 프로젝트 목록
 * @returns
 */
export const getApplications = async () => {
    const { data } = await axios.get("/api/applications");
    return data;
};

/**
 * 최근 등록된 프로젝트 목록
 * @returns
 */
export const getRecents = async () => {
    const { data } = await axios.get("/api/projects/recents");
    return data;
};

/**
 * 프로젝트 마감
 * @returns
 */
export const closeProject = async ({ ProjectId }) => {
    const { data } = await axios.put(`/api/projects/${ProjectId}`);
    return data;
};

/**
 * 알림 목록
 * @returns
 */
export const getNotifications = async () => {
    const { data } = await axios.get("/api/notifications");
    return data;
};

/**
 * 프로젝트 목록
 * @returns
 */
export const getProjects = async ({ perPage, page, tags }) => {
    const { data } = await axios.get(`/api/projects?perPage=${perPage}&page=${page}&tags=${tags}`);
    return data;
};

/**
 * 프로젝트
 * @returns
 */
export const getProject = async ({ ProjectId }) => {
    const { data } = await axios.get(`/api/projects/${ProjectId}`);
    return data;
};

/**
 * 모든 태그 조회
 * @returns
 */
export const getTags = async () => {
    const { data } = await axios.get("/api/tags");
    return data;
};
