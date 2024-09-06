import React, { useRef, useEffect, useState, useMemo } from "react";
import "./tutorial.css";
import HighlightDescription from "./PopOver/popOverProp";

const Tutorial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 좌표 및 크기 설정
    const coordinates = useMemo(() => [ //1.9 4.5 6.8 9.3 11.8 38.7 41.3
        { x: 0, y: 0, width: 0, height: 0, arrow: "none", bx: 24.5, by: 17, descript: "넷 러너 튜토리얼 입니다." },
        { x: 3.4, y: 5.0, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 3.7, descript: "퀘스트를 진행하는 메인탭입니다." },
        { x: 3.4, y: 7.6, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 5.0, descript: "스토리진행을 위한 퀘스트 탭입니다.\n스토리 진행을 위해서는 먼저 확인 하기 바랍니다." },
        { x: 3.4, y: 9.9, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 6.9, descript: "퀘스트를 클리어하면 얻을수 있는 도구를 구매 할수있는 탭입니다." },
        { x: 3.4, y: 12.3, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 9.5, descript: "랭킹 순위를 확인하는 탭입니다." },
        { x: 3.4, y: 14.5, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 10.5, descript: "구매한 툴이 표시되는 곳입니다.\n해당 툴을 구매했다면,사용할 수 있습니다." },
        { x: 3.4, y: 40.3, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 32.0, descript: "로그아웃 및 bgm on/off 설정 창입니다." },
        { x: 3.4, y: 42.5, width: 2.5, height: 2.5, arrow: "left", bx: 5.0, by: 33.5, descript: "현재 사용자 프로필을 불러옵니다." },
        { x: 6, y: 5.0, width: 68, height: 23, arrow: "bottom", bx: 18.5, by: 23, descript: "사소한 명령어 타이핑이 귀찮은 사용자를 위한 그래픽 창입니다.\n파일,디렉터리의 생성 삭제, 간단한 위치 이동 등만을 지원합니다." },
        { x: 6, y: 28.2, width: 68, height: 16, arrow: "top", bx: 18.5, by: 17.5, descript: "명령어를 입력하면 결과를 반환합니다.기본적으로 리눅스 명령어들 이지만 결과는 실제 리눅스와는 다릅니다." },
    ], []);

    const wrap = useRef();
    const cursor = useRef();
    const buble = useRef();
    const clipmask = useRef();

    useEffect(() => {
        // 초기 좌표 설정
        updatePosition(coordinates[0]);
    }, [coordinates]);
    const updatePosition = ({ x, y, width, height, bx, by }) => {
        if (wrap.current) {
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

    const moveToNextCoordinate = () => {
        const nextIndex = (currentIndex + 1) % coordinates.length; // 다음 인덱스 계산
        setCurrentIndex(nextIndex);
        updatePosition(coordinates[nextIndex]); // 위치 업데이트
    };

    return (
        <div className="tutoMain">
            <section className="wrap" ref={wrap}>
                <div className="box"></div>
                <div className="box" ref={clipmask}></div>
                <div className="circle" ref={cursor}></div>
                <div className="pop" ref={buble}>
                    {currentIndex < coordinates.length && (
                        <HighlightDescription
                            direction={`${coordinates[currentIndex].arrow}`}
                            content={coordinates[currentIndex].descript}
                        />
                    )}
                </div>
            </section>
            <button className="tutoBtn" onClick={moveToNextCoordinate}>다음</button>
        </div>
    );
}

export default Tutorial;
