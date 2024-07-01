import React, { useState } from 'react';
import './menu.css';

const ContextMenu = ({ isVisible, position, onMenuItemClick, clickId }) => {
    return (clickId &&
        <div
            className="context-menu"
            style={{
                display: isVisible ? 'block' : 'none',
                left: position.x - 55 + 'px',
                top: position.y - 30 + 'px',
            }}
        >
            {clickId == 'file' &&
                <ul>
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
                </ul>
            }
            {clickId == 'directory' &&
                <ul>
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
                </ul>
            }
            {clickId == 'background' &&
                <ul>
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
                </ul>
            }
        </div>
    );
};

export default ContextMenu;
