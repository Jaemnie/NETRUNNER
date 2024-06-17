import React, { useState, useEffect } from 'react';
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

const DirectoryViewer = ({ initialPath }) => {
  const [path, setPath] = useState(initialPath);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    // 백엔드 연동 로직은 여기에 구현
    const exampleData = {
      files: ['file1.txt', 'file2.txt', 'directory1','file1.txt', 'file2.txt', 'directory1','file1.txt', 'file2.txt', 'directory1','file1.txt', 'file2.txt', 'directory1'],
      filestype: ['file', 'file', 'directory','file', 'file', 'directory','file', 'file', 'directory','file', 'file', 'directory']
    };
    setContents(exampleData);
    // setContents();
  }, [path]);


  //이벤트 핸들러
  function handleItemClick(item, type) {
    if (type === 'directory') {
      const newPath = path === '/' ? `/${item}` : `${path}/${item}`;
      setPath(newPath);
      console.log(path);
    } else {
      console.log(item + ' file clicked');
    }
  }

  if (!contents) {
    return <div>Loading...</div>;
  }

  // 스타일 정의
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
};

export default DirectoryViewer;


