import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Quest.module.css';

const Quest = ({ missionId }) => {
  const [missionData, setMissionData] = useState(null);

  useEffect(() => {
    // 미션 데이터를 가져오는 함수
    const fetchMissionData = async () => {
      try {
        const response = await fetch(`http://netrunner.life:4000/missions/${missionId}`);
        const data = await response.json();
        setMissionData(data);
      } catch (error) {
        console.error('미션 데이터 가져오기 오류:', error);
      }
    };

    fetchMissionData();
  }, [missionId]);

  if (!missionData) {
    return <div>Loading...</div>;
  }

  const { missionID, scenario, type, correctAnswer, node, reward } = missionData;

  // node 객체와 그 하위 객체들이 존재하는지 확인
  const hasNode = node && node.nodeId && node.nodeMAC && node.nodeIP && node.nodePort && node.nodeDirectorys && node.nodeProgram && node.nodeFile;

  return (
    <div className={styles.questContainer}>
      <h2>미션 정보</h2>
      <div className={styles.missionDetail}>
        <p><strong>미션 ID:</strong> {missionID}</p>
        <p><strong>시나리오:</strong> {scenario}</p>
        <p><strong>유형:</strong> {type}</p>
        <p><strong>정답 조건:</strong> {correctAnswer}</p>
        {hasNode && (
          <>
            <h3>노드 정보</h3>
            <p><strong>노드 ID:</strong> {node.nodeId}</p>
            <p><strong>MAC 주소:</strong> {node.nodeMAC}</p>
            <p><strong>IP 주소:</strong> {node.nodeIP}</p>
            <h4>포트 정보</h4>
            <p><strong>TCP:</strong> {node.nodePort.TCP.servicePort} ({node.nodePort.TCP.state})</p>
            <p><strong>UDP:</strong> {node.nodePort.UDP.servicePort} ({node.nodePort.UDP.state})</p>
            <h4>디렉토리 구조</h4>
            <ul>
              {node.nodeDirectorys.dirPath.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
            <h4>설치된 프로그램</h4>
            <p>{node.nodeProgram.programName}</p>
            <h4>파일 정보</h4>
            <p><strong>파일 이름:</strong> {node.nodeFile.File_name}</p>
            <pre>{node.nodeFile.File_content}</pre>
          </>
        )}
      </div>
      {reward && (
        <>
          <h3>보상</h3>
          <p>{reward.point}</p>
          <p>{reward.toolFile}</p>
        </>
      )}
    </div>
  );
};

Quest.propTypes = {
  missionId: PropTypes.string.isRequired
};

export default Quest;
