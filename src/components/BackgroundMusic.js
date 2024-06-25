import React, { useEffect, useRef } from 'react';
import { useAudio } from '../pages/mainPages/AudioContext'; // 컨텍스트 가져오기

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null);
  const { isMuted } = useAudio(); // 음소거 상태 가져오기

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

  useEffect(() => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = 0;
    } else {
      audio.volume = 0.1; // 음소거 해제 시 기본 볼륨 설정
    }
  }, [isMuted]);

  return <audio ref={audioRef} src={src} loop />;
};

export default BackgroundMusic;
