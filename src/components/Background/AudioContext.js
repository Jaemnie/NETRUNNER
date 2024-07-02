import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// AudioContext 생성
const AudioContext = createContext();

// AudioContext를 사용하는 커스텀 훅
export const useAudio = () => useContext(AudioContext);

// AudioProvider 컴포넌트 정의
export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false); // 음소거 상태 관리

  // 음소거 상태를 토글하는 함수
  const toggleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  return (
    // AudioContext.Provider로 감싸고, 값으로 isMuted와 toggleMute를 제공
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

// BackgroundMusic 컴포넌트 정의
const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null); // 오디오 엘리먼트를 참조하기 위한 useRef
  const { isMuted } = useAudio(); // AudioContext에서 음소거 상태를 가져옴

  // 사용자 상호작용 이후에 오디오를 재생하는 함수
  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((error) => {
        console.error('Audio play failed:', error);
      });
    }
  };

  // 컴포넌트가 마운트될 때 클릭 이벤트 리스너를 추가하는 useEffect
  useEffect(() => {
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleUserInteraction); // 재생 후 이벤트 리스너 제거
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  // 음소거 상태가 변경될 때 실행되는 useEffect
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        audio.volume = 0; // 음소거 상태일 때 볼륨을 0으로 설정
      } else {
        audio.volume = 0.1; // 음소거 해제 시 기본 볼륨을 0.1로 설정
      }
    }
  }, [isMuted]);

  // 오디오 엘리먼트를 반환, loop 속성으로 무한 재생
  return <audio ref={audioRef} src={src} loop />;
};

export default BackgroundMusic;
