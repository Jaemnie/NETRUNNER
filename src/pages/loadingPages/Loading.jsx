
import { React, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./loading.module.css";

function Loading() {
    const bar = useRef(null);
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentage((prevPercentage) => {
                const percentage = prevPercentage + 0.01;
                if (percentage >= 1) {
                    clearInterval(interval);
                    // 진행률이 100%에 도달했을 때 추가 동작
                    setTimeout(() => {
                        navigate('/main');
                    }, 50);
                }
                return percentage;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [percentage, navigate]);

    return (
        <div ref={bar} className={styles.progress_bar} style={{ '--progress': `${percentage * 100}%` }}>
            <div className={styles.box}>
                {/* 로딩 중과 로딩 완료 텍스트를 조건부로 렌더링 */}
                {percentage < 1 ? (
                    <p className={styles.loading_text}>로딩중...</p>
                ) : (
                    <p className={styles.done_text}>로딩 완료 🎉</p>
                )}
                <div className={styles.box_front} style={{ '--progress': `${percentage * 100}%` }}></div>
                <div className={styles.box_bottom}></div>
            </div>
        </div>
    );
}

export default Loading;