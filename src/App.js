import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPages/LoginPage';
import MainPage from './pages/mainPages/MainPage';
import { AudioProvider } from './components/Background/AudioContext';
import BackgroundMusic from './components/Background/BackgroundMusic';
import bgm from './assets/mainbgm.mp3';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // 로그인 페이지 대신 첫페이지로 리다이렉션
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('accessToken');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // 창 닫을 시 로그아웃

  return (
    <AudioProvider>
      <Router>
        <BackgroundMusic src={bgm} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;
