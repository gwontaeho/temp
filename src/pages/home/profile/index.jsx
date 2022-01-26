import { useRef, useCallback } from "react";
import {
  Container,
  Title,
  Article,
  Section1,
  Section2,
  Card,
  Intro,
  Intro2,
  Info,
} from "./styles";
import profile from "../../../images/profile/profile.png";

const Profile = () => {
  const cardRef = useRef();

  const onMouseLeave = useCallback(() => {
    cardRef.current.style.transform = "";
    cardRef.current.style.boxShadow = "0px 10px 10px rgba(0, 0, 0, 0.5)";
  }, []);

  const onMouseMove = useCallback((e) => {
    let rotateX =
      (e.clientX -
        e.currentTarget.getBoundingClientRect().left -
        e.currentTarget.getBoundingClientRect().width / 2) /
      10;
    let rotateY =
      (e.clientY -
        e.currentTarget.getBoundingClientRect().top -
        e.currentTarget.getBoundingClientRect().height / 2) /
      10;
    cardRef.current.style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    cardRef.current.style.boxShadow = `${-rotateX}px ${
      20 + rotateY
    }px 10px rgba(0, 0, 0, 0.5)`;
  }, []);

  return (
    <Container>
      <Title>P r o f i l e</Title>
      <Article>
        <Section1 onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
          <Card ref={cardRef}>
            <img src={profile} alt="profile" />
          </Card>
        </Section1>
        <Section2>
          <Intro>
            주로 REACT를 사용하여 프로젝트의 프론트 작업을 하고있습니다.
          </Intro>
          <Intro2>
            <div>
              Node.js의 express, sequelize를 사용하여 API서버 개발을 한 경험이
              있으며
            </div>
            <div>heroku와 aws를 사용한 개인 프로젝트 배포 경험이있습니다.</div>
            <div>
              학교 졸업작품시 react native를 사용한 안드로이드 앱 개발 경험이
              있습니다.
            </div>
          </Intro2>
          <Info>
            <div>권태호</div>
            <div>94.11.16</div>
            <div>010.4090.0734</div>
            <div>taeho8199@gmail.com</div>
          </Info>
        </Section2>
      </Article>
    </Container>
  );
};

export default Profile;
