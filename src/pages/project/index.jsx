import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
          <video autoPlay loop muted>
            <source src={project.current.video} type="video/mp4" />
          </video>

          <div>
            <Tooltip title="GitHub" arrow>
              <a href={project.current.github} target="_blank" rel="noreferrer">
                <GitHubIcon fill="#181717" className="github" />
              </a>
            </Tooltip>
            <Tooltip title="GitHubPages" arrow>
              <a
                href={project.current.githubpages}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubPagesIcon fill="#222222" className="githubpages" />
              </a>
            </Tooltip>
          </div>
        </Section>
        <Section2>
          <Title2>Intro</Title2>
          <Text>{project.current.text}</Text>
          <Title2>Skills</Title2>
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
