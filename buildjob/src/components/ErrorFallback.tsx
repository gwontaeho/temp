import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  error: any;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: Props) {
  const navigate = useNavigate();

  const isGoHome = error.message === "invalid request";
  const buttonText = isGoHome ? "홈으로" : "다시 시도";

  const onClickHandler = () => {
    if (isGoHome) {
      navigate("/home");
    }
    resetErrorBoundary();
  };

  useEffect(() => {
    if (error?.response?.status === 401) {
      navigate("/auth");
      resetErrorBoundary();
    }
  }, [error, navigate, resetErrorBoundary]);

  return (
    <div>
      에러입니다. 다시 시도해주세요.
      <button type="button" onClick={onClickHandler}>
        {buttonText}
      </button>
    </div>
  );
}

export default ErrorFallback;
