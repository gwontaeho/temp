import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./features/auth";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Menu from "./components/menu";
import Main from "./pages/main";
import Product from "./pages/product";
import Signup from "./pages/signup";
import Login from "./pages/login";
import User from "./pages/user";
import Profile from "./pages/profile";
import Write from "./pages/write";
import Update from "./pages/update";
import Search from "./pages/search";
import Sale from "./pages/sale";
import Purchase from "./pages/purchase";
import Wish from "./pages/wish";
import Users from "./pages/users";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  window.addEventListener("storage", () => {
    dispatch(logout());
  });

  return (
    <HashRouter>
      <div className="App">
        <Menu />
        <Header />
        <div className="route">
          <Routes>
            <Route index element={<Main />} />
            <Route path="search" element={<Search />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="user/:id" element={<User />} />
            <Route
              path="profile"
              element={!auth.loggedIn ? <Navigate to="/" /> : <Profile />}
            />
            <Route
              path="signup"
              element={auth.loggedIn ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="login"
              element={auth.loggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="write"
              element={!auth.loggedIn ? <Navigate to="/" /> : <Write />}
            />
            <Route
              path="update/:id"
              element={!auth.loggedIn ? <Navigate to="/" /> : <Update />}
            />
            <Route
              path="sale"
              element={!auth.loggedIn ? <Navigate to="/" /> : <Sale />}
            />
            <Route
              path="purchase"
              element={!auth.loggedIn ? <Navigate to="/" /> : <Purchase />}
            />
            <Route
              path="wish"
              element={!auth.loggedIn ? <Navigate to="/" /> : <Wish />}
            />
            <Route
              path="users"
              element={
                !auth.loggedIn || auth.id !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <Users />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
