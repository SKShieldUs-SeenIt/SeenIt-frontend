// src/pages/LoginPage.jsx
import React from "react";

function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white flex flex-col">
      {/* 상단 로고 */}
      <header className="p-6">
        <h1 className="text-3xl font-bold text-white">봤어?</h1>
      </header>

      {/* 중앙 콘텐츠 */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-extrabold mb-3">반가워요!</h2>
        <p className="text-xl mb-10">계정을 선택해 로그인해주세요.</p>

        <button
          onClick={handleKakaoLogin}
          className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition"
        >
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
            alt="Kakao"
            className="w-6 h-6"
          />
          카카오로 시작하기
        </button>
      </main>
    </div>
  );
}

export default LoginPage;
