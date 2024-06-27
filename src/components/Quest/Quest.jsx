import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaList, FaEnvelope } from 'react-icons/fa';
import styles from './Quest.module.css';
import { API } from '../../config';

// Quest 컴포넌트 정의
const Quest = ({ userId, show, onClose, questData, fetchMission }) => {
  const [activeTab, setActiveTab] = useState('list'); // 현재 활성화된 탭 상태
  const [displayedMessages, setDisplayedMessages] = useState([]); // 표시된 메시지 상태
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태
  const messagesLoaded = useRef(false); // 메시지가 로드되었는지 여부를 추적하는 ref
  const questContainerRef = useRef(null); // 퀘스트 컨테이너를 참조하기 위한 ref

  // 활성화된 탭이 'message'일 때 메시지를 로드하는 useEffect
  useEffect(() => {
    if (activeTab === 'message' && !messagesLoaded.current) {
      setDisplayedMessages([]);
      setIsTyping(true);
      const messages = questData.scenario[0].split(' ,');
      messages.forEach((message, index) => {
        setTimeout(() => {
          setDisplayedMessages(prevMessages => [...prevMessages, message.trim()]);
          if (index === messages.length - 1) {
            setIsTyping(false);
            messagesLoaded.current = true;
          }
        }, (index + 1) * 2000);
      });
    }
  }, [activeTab, questData]);

  // 스크롤을 위한 마우스 이벤트 처리 useEffect
  useEffect(() => {
    const container = questContainerRef.current;
    let startY;
    let scrollTop;

    const onMouseDown = (e) => {
      startY = e.pageY - container.offsetTop;
      scrollTop = container.scrollTop;
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (startY !== undefined) {
        const y = e.pageY - container.offsetTop;
        const walk = y - startY;
        container.scrollTop = scrollTop - walk;
      }
    };

    const onMouseUp = () => {
      startY = undefined;
      container.style.cursor = 'grab';
    };

    if (container) {
      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mouseleave', onMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mouseleave', onMouseUp);
      }
    };
  }, []);

  // show가 false일 경우 컴포넌트를 렌더링하지 않음
  if (!show) {
    return null;
  }

  // 메시지 목록을 렌더링하는 함수
  const renderMessageList = () => (
    <div className={styles.messageList}>
      <div className={styles.profileHeader}>
        <img src="https://i.imgur.com/FuHIa08.jpeg" alt="Profile" className={styles.profileImage} />
        <h2>010-XXXX-XXXX</h2>
      </div>
      {displayedMessages.map((message, index) => (
        <div key={index} className={styles.message}>
          <p>{message}</p>
        </div>
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );

  // 미션 세부 정보를 렌더링하는 함수
  const renderMissionDetails = () => (
    <div className={styles.missionDetails}>
      <h2>미션 상세 정보</h2>
      <p><strong>노드 정보</strong></p>
      <ul>
        <li><strong>IP 주소:</strong> {questData.node[0].nodeIP[0]}</li>
        <li><strong>목표가 가진 프로그램:</strong> {questData.node[0].nodeProgram[0].programName[0]}</li>
      </ul>
      <p><strong>보상</strong></p>
      <ul>
        <li><strong>포인트:</strong> {questData.reward[0].point[0]}</li>
        <li><strong>도구 파일:</strong> {questData.reward[0].toolFile[0]}</li>
      </ul>
      <button onClick={completeMission} className={styles.completeButton}>미션 완료</button>
    </div>
  );

  // 탭 클릭 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'message' && !messagesLoaded.current) {
      messagesLoaded.current = false;
    }
  };

  // 미션 완료 함수
  const completeMission = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API.MISSIONCOMPLETE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, missionId: questData.missionId })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        await fetchMission(result.nextMissionId);
      } else {
        alert('미션 완료에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error completing mission:', error);
    }
  };

  return (
    // 모달 오버레이 클릭 시 onClose 함수 호출
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* 모달 콘텐츠 클릭 시 이벤트 전파 중단 */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ipad}>
          <div className={styles.screen}>
            {/* 탭 컨테이너 */}
            <div className={styles.tabContainer}>
              <div className={styles.tab} onClick={() => handleTabClick('list')}>
                <FaList size={24} />
              </div>
              <div className={styles.tab} onClick={() => handleTabClick('message')}>
                <FaEnvelope size={24} />
              </div>
            </div>
            {/* 퀘스트 컨테이너 */}
            <div className={styles.questContainer} ref={questContainerRef}>
              {activeTab === 'list' && questData && renderMissionDetails()}
              {activeTab === 'message' && questData && renderMessageList()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 타이핑 인디케이터 컴포넌트
const TypingIndicator = () => (
  <div className={styles.typingIndicator}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

// PropTypes를 사용하여 props의 타입을 정의
Quest.propTypes = {
  userId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  questData: PropTypes.object.isRequired,
  fetchMission: PropTypes.func.isRequired
};

export default Quest;
