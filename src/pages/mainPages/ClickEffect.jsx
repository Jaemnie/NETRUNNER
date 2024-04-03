import React, { useEffect, useState } from 'react';

const ClickEffect = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y - 10 + 'px', // 원 중심이 클릭 지점에 오도록 조정
        left: x - 10 + 'px',
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        opacity:0.5,
        pointerEvents: 'none', // 이펙트가 클릭 이벤트를 방해하지 않도록 설정
      }}
    ></div>
  );
};

export default ClickEffect;
