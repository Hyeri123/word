import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const loggedIn = JSON.parse(localStorage.getItem("loggedin"));

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("loggedin"); // 로그인 정보 삭제
    navigate("/home"); // 로그아웃 후 홈 페이지로 이동
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Word
      </Link>
      <nav className="nav">
        <Link to="/" className="site-title">
          Home
        </Link>
        <Link to="/wordManager">My word</Link>
        <Link to="/testManager">Test</Link>
        <Link to="/bookmarks">Bookmark</Link>
      </nav>
    </header>
  );
};

export default Navbar;
