import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as GitHubIcon } from "../../images/etc/github.svg";
import { ReactComponent as GitHubPagesIcon } from "../../images/etc/githubpages.svg";
import Tooltip from "@mui/material/Tooltip";

import {
  Container,
  Title,
  Article,
  Section,
  Section2,
  Text,
  Title2,
  Skills,
  Skill,
} from "./styles";
import Back from "../../components/back";

const Project = () => {
  const navigate = useNavigate();
  const project = useSelector((state) => state.project);
  const containerRef = useRef();
  console.log(project);

  useEffect(() => {
    setTimeout(() => {
      containerRef.current.classList.add("open");
    }, [500]);
  }, []);

  useEffect(() => {
    if (!project.open) {
      containerRef.current.classList.remove("open");
      setTimeout(() => {
        navigate("/");
      }, [500]);
    }
  }, [project]);

  return (
    <Container ref={containerRef}>
      <Back />
      <Title>{project.current.title}</Title>
      <Article>
        <Section>
          {project.current.video ? (
            <video autoPlay loop muted>
              <source src={project.current.video} type="video/mp4" />
            </video>
          ) : (
            <div className="alt">시연영상X</div>
          )}

          <div>
            <Tooltip title="GitHub" arrow>
              <a href={project.current.github} target="_blank" rel="noreferrer">
                <span>소스 코드 : </span>
                <GitHubIcon fill="#181717" className="github" />
              </a>
            </Tooltip>
            <Tooltip title="GitHubPages" arrow>
              <a
                href={project.current.githubpages}
                target="_blank"
                rel="noreferrer"
              >
                <span>시연 : </span>
                <GitHubPagesIcon fill="#222222" className="githubpages" />
              </a>
            </Tooltip>
          </div>
        </Section>
        <Section2>
          <Title2>소개</Title2>
          <Text>{project.current.text}</Text>
          <Title2>기능</Title2>
          <Text>{project.current.fn}</Text>
          <Title2>기간 및 인원</Title2>
          <Text>
            {project.current.term} / {project.current.personnel}
          </Text>
          <Title2>사용기술</Title2>
          <Skills>
            {project.current.skills.map((skill) => {
              return (
                <Skill key={skill.name}>
                  <div>{skill.icon}</div>
                  <span>{skill.name}</span>
                </Skill>
              );
            })}
          </Skills>
        </Section2>
      </Article>
    </Container>
  );
};

export default Project;
