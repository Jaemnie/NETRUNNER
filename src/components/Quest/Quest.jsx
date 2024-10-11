import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaList, FaEnvelope } from 'react-icons/fa';
import styles from './Quest.module.css';
import { API } from '../../config';
import Swal from 'sweetalert2';

// Quest 컴포넌트 정의
const Quest = ({ userId, show, onClose, questData, fetchMission }) => {
  const [activeTab, setActiveTab] = useState('list'); // 현재 활성화된 탭 상태
  const [displayedMessages, setDisplayedMessages] = useState([]); // 표시된 메시지 상태
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태
  const messagesLoaded = useRef(false); // 메시지가 로드되었는지 여부를 추적하는 ref
  const questContainerRef = useRef(null); // 퀘스트 컨테이너를 참조하기 위한 ref

  // 모달이 열릴 때 localStorage에서 메시지 불러오기
  useEffect(() => {
    if (show) {
      const savedMessages = localStorage.getItem('questMessages');
      const M_size = JSON.parse(localStorage.getItem('questMessageSize'));
      const count_M = JSON.parse(localStorage.getItem('countingSave'));
      if (savedMessages && (M_size === count_M)) {
        setDisplayedMessages(JSON.parse(savedMessages));
        messagesLoaded.current = true;
      } else {
        messagesLoaded.current = false;
      }
    }
  }, [show]);

  // 활성화된 탭이 'message'일 때 메시지를 로드하는 useEffect
  useEffect(() => {
    if (activeTab === 'message' && !messagesLoaded.current) {
      setDisplayedMessages([]);
      setIsTyping(true);
      console.log(questData.scenario[0]);
      const messages = questData.scenario[0].story[0].replace(/\n|\r|\t|"*/g, '').trim().split(",");
      const target = questData.scenario[0].target[0].replace(/\n|\r|\t|"*/g, '').trim().split(",");
      messages.forEach((message, index) => {
        setTimeout(() => {
          setDisplayedMessages((prevMessages) => {
            const processedMessages = message.trim().split('᛭')
            processedMessages[1] = processedMessages[1].split(/\\n/g);
            // console.log("메시지 체크", processedMessages);
            const updatedMessages = [...prevMessages, processedMessages]; // prevMessages를 올바르게 사용하여 업데이트
            console.log(updatedMessages);
            localStorage.setItem('questMessages', JSON.stringify(updatedMessages)); // 메시지를 localStorage에 저장
            localStorage.setItem('questMessageSize', JSON.stringify(index));
            localStorage.setItem('questTarget', JSON.stringify(target));
            return updatedMessages;
          });
          if (index === messages.length - 1) {
            setIsTyping(false);
            messagesLoaded.current = true;
          }
        }, (index + 1) * 1500);
        localStorage.setItem('countingSave', JSON.stringify(messages.length - 1));
      });
    } else {

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
      {
        displayedMessages.map((message, messageIndex) => (
          <div key={messageIndex} className={`${message[0] === 'solo' ? styles.solo : message[0] === 'player' ? styles.player : styles.other}`}>
            {message[0] !== 'solo' && message[0] !== 'player' && <p className={styles.messageSender}>{message[0]}</p>}
            {message[1].map((ms, messageIndex) => (
              <div key={messageIndex} className={`${styles.message} ${message[0] === 'solo' ? styles.solotext : message[0] === 'player' ? styles.playertext : styles.othertext}`}>
                <p>{ms}</p>
              </div>
            ))}
          </div>
        ))
      }
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
      {localStorage.getItem('questTarget') && (
        <ul>
          <h2> 목표 </h2>
          <li>{JSON.parse(localStorage.getItem('questTarget'))}</li>
        </ul>
      )}
    </div>
  );

  // 탭 클릭 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    console.log(messagesLoaded.current);
    if (tab === 'message' && !messagesLoaded.current) {
      messagesLoaded.current = false;
    }
  };

  // 미션 완료 함수
  const completeMission = async () => {
    const token = localStorage.getItem('accessToken');
    const missionid = localStorage.getItem('missionId');

    try {
      const response = await fetch(`${API.MISSIONCOMPLETE}/${missionid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, missionId: questData.missionId })
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!text) {
        throw new Error('Response body is empty');
      }

      const result = JSON.parse(text);

      if (result.success) {
        console.log('Next Mission ID:', result.nextMissionId);
        localStorage.setItem('missionId', result.nextMissionId); // 다음 미션 ID를 저장
        localStorage.removeItem('questMessages'); // questMessages 초기화
        localStorage.removeItem('questMessageSize');
        localStorage.removeItem('questTarget');
        localStorage.removeItem('countingSave');
        await fetchMission(result.nextMissionId); // 새로운 미션 ID로 fetchMission 호출
        Swal.fire({
          icon: "success",
          text: "미션 완료, 다음 미션을 확인해주세요.",
          background: '#1e1e1e', // 다크 배경 색상
          color: '#ffffff', // 글자 색상
          iconColor: '#4CAF50', // 아이콘 색상
          customClass: {
            popup: 'swal-popup-dark',
            confirmButton: 'swal-button-dark',
            title: 'swal-title-dark',
            content: 'swal-content-dark',
          },
          didOpen: () => {
            const swalPopup = document.querySelector('.swal2-popup');
            if (swalPopup) {
              swalPopup.style.fontFamily = "'Noto Sans KR', sans-serif";
            }
          }
        });
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          text: "미션 완료에 실패했습니다.",
          background: '#1e1e1e', // 다크 배경 색상
          color: '#ffffff', // 글자 색상
          iconColor: '#E74C3C', // 아이콘 색상
          customClass: {
            popup: 'swal-popup-dark',
            confirmButton: 'swal-button-dark',
            title: 'swal-title-dark',
            content: 'swal-content-dark',
          },
          didOpen: () => {
            const swalPopup = document.querySelector('.swal2-popup');
            if (swalPopup) {
              swalPopup.style.fontFamily = "'Noto Sans KR', sans-serif";
            }
          }
        });
      }
    } catch (error) {
      console.error('미션 완료 중 오류 발생:', error);
      Swal.fire({
        icon: "error",
        text: "미션 완료 중 오류가 발생했습니다.",
        background: '#1e1e1e', // 다크 배경 색상
        color: '#ffffff', // 글자 색상
        iconColor: '#E74C3C', // 아이콘 색상
        customClass: {
          popup: 'swal-popup-dark',
          confirmButton: 'swal-button-dark',
          title: 'swal-title-dark',
          content: 'swal-content-dark',
        },
        didOpen: () => {
          const swalPopup = document.querySelector('.swal2-popup');
          if (swalPopup) {
            swalPopup.style.fontFamily = "'Noto Sans KR', sans-serif";
          }
        }
      });
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ipad}>
          <div className={styles.screen}>
            <div className={styles.tabContainer}>
              <div className={styles.tab} onClick={() => handleTabClick('list')}>
                <FaList size={24} />
              </div>
              <div className={styles.tab} onClick={() => handleTabClick('message')}>
                <FaEnvelope size={24} />
              </div>
            </div>
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
