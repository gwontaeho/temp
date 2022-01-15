import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { open } from "../../features/menu";

import { Container, Logo, Search, Controls } from "./styles";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const onKeyPress = useCallback(
    (e) => {
      if (e.charCode === 13) navigate("/search", { state: keyword });
    },
    [keyword]
  );

  return (
    <Container>
      <Logo>
        <Link to="/">MARKET</Link>
      </Logo>

      <Search>
        <TextField
          variant="outlined"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="ex) 가산동, 의자, 가산동 의자"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => navigate("/search", { state: keyword })}
                  color="primary"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Search>

      <Controls>
        {auth.loggedIn ? (
          <IconButton
            onClick={() => dispatch(open())}
            color="primary"
            size="large"
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <ButtonGroup>
            <Button
              size="large"
              variant="text"
              onClick={() => navigate("/login")}
            >
              로그인
            </Button>
            <Button
              size="large"
              variant="text"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </Button>
          </ButtonGroup>
        )}
      </Controls>
    </Container>
  );
};

export default Header;
