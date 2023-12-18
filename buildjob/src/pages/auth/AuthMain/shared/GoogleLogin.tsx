import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface Props {
  onSuccess?: (response: any) => void;
  children: React.ReactNode;
}

export default function GoogleLoginWithProvider(props: Props) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_API_KEY!}
    >
      <GoogleLogin {...props} />
    </GoogleOAuthProvider>
  );
}

function GoogleLogin({ onSuccess, children }: Props) {
  const login = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ access_token, token_type }) => {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `${token_type} ${access_token}` },
        }
      );
      onSuccess?.(data);
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "implicit",
  });

  return <div onClick={() => login()}>{children}</div>;
}
