import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import TerminalInteraction from '../Terminal/TerminalInteraction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SocketResult } from '../../socket/Gsocket';
import styles from './DirectoryViewer.module.css'; // Import CSS module
import { API } from '../../config';
import ContextMenu from './menu/Menu';
import Modal from './modals/Modal';

// 파일 유형에 따라 적절한 아이콘을 반환하는 함수
function getIconForType(type) {
  switch (type) {
    case 'directory':
      return <FontAwesomeIcon id={type} icon={faFolder} size="4x" color="white" />;
    case 'file':
      return <FontAwesomeIcon id={type} icon={faFile} size="4x" color="white" />;
    default:
      return <FontAwesomeIcon id={type} icon={faFile} size="4x" color="white" />;
  }
}

// DirectoryViewer 컴포넌트 정의, forwardRef를 사용하여 부모 컴포넌트에서 참조 가능
const DirectoryViewer = forwardRef((props, ref, initialPath = '/') => {
  const [path, setPath] = useState(initialPath); // 현재 경로 상태 관리
  const [contents, setContents] = useState(null); // 디렉토리 내용 상태 관리
  const [socket, setSocket] = useState(null); // 소켓 연결 상태 관리
  const [pathHistory, setPathHistory] = useState([]); // 경로 히스토리 관리
  TerminalInteraction.setDirectoryViewer(ref.current); // TerminalInteraction에 디렉토리 뷰어 설정
  const currentMissionID = localStorage.getItem('missionId');

  const [isMenuVisible, setIsMenuVisible] = useState(false); //우클릭 메뉴 관리
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); //메뉴 좌표
  const [contextClick, setContextClick] = useState(); // 메뉴창 내용

  const [isModalOpen, setIsModalOpen] = useState(false);  //모달창 관리
  const [modalTitle, setModalTitle] = useState("");  //모달창 타이틀
  const [isEdit, setIsEdit] = useState(false); //편집여부
  const [context, setContext] = useState(""); //모달창 내용
  const [isFileName, setIsFileName] = useState(false);
  const openModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsFileName(false);
    setModalTitle("");
    setIsEdit(false);
    setContext("");
    setIsModalOpen(false);
  };

  // 컴포넌트가 마운트될 때 디렉토리 데이터와 소켓 설정
  useEffect(() => {
    const fetchDirectoryData = async () => {
      let fdata = null;
      await fetch(`${API.USERFILE}${currentMissionID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const files = data.files;
          const filestype = data.filestype;
          const currentPath = data.currentpath;
          fdata = { files, filestype, currentPath };
          setPath(currentPath);
        })
        .catch((error) => console.error('초기화 에러:', error));
      setContents(fdata);
    };
    fetchDirectoryData();
    const newSocket = new SocketResult();
    newSocket.joinRoom(Math.floor(100000 + Math.random() * 900000).toString());
    setSocket(newSocket);
    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      if (newSocket) {
        newSocket.leaveRoom();
      }
    };
  }, []);

  // 부모 컴포넌트에서 사용할 수 있는 메서드 정의
  useImperativeHandle(ref, () => ({
    // 터미널에 텍스트 추가 및 소켓을 통한 메시지 전송
    appendToTerminal: (text) => {
      if (socket) {
        socket.sendMessage(text);
        socket.getMessage((chars) => {
          TerminalInteraction.appendToTerminal(chars);
          setContext(chars);
        })
        setTimeout(() => {
          socket.sendMessage('ls -al');
          socket.getMessage((chat) => {
            const temp1 = chat;
            const temp2 = chat;
            const regex1 = /[^[\]]+(?=\[)/g;
            const regex2 = /(?<=\[).*?(?=\])/g;
            const files = temp1.match(regex1);
            const filestype = temp2.match(regex2);
            const setDir = { files, filestype };
            setContents(setDir);
          });
        }, 500);
      }
      TerminalInteraction.appendToTerminal(text);
    },
    // 디렉토리 내용을 업데이트
    updateDirectoryContent(newContent) {
      if (socket) {
        if (newContent.split(' ')[0] === 'vi') {
          const fname = newContent.split(' ');
          setIsEdit(true);
          setTimeout(() => openModal(fname[1]), 500);
          setModalTitle(fname[1]);
          console.log(modalTitle);
        }
        setContext(newContent);
        socket.sendMessage('pwd');
        socket.getMessage((currentPath) => {
          setPath(currentPath.trim());
          socket.sendMessage('ls -al');
          socket.getMessage((chat) => {
            const temp1 = chat;
            const temp2 = chat;
            const regex1 = /[^[\]]+(?=\[)/g;
            const regex2 = /(?<=\[).*?(?=\])/g;
            const files = temp1.match(regex1);
            const filestype = temp2.match(regex2);
            const setDir = { files, filestype };
            setContents(setDir);
          });
        });
      }
    },
  }));

  // 디렉토리 항목 클릭 핸들러
  const handleItemClick = (item, type) => {
    const trimmedItem = item.trim();
    if (type === 'directory') {
      setPathHistory([...pathHistory, path]);
      ref.current.appendToTerminal(`cd ${trimmedItem}`);
      socket.getMessage(() => {
        socket.sendMessage('pwd');
        socket.getMessage((currentPath) => {
          setPath(currentPath.trim());
          socket.sendMessage('ls -al');
          socket.getMessage((chat) => {
            const temp1 = chat;
            const temp2 = chat;
            const regex1 = /[^[\]]+(?=\[)/g;
            const regex2 = /(?<=\[).*?(?=\])/g;
            const files = temp1.match(regex1);
            const filestype = temp2.match(regex2);
            const setDir = { files, filestype };
            setContents(setDir);
          });
        });
      });
    } else {
      setIsEdit(false);
      setTimeout(() => openModal(trimmedItem), 500);
      ref.current.appendToTerminal(`cat ${trimmedItem}`);
      socket.getMessage((content) => {
        setContext(content);
      });
    }
  };
  

  // 뒤로가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    if (socket) {
      socket.sendMessage('cd ..');
      socket.getMessage(() => {
        socket.sendMessage('pwd');
        socket.getMessage((currentPath) => {
          setPath(currentPath.trim());
          socket.sendMessage('ls -al');
          socket.getMessage((chat) => {
            const temp1 = chat;
            const temp2 = chat;
            const regex1 = /[^[\]]+(?=\[)/g;
            const regex2 = /(?<=\[).*?(?=\])/g;
            const files = temp1.match(regex1);
            const filestype = temp2.match(regex2);
            const setDir = { files, filestype };
            setContents(setDir);
          });
        });
      });
    }
  };
  
  

  //우클릭 이벤트
  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsMenuVisible(true);
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setContextClick(event.target.id);
  };

  //밖에 클릭시 꺼짐
  const handleClickOutside = (event) => {
    if (event.target.closest('.context-menu') === null) {
      setIsMenuVisible(false);
    }
  };

  // 메뉴 항목 클릭 이벤트
  const handleMenuItemClick = (option) => {
    console.log('Menu item clicked:', option);
    if (option === 'edit') {
      ref.current.appendToTerminal(`vi ${modalTitle}`);
      setIsEdit(true);
      setTimeout(() => openModal(modalTitle), 500);
    }
    if (option === 'new_f' || option === 'new_d') {
    }
    setIsMenuVisible(false);
  };
  // 저장
  const handleSave = () => {
    console.log(context);
    socket.sendContext(`write ${modalTitle}`, context);
  };

  if (!contents) {
    return <div>Loading...</div>;
  }

  return (
    <div id={'background'} className={styles.directoryViewer} onContextMenu={handleContextMenu} onClick={handleClickOutside}>
      <ContextMenu
        isVisible={isMenuVisible}
        position={menuPosition}
        onMenuItemClick={handleMenuItemClick}
        clickId={contextClick}
      />
      <div id={'background'} className={styles.directoryViewerHeader} onClick={() => handleBackClick()} onDragStart={(e) => e.preventDefault()}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
        뒤로 가기
      </div>
      <div id={'background'} className={styles.directoryViewerGrid}>
        {contents?.files?.map((item, index) => (
          <div id={'background'} key={index} className={styles.directoryViewerItem} draggable="false">
            <div id={contents.filestype[index]}>
              <div id={contents.filestype[index]} className={styles.directoryViewerIcon} onContextMenu={() => setModalTitle(item.trim())} onClick={() => handleItemClick(item, contents.filestype[index])} draggable="false">
                {getIconForType(contents.filestype[index])}
              </div>
              <div id={contents.filestype[index]} draggable="false">{item.trim()}</div>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.directoryViewerPathBar}>{path}</p>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="modalContent">
          <span className="close" onClick={closeModal}>&times;</span>
          <label htmlFor="content">{modalTitle}</label>
          {isEdit === true &&
            <>
              <textarea id="content" rows="30" cols="65" value={context}
                onChange={(e) => setContext(e.target.value)}>
                {context}
              </textarea>
              <button onClick={() => { handleSave(); closeModal(); }}>저장</button>
            </>}
          {isEdit === false && <textarea id="content" rows="30" cols="65" readOnly>
            {context}
          </textarea>}
        </div>
      </Modal>
    </div>
  );
});

export { DirectoryViewer };
