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
  const dummyMovies = Array.from({ length:7  });

  return (
    <div className="homepage-container">
      <div className="homepage">
        <Header />
        <SearchBar />

        <section className="movie-section">
          <h2 className="section-title">최신 영화</h2>
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {dummyMovies.map((_, i) => (
              <SwiperSlide key={i}>
                <MovieCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
}