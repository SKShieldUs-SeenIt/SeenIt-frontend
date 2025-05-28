import React from 'react';
import Header from '../components/home/Header';
import SearchBar from '../components/home/SearchBar';
import MovieCard from '../components/home/MovieCard';
import './HomePage.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

export default function HomePage() {
  const dummyMovies = Array.from({ length: 10 });

  return (
    <div className="homepage-container">
      <div className="homepage">
        <Header />
        <SearchBar />

        {/* 최신 영화 섹션 */}
        <section className="movie-section">
          <h2 className="section-title">최신 영화</h2>
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {dummyMovies.map((_, i) => (
              <SwiperSlide key={i} className="custom-slide">
                <MovieCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 내가 본 영화 섹션 */}
        <section className="movie-section">
          <h2 className="section-title">내가 본 영화</h2>
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={10}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {dummyMovies.map((_, i) => (
              <SwiperSlide key={`watched-${i}`} className="custom-slide">
                <MovieCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
}