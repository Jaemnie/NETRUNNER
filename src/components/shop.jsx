import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './shop.module.css';

const Shop = ({ userId }) => {
  const [availablePoints, setAvailablePoints] = useState(0);
  const [tools, setTools] = useState([]);
  const [purchasedTools, setPurchasedTools] = useState([]);

  useEffect(() => {
    // 사용자의 포인트를 가져오는 함수
    const fetchPoints = async () => {
      const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
      try {
        const response = await fetch(`http://netrunner.life:4000/missions/points/${userId}`, {
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
        setAvailablePoints(data);
      } catch (error) {
        console.error('포인트 가져오기 오류:', error);
      }
    };

    // 사용할 수 있는 도구를 가져오는 함수
    const fetchTools = async () => {
      const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
      try {
        const response = await fetch('http://netrunner.life:4000/missions/tools', {
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
        setTools(data);
      } catch (error) {
        console.error('도구 가져오기 오류:', error);
      }
    };

    fetchPoints();
    fetchTools();
  }, [userId]);

  // 도구를 구매하는 함수
  const handlePurchase = (tool) => {
    if (availablePoints >= tool.cost) {
      setAvailablePoints(availablePoints - tool.cost);
      setPurchasedTools([...purchasedTools, tool]);
    }
  };

  return (
    <div className={styles.shopContainer}>
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
              disabled={availablePoints < tool.cost || purchasedTools.includes(tool)}>
              {availablePoints >= tool.cost ? '구매하기' : '포인트 부족'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Shop.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Shop;
