import EnrollAnounce from "assets/images/example/home/EnrollAnounce.png";
import FindAnounce from "assets/images/example/home/FindAnounce.png";
import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import { ReactComponent as Magnifier } from "assets/images/icon/Magnifier.svg";
import BottomNavBar from "components/bottomBar/bottomNavBar";
import FloatingActBtns from "components/common/floatingAction/floatingActBtns";
import PopupBg from "components/common/popupBg";
import NoticePopup from "components/home/noticePopup";
import ReferralPopup from "components/home/referralPopup";
import ReviewPopup from "components/home/reviewPopup";
import { D_homeSlickBackgoundList } from "data/D_home";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdBanners } from "./AdBanners";
import { Banners } from "./Banners";
import { FindPersons } from "./FindPersons";
import { Franchisee } from "./Franchisee";
import HomeHeader from "./Header";
import { HotJobPosts } from "./HotJobPosts";
import { NewJobPosts } from "./NewJobPosts";
import styles from "./index.module.scss";
import { api, eps } from "utils/config";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    const [slackIndex, setSlackIndex] = useState<number>(0);
    const [reviewPopup, setReviewPopup] = useState<boolean>(location.state?.reviewPopup || false);
    const [referralPopup, setReferralPopup] = useState<boolean>(location.state?.referralPopup || false);
    const [noticePopup, setNoticePopup] = useState<boolean>(location.state?.noticePopup || false);

    async function getUserStatus() {
        // try {
        //   let { data }  = await api.get(eps["USERSTATUS"]);
        //   data?.canileavereview && setReviewPopup(true)
        // } catch (err) {
        //   console.log(err);
        // }
    }

    useEffect(() => {
        getUserStatus();
    }, []);

    return (
        <>
            <HomeHeader />

            <main className={styles.home}>
                <section className={styles.indexSec}>
                    <article className={styles.bgArea} style={{ background: D_homeSlickBackgoundList[slackIndex % 3] }} />

                    <article className={styles.searchBar} onClick={() => navigate("/search")}>
                        <p className={styles.placeholder}>회계, 직무 검색</p>
                        <Magnifier />
                    </article>

                    <article className={styles.slickArea}>
                        <Banners setSlackIndex={setSlackIndex} />
                    </article>
                </section>

                <NewJobPosts />
                <HotJobPosts />

                <section className={`${styles.listSec} ${styles.personSec}`}>
                    <article className={styles.titleArea}>
                        <h1 className={styles.secTitle}>미리보는 인기 인재</h1>

                        <button className={styles.pageBtn} onClick={() => navigate("/person")}>
                            <p>전체보기</p>
                            <ChevronRight />
                        </button>
                    </article>

                    <FindPersons />
                </section>

                <section className={`${styles.listSec} ${styles.companySec}`}>
                    <article className={styles.titleArea}>
                        <h1 className={styles.secTitle}>가맹점 홍보</h1>
                    </article>

                    <article className={styles.contArea}>
                        <Franchisee />

                        <button className={styles.moreBtn} onClick={() => navigate("/franchisee")}>
                            더 많은 가맹점 보기
                        </button>
                    </article>
                </section>

                <AdBanners />

                <section className={`${styles.listSec} ${styles.findSec}`}>
                    <article className={styles.titleArea}>
                        <h1 className={styles.secTitle}>채용 정보를 찾고 계셨나요?</h1>
                    </article>

                    <article className={styles.contArea}>
                        <button className={styles.enrollAnounceBtn} onClick={() => navigate("/mypage/company/jobopening/enroll")}>
                            <img src={EnrollAnounce} alt="" />

                            <p>신규 구인 등록</p>
                        </button>

                        <button className={styles.findAnounceBtn} onClick={() => navigate("/hire")}>
                            <img src={FindAnounce} alt="" />

                            <p>공고 찾기</p>
                        </button>
                    </article>
                </section>
            </main>

            <FloatingActBtns moreBtn />
            <BottomNavBar activeLabel="홈" />

            {reviewPopup && (
                <>
                    <ReviewPopup off={() => setReviewPopup(false)} />
                    <PopupBg bg off={() => setReviewPopup(false)} />
                </>
            )}

            {referralPopup && (
                <>
                    <ReferralPopup off={() => setReferralPopup(false)} />
                    <PopupBg bg off={() => setReferralPopup(false)} />
                </>
            )}

            {noticePopup && (
                <>
                    <NoticePopup off={() => setNoticePopup(false)} />
                    <PopupBg bg off={() => setNoticePopup(false)} />
                </>
            )}
        </>
    );
}
