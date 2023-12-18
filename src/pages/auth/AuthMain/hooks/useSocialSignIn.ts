import { useMutation } from "@tanstack/react-query";
import { accessTokenKey, restUserKey } from "constants/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import { storeSocialUserOnLocalStorage } from "../utils/socialUserOnLocalStorage";

export function useSocialSignIn() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userSelector);

  return useMutation(async ({ type, id }: ISocialUser) => {
    const {
      data: { status, respdata },
    } = await api.post(eps["SIGN_IN_SOCIAL"], {
      socialid: id,
      socialtype: type,
    });

    const isJoin = respdata?.isjoinprocesscomplete;
    const token = respdata.token;

    if (status === "ERR" || !token) {
      toast("로그인에 실패했습니다.", { position: toast.POSITION.TOP_LEFT });
      return;
    }

    if (!isJoin) {
      storeSocialUserOnLocalStorage({
        type,
        id,
        token,
        uuid: respdata.uuid,
      });
      navigate("/auth/join");
    } else {
      localStorage.removeItem(restUserKey);
      setUser({
        socialId: id,
        socialType: type,
        phoneNumber: respdata.phonenumber,
        password: respdata.password,
        userName: respdata.username,
        urlProfileImage: respdata.urlprofileimage,
        level: respdata.level,
        myRefererCode: respdata.myreferercode,
        parentCode: respdata.parentcode,
      });
      localStorage.setItem(accessTokenKey, respdata.token);
      toast("성공적으로 로그인됨", { position: toast.POSITION.TOP_LEFT });
      navigate("/home");
    }
  });
}
