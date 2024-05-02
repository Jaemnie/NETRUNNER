
import './App.css';

import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPages/LoginPage';
import Loading from './pages/loadingPages/Loading';
import MainPage from './pages/mainPages/MainPage';
// import AuthService from '../../services/AuthService';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    // 로그인 페이지 대신 첫페이지로 리다이렉션
    return <Navigate to="/" replace />;
  }

  return children;
};


function App() {

  useEffect(()=>{
    const handleBeforeUnload=(e)=>{
      localStorage.removeItem('accessToken');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  },[]); //창닫을시 로그아웃

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loading" element={
          <RequireAuth>
            <Loading />
          </RequireAuth>
        } />
        <Route path="/main" element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
          } />
      </Routes>
    </Router>
  );
}

export default App;
