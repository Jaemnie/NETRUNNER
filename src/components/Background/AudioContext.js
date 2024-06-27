import React, { createContext, useState, useContext } from 'react';

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
