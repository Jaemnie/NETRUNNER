import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import styles from './shop.module.css';
import { API } from '../../config';

// Shop 컴포넌트 정의
const Shop = ({
  userId, setToolList }) => {
  const [availablePoints, setAvailablePoints] = useState(0); // 사용자의 포인트 상태 관리
  const [tools, setTools] = useState([]); // 사용할 수 있는 도구 목록 상태 관리
  const shopRef = useRef(null);

  useEffect(() => {
    // 사용자의 포인트를 가져오는 함수
    const fetchPoints = async () => {
      const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
      try {
        const response = await fetch(`${API.POINTS}${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // JWT 포함
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAvailablePoints(data); // 포인트 상태 업데이트
      } catch (error) {
        console.error('포인트 가져오기 오류:', error);
      }
    };

    // 사용할 수 있는 도구를 가져오는 함수
    const fetchTools = async () => {
      const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
      try {
        const response = await fetch(`${API.TOOLS}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // JWT 포함
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTools(data); // 도구 목록 상태 업데이트
        setToolList(data);
      } catch (error) {
        console.error('도구 가져오기 오류:', error);
      }
    };

    fetchPoints(); // 포인트 가져오기 호출
    fetchTools(); // 도구 가져오기 호출
  }, [userId, setToolList]);

  // 도구를 구매하는 함수
  const handlePurchase = async (tool) => {
    if (availablePoints >= tool.cost && !tool.isBuy) { // 이미 구매한 도구가 아닌 경우에만 구매 가능
      const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
      try {
        const response = await fetch(`${API.PURCHASE}${tool.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // JWT 포함
          },
          body: JSON.stringify({ userId }) // toolId는 URL에서 전달
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setAvailablePoints(availablePoints - tool.cost); // 포인트 차감
        console.log(tool.name);
        setTools(tools.map(t => t.id === tool.id ? { ...t, isBuy: true } : t)); // 도구의 isBuy 상태 업데이트
        setToolList(tools.map(t => t.id === tool.id ? { ...t, isBuy: true } : t));
      } catch (error) {
        console.error('도구 구매 오류:', error);
      }
    }
  };

  return (
    <div className={styles.shopContainer} ref={shopRef}>
      <div className={styles.shopHeader}>
        <h2>해킹 툴 상점</h2>
        <p>보유 포인트: {availablePoints}</p>
      </div>
      <div className={styles.toolsList}>
        {tools.map(tool => (
          <div key={tool.id} className={styles.toolItem}>
            <h3>{tool.name}</h3>
            <p>가격: {tool.cost} 포인트</p>
            <button
              onClick={() => handlePurchase(tool)}
              disabled={availablePoints < tool.cost || tool.isBuy}>
              {tool.isBuy ? '이미 구매한 도구' : availablePoints >= tool.cost ? '구매하기' : '포인트 부족'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Shop;
