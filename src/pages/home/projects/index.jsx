import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useDispatch } from "react-redux";
import { setProject } from "../../../redux/project/actions";
import { Container, Title, Section, Project } from "./styles";
import { projects } from "../../../data";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const containerRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      containerRef.current.classList.add("open");
    }, [100]);
  }, []);

  useEffect(() => {
    if (project.open) {
      containerRef.current.classList.add("close");
      setTimeout(() => {
        navigate("project");
      }, [500]);
    }
  }, [project]);

  const onClick = useCallback((project) => {
    if (project.open) dispatch(setProject(project));
  }, []);

  return (
    <Container ref={containerRef}>
      <Title>P r o j e c t s</Title>
      <Section>
        {projects.map((project) => (
          <Tooltip
            key={project.name}
            title={project.open ? project.tooltip : "진행 중"}
            placement="top-start"
            arrow
            followCursor
          >
            <Project onClick={() => onClick(project)}>
              <FolderIcon />
              <FolderOpenIcon className="open" />
              <span>{project.name}</span>
            </Project>
          </Tooltip>
        ))}
      </Section>
    </Container>
  );
};

export default Projects;
