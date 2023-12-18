import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <ul className={styles.index}>
      <li onClick={() => navigate("/intro")}>인트로</li>
      <li onClick={() => navigate("/home")}>홈</li>
      <li onClick={() => navigate("/search")}>검색</li>
      <li onClick={() => navigate("/notice")}>알림</li>
      <li onClick={() => navigate("/hire")}>채용</li>
      <li onClick={() => navigate("/hire/0")}>채용 상세</li>
      <li onClick={() => navigate("/hire/0/detailcontent")}>
        채용 상세 모집 요강
      </li>
      <li onClick={() => navigate("/hire/0/apply")}>지원하기</li>
      <li onClick={() => navigate("/auth")}>소셜</li>
      <li onClick={() => navigate("/auth/join")}>회원가입</li>
      <li onClick={() => navigate("/person")}>인재찾기</li>
      <li onClick={() => navigate("/person/0")}>인재 상세</li>
      <li onClick={() => navigate("/franchisee")}>가맹점</li>
      <li onClick={() => navigate("/mypage/resume")}>이력서 등록</li>
      <li
        onClick={() =>
          navigate("/mypage/resume", { state: { autoSave: true } })
        }
      >
        이력서 등록 (작성중이던 이력서 있음)
      </li>
      <li onClick={() => navigate("/mypage/resume/enroll")}>
        이력서 등록 (기본정보)
      </li>
      <li
        onClick={() =>
          navigate("/mypage/resume/enroll", { state: { progress: 2 } })
        }
      >
        이력서 등록 (근무조건)
      </li>
      <li
        onClick={() =>
          navigate("/mypage/resume/enroll", { state: { progress: 3 } })
        }
      >
        이력서 등록 (경력)
      </li>
      <li onClick={() => navigate("/mypage/company/jobopening/enroll")}>
        공고 등록 (모집내용을 입력해 주세요.)
      </li>
      <li
        onClick={() =>
          navigate("/mypage/company/jobopening/enroll", {
            state: { process: 20 },
          })
        }
      >
        공고 등록 (근무 조건을 선택해 주세요.)
      </li>
      <li
        onClick={() =>
          navigate("/mypage/company/jobopening/enroll", {
            state: { process: 50 },
          })
        }
      >
        공고 등록 (지원조건·기간을 선택해 주세요.)
      </li>
      <li
        onClick={() =>
          navigate("/mypage/company/jobopening/enroll", {
            state: { process: 75 },
          })
        }
      >
        공고 등록 (상세모집내용을 입력해 주세요.)
      </li>
      <li
        onClick={() =>
          navigate("/mypage/company/jobopening/enroll", {
            state: { process: 90 },
          })
        }
      >
        공고 등록 (회사 정보를 입력해 주세요.)
      </li>
      <li onClick={() => navigate("/mypage/company/jobopening")}>공고 관리</li>
      <li
        onClick={() =>
          navigate("/mypage/company/jobopening", { state: { autoSave: true } })
        }
      >
        공고 관리 (작성중이던 공고 있음)
      </li>
      <li onClick={() => navigate("/mypage/apply")}>지원현황</li>
      <li onClick={() => navigate("/mypage/apply/0/resume")}>지원이력서</li>
      <li onClick={() => navigate("/mypage")}>MY PAGE</li>
      <li onClick={() => navigate("/mypage/edit")}>
        회원정보수정 (개인정보수정)
      </li>
      <li onClick={() => navigate("/mypage/edit", { state: { category: 1 } })}>
        회원정보수정 (비밀번호 변경)
      </li>
      <li onClick={() => navigate("/mypage/edit", { state: { category: 2 } })}>
        회원정보수정 (회원탈퇴)
      </li>
      <li onClick={() => navigate("/mypage/scrab")}>스크랩</li>
      <li onClick={() => navigate("/mypage/offer")}>받은제안</li>
      <li onClick={() => navigate("/mypage/company")}>기업서비스</li>
      <li onClick={() => navigate("/mypage/company/apply")}>지원확인</li>
      <li onClick={() => navigate("/mypage/company/apply/0")}>지원이력서</li>
      <li onClick={() => navigate("/mypage/company/payhistory")}>결제내역</li>
      <li onClick={() => navigate("/mypage/history")}>내역 (적립)</li>
      <li
        onClick={() =>
          navigate("/mypage/history", { state: { category: "결제" } })
        }
      >
        내역 (결제)
      </li>
      <li onClick={() => navigate("/alarm/setting")}>알림설정</li>
      <li
        onClick={() =>
          navigate("/alarm/setting", { state: { enablePopup: true } })
        }
      >
        알림설정 (기기알림)
      </li>
      <li onClick={() => navigate("/hire/0/comment/1")}>댓글</li>
      <li onClick={() => navigate("/mypage", { state: { qrPopup: true } })}>
        Qr
      </li>
      <li onClick={() => navigate("/auth/comeagain")}>재로그인</li>
      <li onClick={() => navigate("/mypage/referral")}>추천인</li>
      <li onClick={() => navigate("/notice/payHire/0")}>
        채용 결제 (기본정보)
      </li>
      <li
        onClick={() => navigate("/notice/payHire/0", { state: { process: 2 } })}
      >
        채용 결제 (결제완료)
      </li>
      <li onClick={() => navigate("/mypage/block/locked")}>계정정지</li>
      <li onClick={() => navigate("/mypage/block/limited")}>이용제한</li>
      <li onClick={() => navigate("/mypage/block/penalty")}>위약금 납부</li>
      <li onClick={() => navigate("/mypage/company/hire_situation")}>
        채용 현황
      </li>
      <li
        onClick={() => navigate("/mypage/company/hire_situation/cancel_hire/0")}
      >
        채용 취소
      </li>
      <li
        onClick={() => navigate("/mypage/company/hire_situation/review_hire/0")}
      >
        인재 평가 및 리뷰
      </li>
      <li onClick={() => navigate("/home", { state: { reviewPopup: true } })}>
        인재평가
      </li>
      <li onClick={() => navigate("/home", { state: { referralPopup: true } })}>
        초대 팝업
      </li>
      <li onClick={() => navigate("/home", { state: { noticePopup: true } })}>
        공지사항 팝업
      </li>
      <li onClick={() => navigate("/mypage/setting")}>설정</li>
      <li onClick={() => navigate("/auth/simplelogin")}>로그인</li>
      <li onClick={() => navigate("/terms")}>Terms of Service</li>
    </ul>
  );
}
