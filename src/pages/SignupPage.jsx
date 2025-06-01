import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    email: '',
    username: '',
    genre: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 정보:', formData);
    // 서버에 회원가입 데이터 전송
    navigate('/login'); // 가입 후 로그인 페이지로 이동
  };

  return (
    <div className="signup-container">
      <h2>회원 정보 입력</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          프로필 이미지:
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>
        <label>
          이메일:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          아이디:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          선호 장르:
          <select name="genre" value={formData.genre} onChange={handleChange} required>
            <option value="">-- 선택하세요 --</option>
            <option value="action">액션</option>
            <option value="drama">드라마</option>
            <option value="comedy">코미디</option>
            <option value="thriller">스릴러</option>
            <option value="romance">로맨스</option>
          </select>
        </label>
        <button type="submit">가입 완료</button>
      </form>
    </div>
  );
}
