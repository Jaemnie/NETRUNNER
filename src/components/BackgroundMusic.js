// src/components/BackgroundMusic.js
import React, { useEffect, useRef } from 'react';

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0; // 시작 볼륨을 0으로 설정
    audio.play();
    
    const fadeAudio = () => {
      let volume = 0;
      const interval = setInterval(() => {
        if (volume < 0.1) {
          volume += 0.01;
          audio.volume = volume;
        } else {
          clearInterval(interval);
        }
      }, 100); // 100ms마다 볼륨을 0.01씩 증가
    };

    fadeAudio();
  }, []);

  return <audio ref={audioRef} src={src} loop />;
};

export default BackgroundMusic;
