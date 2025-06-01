import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 최상단으로 스크롤 이동
  }, [pathname]);

  return null;
}


//페이지 이동시 최상단으로 이동하는 코드    