import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

function getIconForType(type) {
  switch (type) {
    case 'directory':
      return <FontAwesomeIcon icon={faFolder} size="5x" />;
    case 'file':
      return <FontAwesomeIcon icon={faFile} size="5x" />;
    default:
      return <FontAwesomeIcon icon={faFile} size="5x" />;
  }
}

const DirectoryViewer = ({ initialPath }) => {
  const [path, setPath] = useState(initialPath);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    // 백엔드 연동 로직은 여기에 구현
    const exampleData = {
      files: ['file1.txt', 'file2.txt', 'directory1'],
      filestype: ['file', 'file', 'directory']
    };
    setContents(exampleData);
  }, [path]);

  function handleItemClick(item, type) {
    if (type === 'directory') {
      const newPath = path === '/' ? `/${item}` : `${path}/${item}`;
      setPath(newPath);
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '20px',
    textAlign: 'center',
  };

  const itemStyle = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={gridStyle}>
      {contents.files.map((item, index) => (
        <div key={index} style={itemStyle} onClick={() => handleItemClick(item, contents.filestype[index])}>
          {getIconForType(contents.filestype[index])}
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};

export default DirectoryViewer;
