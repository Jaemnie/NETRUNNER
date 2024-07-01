import React, { useEffect, useState } from 'react';
import styles from './Lanking.module.css';
import { API } from '../../config';

const Lanking = () => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await fetch(`${API.RANKING}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRankingData(data);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <div className={styles.rankingContainer}>
      <h2>랭킹 리더보드</h2>
      <table className={styles.rankingTable}>
        <thead>
          <tr>
            <th>순위</th>
            <th>사용자 아이디</th>
            <th>레벨</th>
            <th>포인트</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.userId}</td>
              <td>{user.level}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lanking;
