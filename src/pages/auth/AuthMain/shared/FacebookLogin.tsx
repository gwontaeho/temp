import { useState } from "react";
import LibraryFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

interface Props {
  onSuccess: (response: any) => void;
  children: React.ReactNode;
}

export default function FacebookLogin({ onSuccess, children }: Props) {
  const [autoLoad, setAutoLoad] = useState(false);

  return (
    <LibraryFacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID!}
      autoLoad={autoLoad}
      callback={(ressponse) => {
        if (autoLoad) {
          onSuccess(ressponse);
        }
      }}
      render={() => <div onClick={() => setAutoLoad(true)}>{children}</div>}
      scope="public_profile, email, user_birthday"
      fields="name, email, picture, birthday"
    />
  );
}
