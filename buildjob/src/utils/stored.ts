import { accessTokenKey } from "constants/auth";

// 이후 프론트 url 생기면 바꿔야함.
export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://localhost:3000";
export const loginRedirectUrl = `${baseUrl}/auth`;
export const apiBaseURL = "https://buildjob.co:32535";
export const AUTH_TOKEN = localStorage.getItem(accessTokenKey);
