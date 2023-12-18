import axios from "axios";
import { accessTokenKey } from "constants/auth";
import { sortMap } from "data/hire/D_hire";
import { apiBaseURL } from "./stored";

export const api = axios.create({ baseURL: apiBaseURL });

api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem(accessTokenKey) ?? null;
    config.headers["Authorization"] = accessToken;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const eps = {
  USERINFO: "/queriesauth/data/users",
  USERSTATUS: "/users/mystatus",
  USER_EDIT_PROFILEIMG: "/users/profileimage",
  VERIFYCODE: "/users/phoneverifycode",
  SIGNUP: "/users/join",
  SIGN_UP_SOCIAL: (uuid: string) => `/queriesauth/users/uuid/${uuid}`,
  SIGNIN: "/users/login",
  SIGN_IN_SOCIAL: `/users/social/login`,
  SIGN_OUT: "/users/logout",
  REGISTER_RESUME: "/queriesauth/resumes",
  REGISTER_JOB: "/queriesauth/jobposts",
  REGISTER_CAREER: "/queriesauth/career",
  REGISTER_COMPANY: "/queriesauth/affiliations",

  GET_JOBPOSTS: (offset: number, limit: number, iscomplete: number) =>
    `/queriesauth/rows/jobposts/iscomplete/${iscomplete}/${offset}/${limit}/id/DESC`,

  JOB_POSTS: (id: number) => `/queriesauth/jobposts/${id}`,
  JOB_POST: (uuid: number) => `/queries/singlerow/jobposts/uuid/${uuid}`,
  RESUMES: (offset: number, limit: number) =>
    `/queriesauth/rows/resumes/${offset}/${limit}/id/DESC`,
  CHANGE_RESUME: (id: number) => `/queriesauth/resumes/${id}`,
  CHANGE_ALARM_SETTING: `/queriesauth/toggle/userprefs`,
  MY_ALARMS_SETTING: `/queriesauth/rows/userprefs/active/1/0/10/id/DESC`,
  POST_PARENT_REFERRAL: (code: string) => `users/parent/${code}`,
  GET_BAN: (code: number, offset: number, limit: number) =>
    `/queriesauth/rows/bans/status/${code}/${offset}/${limit}/id/DESC`,
  GET_PENALTY: `/queries/singlerow/settings/key_/penaltyreceiveaccount`,
  PAYMENT_HISTORY: (offset: number, limit: number) =>
    `/queriesauth/rows/logpayments/${offset}/${limit}/id/DESC`,
  GET_BAN_INFO: (code: number) => `/users/bans/${code}`,
  EDIT_PASSWORD: `users/pw`,
  QUIT: `users/quit`,
  SUPPORT_TYPES: `/queries/rows/catdata/group_/interview/0/10/id/DESC`,
  TEMP_SAVE_JOB_POST: (uuid: string) => `/queriesauth/jobposts/uuid/${uuid}`,
  CHECK_IMG_SIZE: `/queries/singlerow/settings/key_/MAX-REQ-BODY-SIZE-IN-BYTES`,
  BAN_PAID: (code: number) => `/bans/paid/${code}`,
  GET_HIRE: `queries/rows/catdata/group_/hire/0/200/id/DESC`,
  GET_REGION: `queries/rows/catdata/group_/region/0/300/id/DESC`,
  GET_JOBTYPE: `queries/rows/catdata/group_/jobtype/0/200/id/DESC`,

  GET_APPLICANTS: (offset: number, limit: number) =>
    `/hireprocess/applicants/${offset}/${limit}/`,

  COMMUTE_TYPE_LIST: `/queries/rows/catdata/group_/commute/0/200/id/DESC`,
  GET_FAVORITE: (uuid: string) =>
    `/queriesauth/singlerow/favorites/itemuuid/${uuid}`,
  GET_FAVORITES: `/queriesauth/rows/favorites/0/1000/id/DESC`,
  PUT_FAVORITE: `/queriesauth/toggle/favorites`,
  GET_JOB_DETAIL: (uuid: string) => `/queries/singlerow/jobposts/uuid/${uuid}`,
  GET_RESUME: (uuid: string) => `/queries/singlerow/resumes/uuid/${uuid}`,
  GET_COMMENTS: (uuid: string) =>
    `/queries/rows/comments/jobpostuuid/${uuid}/0/1000/id/DESC`,
  POST_COMMENT: `/queriesauth/comments`,
  GET_LAST_LOGIN: `/queriesauth/rows/loglogins/0/2/id/DESC`,
  GET_APPLICANT_INFO: (uuid: string) => `/hireprocess/applicant-detail/${uuid}`,

  GET_FRANCHISEE: (offset: number, limit: number) =>
    `/queries/rows/merchants/active/1/${offset}/${limit}/id/DESC`,
  GET_FRANCHISEE_BY_DISTANCE: (
    offset: number,
    limit: number,
    latitude: number,
    longitude: number
  ) =>
    `/queries/bydistance/merchants/${offset}/${limit}/${latitude}/${longitude}`,

  GET_NOTIFICATIONS: (offset: number, limit: number) =>
    `/queriesauth/rows/notifies/active/1/${offset}/${limit}/id/DESC`,
  GET_BANNERS: (offset: number, limit: number) =>
    `/queries/rows/banners/active/1/${offset}/${limit}/id/DESC`,
  GET_NEW_JOB_POSTS: (offset: number, limit: number) =>
    `/queries/rows/jobposts/active/1/${offset}/${limit}/id/DESC`,
  GET_PERSONS: (offset: number, limit: number) =>
    `/hireprocess/applicants/${offset}/${limit}/rating/DESC`,
  GET_STORES: (offset: number, limit: number) =>
    `/queries/rows/merchants/active/1/${offset}/${limit}/id/DESC`,
  GET_STORES_BY_DISTANCE: (
    offset: number,
    limit: number,
    latitude: number,
    longitude: number
  ) =>
    `/queries/bydistance/merchants/${offset}/${limit}/${latitude}/${longitude}`,
  GET_ADS_BANNERS: (offset: number, limit: number) =>
    `/queries/rows/adbanners/active/1/${offset}/${limit}/id/DESC`,
  TOGGLE_RESUME: (uuid: string) =>
    `/queriesauth/toggle/resumes/uuid/${uuid}/isdefault`,
  GET_JOB_POSTS_PAGINATION: (
    offset: number,
    limit: number,
    sortKey: ISortKey = "DESC"
  ) =>
    `/hireprocess/jobposts/${offset}/${limit}/${sortMap[sortKey].value}?iscomplete=1`,

  GET_RESUME_CAREER: (uuid: string, offset: number, limit: number) =>
    `/queriesauth/rows/career/resumeuuid/${uuid}/${offset}/${limit}/id/DESC`,
  DELETE_RESUME_CAREER: (uuid: string | undefined) =>
    `/queriesauth/career/hard/uuid/${uuid}`,

  UPDATE_USER: (uuid: string) => `/queriesauth/users/uuid/${uuid}`,
  SEARCH_JOB_POSTS: (offset: number, limit: number, search: string) =>
    `/queries/rows/jobposts/active/1/${offset}/${limit}/id/DESC?searchkey=${search}`,
  GET_SEARCH: (limit: number) =>
    `/queries/suggest-on-searchkey/jobposts/${limit}`,
  GET_JOBTYPES: `/queries/rows/catdata/group_/jobtype/0/200/id/DESC?filterkey=level&filterval=1`,
  GET_HOT_JOB_POSTS: (offset: number, limit: number) =>
    `/queries/rows/jobposts/active/1/${offset}/${limit}/countviews/DESC`,
  GET_POPULAR_SEARCH_KEYWORDS: (offset: number, limit: number) =>
    `/queriesauth/rows/searchwords/${offset}/${limit}/count/DESC`,
  GET_RECENT_SEARCH_KEYWORD: (offset: number, limit: number) =>
    `/queriesauth/rows/searchwords/${offset}/${limit}/id/DESC?authfielduid=true`,
};
