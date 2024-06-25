import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};
