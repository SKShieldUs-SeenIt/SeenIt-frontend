import React from "react";
import "../pages/LoginPage.css"; // CSS 경로
import poster from "../assets/poster.jpg";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?" +
      "response_type=code&client_id={REST_API_KEY}" +
      "&redirect_uri={REDIRECT_URI}";
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${poster})` }}
    >
      <div className="login-overlay" />
      <div className="login-container">
        <div className="login-box">
          <h1>SeenIt?</h1>
          <h2>반가워요!</h2>
          <p>계정을 선택해 로그인 해주세요.</p>
          <button onClick={handleKakaoLogin} className="kakao-button">
            💬 카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
