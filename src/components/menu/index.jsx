import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { logout } from "../../features/auth";
import { close } from "../../features/menu";
import { StyledList } from "./styles";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const menu = useSelector((state) => state.menu);

  return (
    <Drawer anchor="right" open={menu.open} onClose={() => dispatch(close())}>
      <StyledList>
        <ListItem
          button
          onClick={() => {
            navigate(`/user/${auth.id}`);
            dispatch(close());
          }}
        >
          <ListItemIcon>
            <PersonOutlineOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="내 정보" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate(`/sale`);
            dispatch(close());
          }}
        >
          <ListItemIcon>
            <ListOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="판매 내역" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate(`/purchase`);
            dispatch(close());
          }}
        >
          <ListItemIcon>
            <ListOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="구매 내역" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate(`/wish`);
            dispatch(close());
          }}
        >
          <ListItemIcon>
            <ListOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="관심 목록" color="primary" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate(`/write`);
            dispatch(close());
          }}
        >
          <ListItemIcon>
            <CreateOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="글 쓰기" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            dispatch(logout());
            dispatch(close());
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="로그아웃" />
        </ListItem>
      </StyledList>
    </Drawer>
  );
};

export default Menu;
