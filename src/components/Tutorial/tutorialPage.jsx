import React, { useRef, useEffect, useState, useMemo } from "react";
import "./tutorial.css";
import HighlightDescription from "./PopOver/popOverProp";
import { FaCog } from 'react-icons/fa';
import style from '../MainPageComp/modals/modal.module.css';

const Tutorial = ({ closeModal }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 좌표 및 크기 설정
    const coordinates = useMemo(() => [ //1.9 4.5 6.8 9.3 11.8 38.7 41.3
        { x: 0, y: 0, width: 0, height: 0, arrow: "none", bx: 24.5, by: 17, descript: "넷 러너 튜토리얼 입니다.", bg: require('../../assets/tutorial.png') },
        { x: 3.4, y: 5.0, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 3.2, descript: "퀘스트를 진행하는 메인탭입니다.", bg: require('../../assets/tutorial.png') },
        { x: 3.4, y: 7.6, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 4.0, descript: (<>스토리진행을 위한 퀘스트 탭입니다.<br /> 퀘스트를 클리어시 상점에서 사용가능한 크래딧이나, 툴을 받습니다.</>), bg: require('../../assets/tutorial.png') },
        { x: 3.4, y: 9.9, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 6.3, descript: (<>퀘스트를 클리어하면 얻을수 있는 보상으로 <br /> 도구를 구매 할수있는 상점 탭입니다.</>), bg: require('../../assets/wallpaper.jpg') },
        { x: 3.4, y: 12.3, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 9.2, descript: "랭킹 순위를 확인하는 탭입니다.", bg: require('../../assets/tutorial.png') },
        { x: 3.4, y: 14.5, width: 2.5, height: 10, arrow: "left", bx: 5.0, by: 13.5, descript: (<>구매하였거나 보상으로 얻은 툴들이 표시되는 곳입니다.</>), bg: require('../../assets/tutorial.png') },
        { x: 3.4, y: 40.3, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 31.5, descript: "로그아웃 및 bgm on/off 설정 창입니다.", bg: require('../../assets/tutorial.png') },
        { x: 3.4, y: 42.5, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 33.5, descript: "현재 사용자 프로필을 불러옵니다.", bg: require('../../assets/tutorial.png') },
        { x: 6, y: 5.0, width: 68, height: 23, arrow: "bottom", bx: 18.3, by: 23, descript: (<>사소한 명령어 타이핑이 귀찮은 사용자를 위한 그래픽 창입니다.<br />파일,디렉터리의 생성 삭제, 간단한 위치 이동 등만을 지원합니다.</>), bg: require('../../assets/tutorial.png') },
        { x: 6, y: 28.2, width: 68, height: 16, arrow: "top", bx: 18.3, by: 17.5, descript: "명령어를 입력하면 결과를 반환합니다.기본적으로 리눅스 명령어들 이지만 결과는 실제 리눅스와는 다릅니다.", bg: require('../../assets/tutorial.png') },
        {
            x: 0, y: 0, width: 0, height: 0, arrow: "none", bx: 18.3, by: 17, descript: (
                <>
                    튜토리얼은 설정 <FaCog /> 에서 다시 볼 수 있습니다.
                </>
            ), bg: require('../../assets/tutorial.png')
        },
    ], []);

    const wrap = useRef();
    const cursor = useRef();
    const buble = useRef();
    const clipmask = useRef();
    const bckg = useRef();

    useEffect(() => {
        // 초기 좌표 설정
        updatePosition(coordinates[0]);
    }, [coordinates]);
    const updatePosition = ({ x, y, width, height, bx, by, bg }) => {
        if (wrap.current) {
            bckg.current.style.setProperty('background-image', `url('${bg}')`);
            clipmask.current.style.setProperty('background-image', `url('${bg}')`);
            wrap.current.style.setProperty('--x', `${x}em`);
            wrap.current.style.setProperty('--y', `${y}em`);
            clipmask.current.style.setProperty('--width', `${width}em`);
            clipmask.current.style.setProperty('--height', `${height}em`);
            cursor.current.style.width = `${width}em`;
            cursor.current.style.height = `${height}em`;
            buble.current.style.setProperty('--x', `${bx}em`);
            buble.current.style.setProperty('--y', `${by}em`);
        }
    };

    const moveToNextCoordinate = (event) => {
        event.stopPropagation(); // 이벤트 전파 방지
        const nextIndex = (currentIndex + 1) % coordinates.length; // 다음 인덱스 계산
        setCurrentIndex(nextIndex);
        updatePosition(coordinates[nextIndex]); // 위치 업데이트
        if (nextIndex === 0) {
            closeModal(); // 모달 닫기 함수 호출
        }
    };

    return (
        <div className="tutoMain">
            <input className={style.title} value={"Tutorial Page"} readOnly />
            <section className="wrap" ref={wrap}>
                <div className="box" ref={bckg}></div>
                <div className="box" ref={clipmask} ></div>
                <div className="circle" ref={cursor}></div>
                <div className="pop" ref={buble}>

                    {currentIndex < coordinates.length && (
                        <HighlightDescription
                            direction={coordinates[currentIndex].arrow}
                            content={
                                <>
                                    {coordinates[currentIndex].descript}
                                </>
                            }
                        />
                    )}
                </div>
            </section>
            <button className={`tutoBtn ${style.normalButton}`} onClick={moveToNextCoordinate}>다음</button>
        </div>
    );
}

export default Tutorial;
