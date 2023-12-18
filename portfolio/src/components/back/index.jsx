import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { closeProject } from "../../redux/project/actions";
import { Container } from "./styles";
import { useCallback } from "react";

const Back = () => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(closeProject());
  }, []);

  return (
    <Container>
      <IconButton size="large" onClick={onClick}>
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
    </Container>
  );
};

export default Back;
