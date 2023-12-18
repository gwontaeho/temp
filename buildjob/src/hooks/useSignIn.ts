import { useMutation } from "@tanstack/react-query";
import { accessTokenKey, restUserKey } from "constants/auth";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";

export function useSignIn() {
  const setUser = useSetRecoilState(userSelector);

  return useMutation(async ({ phoneNumber, password }: Ilogin) => {
    const data = await api.post(eps["SIGNIN"], {
      phonenumber: phoneNumber,
      password,
    });

    if (data?.data?.status === "ERR") {
      toast("아이디와 비밀번호를 확인해주세요.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return false;
    }

    var respdata = data.data.respdata;
    localStorage.removeItem(restUserKey);
    setUser({
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

    return true;
  });
}
