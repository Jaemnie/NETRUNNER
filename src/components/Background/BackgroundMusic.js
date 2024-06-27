import React, { useEffect, useRef } from 'react';
import { useAudio } from './AudioContext'; // AudioContext에서 상태와 함수를 가져옴

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null); // 오디오 엘리먼트를 참조하기 위한 useRef
  const { isMuted } = useAudio(); // AudioContext에서 음소거 상태를 가져옴

  // 컴포넌트가 마운트될 때 실행되는 useEffect
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0; // 시작 볼륨을 0으로 설정
    audio.play(); // 오디오 재생

    // 오디오 볼륨을 점진적으로 증가시키는 함수
    const fadeAudio = () => {
      let volume = 0;
      const interval = setInterval(() => {
        if (volume < 0.1) {
          volume += 0.01;
          audio.volume = volume;
        } else {
          clearInterval(interval); // 볼륨이 0.1에 도달하면 인터벌을 멈춤
        }
      }, 100); // 100ms마다 볼륨을 0.01씩 증가
    };

    fadeAudio();
  }, []);

  // 음소거 상태가 변경될 때 실행되는 useEffect
  useEffect(() => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = 0; // 음소거 상태일 때 볼륨을 0으로 설정
    } else {
      audio.volume = 0.1; // 음소거 해제 시 기본 볼륨을 0.1로 설정
    }
  }, [isMuted]);

  // 오디오 엘리먼트를 반환, loop 속성으로 무한 재생
  return <audio ref={audioRef} src={src} loop />;
};

export default BackgroundMusic;
