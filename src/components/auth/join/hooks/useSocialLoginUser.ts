import { socialLoginUserKey } from "constants/auth";
import { useMemo } from "react";

export function useSocialLoginUser() {
  const socialLoginUser = useMemo(() => {
    const socialLoginUserString = localStorage.getItem(socialLoginUserKey);
    if (socialLoginUserString) {
      return JSON.parse(socialLoginUserString);
    } else {
      return null;
    }
  }, []);

  return { socialLoginUser, isSocialSignInUser: !!socialLoginUser };
}
