import React from 'react';
import './menu.css';

const ContextMenu = ({ isVisible, position, onMenuItemClick, clickId }) => {
    if (!clickId) return null;

    console.log('Rendering context menu for:', clickId); // 로그 추가

    const isFile = !clickId.includes('/') && clickId.includes('.');
    const isDirectory = !clickId.includes('.') && !clickId.includes('background');

    return (
        <div
            className="context-menu"
            style={{
                display: isVisible ? 'block' : 'none',
                left: `${position.x}px`,  // 마우스 커서의 x 위치
                top: `${position.y}px`,   // 마우스 커서의 y 위치
            }}
        >
            <ul>
                {isFile && (
                    <>
                        <li>
                            <a href="#" onClick={() => onMenuItemClick('edit')}>
                                수정
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => onMenuItemClick('del_f')}>
                                삭제
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => onMenuItemClick('dup_f')}>
                                복제
                            </a>
                        </li>
                    </>
                )}
                {isDirectory && (
                    <>
                        <li>
                            <a href="#" onClick={() => onMenuItemClick('del_d')}>
                                삭제
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => onMenuItemClick('dup_d')}>
                                복제
                            </a>
                        </li>
                    </>
                )}
                {clickId === 'background' && (
                    <>
                        <li>
                            <a href="#" onClick={() => onMenuItemClick('new_f')}>
                                새 파일
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => onMenuItemClick('new_d')}>
                                새 디렉터리
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default ContextMenu;
