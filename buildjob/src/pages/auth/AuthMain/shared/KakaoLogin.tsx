import LibraryKakaoLogin from "react-kakao-login";

interface Props {
  onSuccess: (response: any) => void;
  children: React.ReactNode;
}

export default function KakaoLogin({ onSuccess, children }: Props) {
  return (
    <LibraryKakaoLogin
      token={process.env.REACT_APP_KAKAO_JAVASCRIPT_API_KEY!}
      onFail={console.log}
      onSuccess={onSuccess}
      render={({ onClick }) => {
        return <div onClick={onClick}>{children}</div>;
      }}
    />
  );
}
