import React from 'react';
import Quest from './quest';

const App = () => {
  const missionId = '1'; // 예시로 미션 ID를 하드코딩하였습니다. 실제 사용 시 동적으로 설정할 수 있습니다.

  return (
    <div>
      <Quest missionId={missionId} />
    </div>
  );
};

export default App;
