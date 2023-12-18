import { useEffect, useRef } from "react";
import { loginRedirectUrl } from "utils/stored";

export default function NaverLogin({
  onSuccess,
  children,
}: {
  onSuccess?: (response: any) => void;
  children: React.ReactNode;
}) {
  const naverRef = useRef(null);

  function handleLogout() {
    localStorage.removeItem("com.naver.nid.access_token");
    localStorage.removeItem("com.naver.nid.oauth.state_token");
  }

  useEffect(() => {
    const iniitializeNaverLogin = () => {
      const { naver } = window as any;

      const naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.REACT_APP_NAVER_CLIENT_API_KEY,
        callbackUrl: loginRedirectUrl,
        isPopup: false,
        loginButton: { color: "green", type: 1 },
        callbackHandle: true,
      });
      naverLogin.init();

      naverLogin.getLoginStatus(async function (status: any) {
        if (status) {
          onSuccess?.(naverLogin);
          handleLogout();
        }
      });
    };

    iniitializeNaverLogin();
  }, [onSuccess]);

  return (
    <div>
      <div id="naverIdLogin" ref={naverRef} style={{ display: "none" }}></div>
      <div
        onClick={() => {
          (naverRef.current as any)?.children[0].click();
        }}
      >
        {children}
      </div>
    </div>
  );
}
