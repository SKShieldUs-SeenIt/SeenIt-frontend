// MovieRow.jsx
import React, { useRef, useEffect, useState } from 'react';
import MovieCard from './MovieCard';

export default function MovieRow({ movies }) {
  const rowRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  const handleScroll = () => {
    const container = rowRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstChild.offsetWidth + 16; // +gap
    const index = Math.round(scrollLeft / cardWidth);
    setCenterIndex(index);
  };

  useEffect(() => {
    const row = rowRef.current;
    row.addEventListener('scroll', handleScroll);
    return () => row.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-row" ref={rowRef}>
      {movies.map((movie, i) => {
        let pos = 'center';
        if (i < centerIndex) pos = 'left';
        else if (i > centerIndex) pos = 'right';
        return <MovieCard key={i} movie={movie} rotate={pos} />;
      })}
    </div>
  );
}
