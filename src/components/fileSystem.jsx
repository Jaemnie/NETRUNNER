import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { TerminalInteraction } from './TerminalInteraction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

function getIconForType(type) {
  switch (type) {
    case 'directory':
      return <FontAwesomeIcon icon={faFolder} size="4x" />;
    case 'file':
      return <FontAwesomeIcon icon={faFile} size="4x" />;
    default:
      return <FontAwesomeIcon icon={faFile} size="4x" />;
  }
}
const DirectoryViewer = forwardRef((props, ref ,initialPath ) => {
  const [directoryContent, setDirectoryContent] = useState([]);
  
  const [path, setPath] = useState(initialPath);
  const [contents, setContents] = useState(null);

  useImperativeHandle(ref, () => ({
    // DirectoryViewer에서 터미널 창에 텍스트를 입력하는 함수
    appendToTerminal: (text) => {
      TerminalInteraction.appendToTerminal(text);
    },

    // DirectoryViewer에서 파일 시스템 내용을 변경하는 함수
    updateDirectoryContent: (newContent) => {
      console.log("terminput:",newContent);
      if(newContent==='cd directory1'){
        exampleData={
          files: ['file2.txt', 'file2.txt', 'directory2'],
          filestype: ['file', 'file', 'directory']
        }
        setContents(exampleData);
      }

    }
  }));
  let exampleData = {
    files: ['file1.txt', 'file2.txt', 'directory1','file1.txt', 'file2.txt', 'directory1','file1.txt', 'file2.txt', 'directory1','file1.txt', 'file2.txt', 'directory1'],
    filestype: ['file', 'file', 'directory','file', 'file', 'directory','file', 'file', 'directory','file', 'file', 'directory']
  };
  useEffect(() => {
    setContents(exampleData);
    // // 백엔드에서 제공받은 데이터를 가공하여 화면에 표시
    // const fetchDirectoryData = async () => {
    //   const data = await fetch('/api/directory');
    //   setDirectoryContent(data);
    // };
    // fetchDirectoryData();
  }, []);

  function handleItemClick(item, type) {
    if (type === 'directory') {
      const newPath = path === '/' ? `/${item}` : `${path}/${item}`;
      setPath(newPath);
      ref.current.appendToTerminal(`cd ${item}`);
      exampleData={
        files: ['file2.txt', 'file2.txt', 'directory2'],
        filestype: ['file', 'file', 'directory']
      }
      setContents(exampleData);
      console.log(path);
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
    flexGrow:'1',
    // overflowY : 'scroll'
  };

  const itemStyle = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const pathBar = {
    position: 'absolute', /* 절대적 위치 설정 */
    bottom: 0, /* 바닥에서 0px의 위치 */
    textAlign: 'left', /* 텍스트 중앙 정렬 */
    backgroundColor: '#c5e3df9d'/* 배경색 설정 */
  }

  return (
    <div style={{position: 'relative',display:'flex'}}>
      <p style={pathBar}>{path}</p>
      <div style={{borderRight:'black solid 1px'}}>
        sidebar
      </div>
      <div style={gridStyle}>
        {contents.files.map((item, index) => (
          <div key={index} style={itemStyle} onClick={() => handleItemClick(item, contents.filestype[index])}>
            {getIconForType(contents.filestype[index])}
            <div>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
  // return (
  //   <div>
  //     {directoryContent.map((item) => (
  //       <div key={item.id}>{item.name}</div>
  //     ))}
  //   </div>
  // );
});

export  {DirectoryViewer};
