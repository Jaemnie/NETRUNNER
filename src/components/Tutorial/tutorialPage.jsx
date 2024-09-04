import React, { useRef, useEffect, useState, useMemo } from "react";
import "./tutorial.css";
import HighlightDescription from "./PopOver/popOverProp";

const Tutorial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 좌표 및 크기 설정
    const coordinates = useMemo(() => [
        { x: 100, y: 30, width: 50, height: 50, arrow: "left", bx: 150, by: 30, descript: "qwdd" },
        { x: 100, y: 70, width: 50, height: 50, arrow: "left", bx: 150, by: 70, descript: "wedeeeq" },
        { x: 100, y: 110, width: 50, height: 50, arrow: "left", bx: 150, by: 110, descript: "dsdss" },
        { x: 100, y: 150, width: 50, height: 50, arrow: "left", bx: 150, by: 150, descript: "ddds" },
        { x: 100, y: 190, width: 50, height: 50, arrow: "left", bx: 150, by: 190, descript: "dsdsss" },
        { x: 100, y: 620, width: 50, height: 50, arrow: "left", bx: 150, by: 620, descript: "dqqddddd" },
        { x: 100, y: 660, width: 50, height: 50, arrow: "left", bx: 150, by: 660, descript: "dsdsdddss" },
        { x: 150, y: 30, width: 1150, height: 400, arrow: "bottom", bx: 650, by: 450, descript: "dsdsddss" },
        { x: 150, y: 400, width: 1150, height: 300, arrow: "top", bx: 650, by: 350, descript: "dsdsdddss" },
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
            wrap.current.style.setProperty('--x', `${x}px`);
            wrap.current.style.setProperty('--y', `${y}px`);
            clipmask.current.style.setProperty('--width', `${width}px`);
            clipmask.current.style.setProperty('--height', `${height}px`);
            cursor.current.style.width = `${width}px`;
            cursor.current.style.height = `${height}px`;
            buble.current.style.setProperty('--x', `${bx}px`);
            buble.current.style.setProperty('--y', `${by}px`);
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
                            content={`${coordinates[currentIndex].descript}`}
                        />
                    )}
                </div>
            </section>
            <button className="tutoBtn" onClick={moveToNextCoordinate}>다음</button>
        </div>
    );
}

export default Tutorial;
