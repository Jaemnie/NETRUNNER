import React, { useState } from 'react';
import "./MainPage.css"
import TermPage from '../../components/termPage';
const MenuContent = {
  terminer: <TermPage />,
  info: <div>내정보</div>,
  quest: <div>퀘스트</div>,
  shop:<div>상점</div>,
  setting:<div>설정</div>
};

function MainPage() {
  // 현재 선택된 메뉴 항목을 저장하는 상태
  const [currentMenu, setCurrentMenu] = useState('terminer');

  // 메뉴 항목 클릭 핸들러
  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <main>
    <nav className="main-menu">
        <h1>NetRunner</h1>
        <ul>
            <li className="nav-item active">
                <b></b>
                <b></b>
                <a href="#"onClick={() => handleMenuClick('terminer')}>
                    <i className="fa fa-house nav-icon"></i>
                    <span className="nav-text">터미널</span>
                </a>
            </li>
            <li className="nav-item">
                <b></b>
                <b></b>
                <a href="#"onClick={() => handleMenuClick('info')}>
                    <i className="fa fa-user nav-icon"></i>
                    <span className="nav-text">내 정보</span>
                </a>
            </li>

            <li className="nav-item">
                <b></b>
                <b></b>
                <a href="#"onClick={() => handleMenuClick('quest')}>
                    <i className="fa fa-calendar-check nav-icon"></i>
                    <span className="nav-text">퀘스트</span>
                </a>
            </li>

            <li className="nav-item">
                <b></b>
                <b></b>
                <a href="#"onClick={() => handleMenuClick('shop')}>
                    <i className="fa fa-person-running nav-icon"></i>
                    <span className="nav-text">상점</span>
                </a>
            </li>

            <li className="nav-item">
                <b></b>
                <b></b>
                <a href="#"onClick={() => handleMenuClick('setting')}>
                    <i className="fa fa-sliders nav-icon"></i>
                    <span className="nav-text">설정</span>
                </a>
            </li>
        </ul>
    </nav>
    <section className="content">
        {MenuContent[currentMenu]}
    </section>
</main>
  );
}

export default MainPage;
