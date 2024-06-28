import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import TerminalInteraction from '../Terminal/TerminalInteraction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SocketResult } from '../../socket/Gsocket';
import styles from './DirectoryViewer.module.css'; // Import CSS module
import { API } from '../../config'

// 파일 유형에 따라 적절한 아이콘을 반환하는 함수
function getIconForType(type) {
  switch (type) {
    case 'directory':
      return <FontAwesomeIcon icon={faFolder} size="4x" color="white" />;
    case 'file':
      return <FontAwesomeIcon icon={faFile} size="4x" color="white" />;
    default:
      return <FontAwesomeIcon icon={faFile} size="4x" color="white" />;
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
          fdata = { files, filestype };
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
      TerminalInteraction.appendToTerminal(text);

      if (socket) {
        if (text.split(" ")[0] === "cat") {

        } else {
          socket.sendMessage(text);
          socket.getMessage((char) => {
            console.log(char);
          });
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
        }
      }
    },
    // 디렉토리 내용을 업데이트
    updateDirectoryContent(newContent) {
      if (socket) {
        socket.sendMessage('pwd');
        socket.getMessage((chat) => {
          socket.sendMessage(`cd ${chat}`);
        });
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
      }
    },
  }));

  // 디렉토리 항목 클릭 핸들러
  const handleItemClick = (item, type) => {
    const trimmedItem = item.trim();
    const newPath = path === '/' ? `/${trimmedItem}` : `${path}/${trimmedItem}`;
    if (type === 'directory') {
      setPathHistory([...pathHistory, path]);
      setPath(newPath);
      ref.current.appendToTerminal(`cd ${trimmedItem}`);
    } else {
      ref.current.appendToTerminal(`cat ${trimmedItem}`);
      console.log(trimmedItem + ' file clicked');
    }
  };

  // 뒤로가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    if (pathHistory.length > 0) {
      const previousPath = pathHistory.pop();
      setPathHistory([...pathHistory]);
      setPath(previousPath);
      ref.current.appendToTerminal('cd ..');
    }
  };

  if (!contents) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.directoryViewer}>
      <div className={styles.directoryViewerHeader} onClick={() => handleBackClick} onDragStart={(e) => e.preventDefault()}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
        뒤로 가기
      </div>
      <div className={styles.directoryViewerGrid}>
        {contents?.files?.map((item, index) => (
          <div key={index} className={styles.directoryViewerItem} draggable="false">
            <div className={styles.directoryViewerIcon} onClick={() => handleItemClick(item, contents.filestype[index])} draggable="false">
              {getIconForType(contents.filestype[index])}
            </div>
            <div draggable="false">{item.trim()}</div>
          </div>
        ))}
      </div>
      <p className={styles.directoryViewerPathBar}>{path}</p>
    </div>
  );
});

export { DirectoryViewer };
