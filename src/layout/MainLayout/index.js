import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, IconButton, Snackbar, Toolbar } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

import Breadcrumbs from "../../ui-component/extended/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";
import navigation from "../../menu-items";
import { drawerWidth } from "../../store/constant";
import { SET_MENU, SET_ALERTINFO, SET_LOGON, SET_MEMBERINFO } from "../../store/actions";
import { getCookie, removeCookie } from "../../utils/Cookie";
import UserAPI from "../../views/apis/UserAPI";
// import SettingAPI from '../../views/apis/SettingAPI';

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth + 20}px)`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      width: `calc(100% - ${drawerWidth + 20}px)`,
      padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: `calc(100% - ${drawerWidth + 20}px)`,
      padding: "16px",
    },
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth + 20}px)`,
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
    },
  }),
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const isLogOn = useSelector((state) => state.session.isLogOn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const alertInfo = useSelector((state) => state.session.alertInfo);
  const handleAlertClose = () => {
    dispatch({ type: SET_ALERTINFO, value: { ...alertInfo, open: false } });
  };

  useEffect(() => {
    const email = getCookie("memberEmail");
    if (!!getCookie("accessToken") && !!email) {
      UserAPI.getMember(email).then((res) => {
        if (!!res) {
          dispatch({ type: SET_LOGON, success: true });
          dispatch({ type: SET_MEMBERINFO, value: res });
        } else {
          removeCookie("accessToken");
          removeCookie("memberEmail");
        }
      });
    } else {
      // let pathname = window.location.pathname;
      // navigate(
      // 	pathname === '/' ? '/login' : `/login?appkey=POR&pathname=${pathname.replace('/', '')}`,
      // 	{ replace: true },
      // );
    }
  }, [isLogOn, navigate, dispatch]);

  // useEffect(() => {
  // 	dispatch({ type: SET_MENU, opened: !matchDownMd });
  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [matchDownMd]);

  useEffect(() => {
    // 전역에서 사용하는 라이브러리성 코드 가져오기
    // LibraryAPI.getLibraryTypes().then((res) => {
    // 	if (res.status === 200) dispatch({ type: SET_CODES, codes: res.data });
    // });
    // 환경설정 가져오기 => TO-DO: 한번에 가져오는 API 추가?
    // SettingAPI.getSettingBasic().then((res) => {
    // 	if (res.status === 200) dispatch({ type: SET_SETTINGINFO, codes: res.data });
    // });
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create("width") : "none",
        }}
      >
        <Toolbar sx={{ pb: 1, pl: 6 }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs separator={KeyboardArrowRightIcon} navigation={navigation} icon title rightAlign />
        <Outlet />
      </Main>

      {/* alert message snackbar */}
      <Snackbar
        key={alertInfo?.key}
        open={alertInfo?.open || false}
        message={alertInfo?.message || ""}
        autoHideDuration={6000}
        transitionDuration={0}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton color="inherit" sx={{ p: 0.5 }} onClick={handleAlertClose}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Box>
  );
};

export default MainLayout;
