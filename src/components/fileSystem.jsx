import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import TerminalInteraction  from './TerminalInteraction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import { SocketResult } from './Gsocket';

function getIconForType(type) {
  switch (type) {
    case 'directory':
      return <FontAwesomeIcon icon={faFolder} size="4x" color='white' />;
    case 'file':
      return <FontAwesomeIcon icon={faFile} size="4x" color='white' />;
    default:
      return <FontAwesomeIcon icon={faFile} size="4x" color='white' />;
  }
}

const DirectoryViewer = forwardRef((props, ref, initialPath = '/') => {
  const [path, setPath] = useState(initialPath);
  const [contents, setContents] = useState(null);
  const [socket,setSockets] = useState(null);
  TerminalInteraction.setDirectoryViewer(ref);
useEffect(() => {
  const fetchDirectoryData = async () => {
    let fdata = null;
    await fetch('http://172.16.230.134:4000/filesystem/1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      const files = data.files;
      const filestype = data.filestype;
      fdata = {files,filestype};
    })
    .catch(error => console.error('초기화 에러:', error));
    setContents(fdata);
  };
  fetchDirectoryData();
  setSockets(new SocketResult());
}, []);

useImperativeHandle(ref, () => ({
  appendToTerminal: (text) => {
    TerminalInteraction.appendToTerminal(text);
    //GUI->터미널
    socket.sendMessage(text);
    socket.getMessage((char)=>{
      console.log(char);
    });
    socket.sendMessage("ls -al");
    socket.getMessage((chat) => {
    const temp1 = chat;
    const temp2 = chat;
    const regex1 = /[^[\]]+(?=\[)/g;
    const regex2 = /(?<=\[).*?(?=\])/g;
    const files = temp1.match(regex1); 
    const filestype = temp2.match(regex2);
    const setDir = {files,filestype};
    setContents(setDir);
  });
  },

  updateDirectoryContent(newContent){
    //터미널->GUI
    socket.sendMessage('pwd');
    socket.getMessage((chat) => {
      socket.sendMessage(`cd ${chat}`);
    });
    socket.sendMessage("ls -al");
    socket.getMessage((chat) => {
        const temp1 = chat;
        const temp2 = chat;
        const regex1 = /[^[\]]+(?=\[)/g;
        const regex2 = /(?<=\[).*?(?=\])/g;
        const files = temp1.match(regex1); 
        const filestype = temp2.match(regex2);
        const setDir ={files,filestype};
        setContents(setDir);
      });
  },
}
));

function handleItemClick(item, type) {
  if (type === 'directory') {
    const newPath = path === '/' ? `/${item}` : `${path}/${item}`;
    setPath(newPath);
    ref.current.appendToTerminal(`cd ${item}`);
  } else {
    ref.current.appendToTerminal(`cat ${item}`);
    console.log(item + ' file clicked');
  }
}

  if (!contents) {
    return <div>Loading...</div>;
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '10px',
    textAlign: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    color: 'white',
    padding: '10px', // 내부 여백 추가 (선택 사항)
    overflowY: 'auto', // 세로 스크롤 가능
  };

  const itemStyle = {
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
  };

  const iconStyle = {
    cursor: 'pointer',
  };

  const pathBar = {
    position: 'absolute',
    bottom: 0,
    textAlign: 'left',
    backgroundColor: '#c5e3df9d',
    color: 'white',
    width: '100%',
    padding: '10px',
  };

  return (
    <div style={{ position: 'relative', display: 'flex', color: 'white', flexDirection: 'column', height: '55.5vh' }}>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={gridStyle}>
          {contents?.files?.map((item, index) => (
            <div key={index} style={itemStyle}>
              <div style={iconStyle} onClick={() => handleItemClick(item, contents.filestype[index])}>
                {getIconForType(contents.filestype[index])}
              </div>
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>
      <p style={pathBar}>{path}</p>
    </div>
  );
});

export { DirectoryViewer };
