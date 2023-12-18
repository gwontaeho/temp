import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userSelector } from "states/user";
import { api } from "utils/config";

export function AxiosInterceptor() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userSelector);

  useEffect(() => {
    const intercetpor = api.interceptors.response.use(
      (response) => {
        if (!response) return response;
        const data = response.data;
        if (data?.message === "ROGUE-USER") {
          if (data?.mystatus === "banned") {
            navigate("/mypage/block/locked");
          } else if (data?.mystatus === "suspended") {
            navigate("/mypage/block/limited");
          }
        }
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          setUser(null);
          navigate("/auth");
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      api.interceptors.response.eject(intercetpor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return null;
}
