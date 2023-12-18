import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import { ReactComponent as Circle1Purple } from "assets/images/icon/Circle1Purple.svg";
import { ReactComponent as CircleCamera } from "assets/images/icon/CircleCamera.svg";
import { ReactComponent as CircleDownloadBlue } from "assets/images/icon/CircleDownloadBlue.svg";
import { ReactComponent as CirclePPurple } from "assets/images/icon/CirclePPurple.svg";
import { ReactComponent as CircleQrBlue } from "assets/images/icon/CircleQrBlue.svg";
import defaultProfImg from "assets/images/icon/DefaultProfImg.svg";
import { ReactComponent as PeopleBlue } from "assets/images/icon/PeopleBlue.svg";
import BottomNavBar from "components/bottomBar/bottomNavBar";
import PopupBg from "components/common/popupBg";
import MyPageHeader from "components/header/myPageHeader";
import QrPopup from "components/my/qr/qrPopup";
import { useMyStatus } from "hooks/useMyStatus";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import styles from "./myPage.module.scss";

export default function MyPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useRecoilValue(userSelector);
    const setUser = useSetRecoilState(userSelector);
    const { data: userStatus } = useMyStatus();

    const profImgRef = useRef<HTMLInputElement>(null);
    const [profImg, setProfImg] = useState<string>();
    const [imgSize, setImgSize] = useState<string>();
    const [qrPopup, setQrPopup] = useState<boolean>(location.state?.qrPopup || false);

    async function getImageSize() {
        try {
            let {
                data: { respdata },
            } = await api.get(eps["CHECK_IMG_SIZE"]);
            var value = parseFloat(respdata.value_);
            const units = ["byte", "KB", "MB", "GB", "TB"];
            var idx = 0;
            while (value >= 1000) {
                value /= 1000;
                idx += 1;
            }
            setImgSize(value + units[idx]);
        } catch (err) {
            console.log(err);
        }
    }

    async function setUserInfo() {
        try {
            let data = await api.get(eps["USERINFO"]);
            var res = data.data.respdata;
            setUser({
                phoneNumber: res.phonenumber,
                password: res.password,
                userName: res.username,
                urlProfileImage: res.urlprofileimage,
                level: res.level,
                myRefererCode: res.myreferercode,
                parentCode: res.parentcode,
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function putUserProfileImg() {
        type profileimgParams = {
            strprofileimage: string;
            filename: string;
        };
        let body: profileimgParams = {
            strprofileimage: profImg ? profImg : "",
            filename: user?.userName + "profile.png",
        };
        try {
            await api.put(eps["USER_EDIT_PROFILEIMG"], body);
            setUserInfo();
        } catch (err) {
            console.log(err);
            toast(imgSize + " 이하의 파일 만 업로드 가능합니다", {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    useEffect(() => {
        getImageSize();
    }, []);

    useEffect(() => {
        profImg && putUserProfileImg();
    }, [profImg]);

    function onChangeProfImg(e: any) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (!reader.result) return;

            setProfImg(`${reader.result}`);
        };
    }

    return (
        <>
            <MyPageHeader />

            <main className={styles.myPage}>
                <section className={styles.profSec}>
                    <article className={styles.profArea}>
                        <button className={styles.profBtn} onClick={() => navigate("edit")}>
                            <h1 className={styles.profName}>{user?.userName}님</h1>
                            <ChevronRight />
                        </button>

                        <button className={styles.profImgBtn} onClick={() => profImgRef.current?.click()}>
                            <img className={styles.profImg} src={user?.urlProfileImage || defaultProfImg} alt="" />
                            <CircleCamera className={styles.camera} />
                        </button>

                        <input ref={profImgRef} hidden type="file" accept="image/*" onChange={(e) => onChangeProfImg(e)} />
                    </article>

                    <ul className={styles.countList}>
                        <li onClick={() => navigate("offer")}>
                            <p className={styles.key}>받은제안</p>
                            <p className={styles.value}>{userStatus?.countsuggestsrx}</p>
                        </li>

                        <li>
                            <p className={styles.key}>지원완료</p>
                            <p className={styles.value}>{userStatus?.countapplys}</p>
                        </li>

                        <li className={styles.scrabBox} onClick={() => navigate("scrab")}>
                            <p className={styles.key}>스크랩</p>
                            <p className={styles.value}>{userStatus?.countfavorites}</p>
                        </li>
                    </ul>
                </section>

                <section className={styles.pointSec}>
                    <p className={styles.secTitle}>포인트</p>

                    <article className={styles.pointArea}>
                        <ul className={styles.infoList}>
                            <li>
                                <div className={styles.key}>
                                    <CirclePPurple />
                                    포인트
                                </div>

                                <h2 className={styles.value}>
                                    <strong>{Intl.NumberFormat().format(userStatus?.pointbalance)}</strong>P
                                </h2>
                            </li>

                            <hr />

                            <li>
                                <div className={styles.key}>
                                    <Circle1Purple />
                                    등급
                                </div>

                                <h2 className={styles.value}>
                                    <strong>{user?.level || 0}</strong>등급
                                </h2>
                            </li>
                        </ul>
                    </article>

                    <article className={styles.utilArea}>
                        <ul className={styles.utilList}>
                            <li onClick={() => navigate("history")}>
                                <CircleDownloadBlue />
                                <p>내역</p>
                            </li>

                            <hr />

                            <li onClick={() => setQrPopup(true)}>
                                <CircleQrBlue />
                                <p>QR결제</p>
                            </li>

                            <hr />

                            <li onClick={() => navigate("referral")}>
                                <PeopleBlue />
                                <p>추천인</p>
                            </li>
                        </ul>
                    </article>
                </section>

                <section className={styles.actionSec}>
                    <p className={styles.secTitle}>나의 활동</p>

                    <article className={styles.actionArea}>
                        <ul className={styles.actionList}>
                            <li onClick={() => navigate("resume")}>
                                <p>내 이력서</p>
                                <ChevronRight />
                            </li>

                            <li onClick={() => navigate("apply")}>
                                <p>지원현황</p>
                                <ChevronRight />
                            </li>

                            <li onClick={() => navigate("company")}>
                                <p>기업서비스</p>
                                <ChevronRight />
                            </li>
                        </ul>
                    </article>
                </section>
            </main>

            <BottomNavBar activeLabel="MY" />

            {qrPopup && (
                <>
                    <QrPopup />
                    <PopupBg bg opacity={0.8} off={() => setQrPopup(false)} />
                </>
            )}
        </>
    );
}
