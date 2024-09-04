import React, { useRef, useEffect, useState, useMemo } from "react";
import "./tutorial.css";
import HighlightDescription from "./PopOver/popOverProp";

const Tutorial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 좌표 및 크기 설정
    const coordinates = useMemo(() => [
        { x: 6.4, y: 1.9, width: 2.5, height: 2.5, arrow: "left", bx: 8.9, by: 1.5, descript: "1" },
        { x: 6.4, y: 4.5, width: 2.5, height: 2.5, arrow: "left", bx: 8.9, by: 4.5, descript: "2" },
        { x: 6.4, y: 6.8, width: 2.5, height: 2.5, arrow: "left", bx: 8.9, by: 7, descript: "3" },
        { x: 6.4, y: 9.3, width: 2.5, height: 2.5, arrow: "left", bx: 8.9, by: 9, descript: "4" },
        { x: 6.4, y: 11.8, width: 2.5, height: 2.5, arrow: "left", bx: 8.9, by: 12, descript: "5" },
        { x: 6.4, y: 38.7, width: 2.5, height: 2.5, arrow: "left", bx: 8.9, by: 38, descript: "6" },
        { x: 6.4, y: 41.3, width: 2.5, height: 2.5, arrow: "left", bx: 8.9, by: 41, descript: "7" },
        { x: 9, y: 1.9, width: 72, height: 25, arrow: "bottom", bx: 41, by: 27, descript: "8" },
        { x: 9, y: 25, width: 72, height: 20, arrow: "top", bx: 41, by: 22, descript: "9" },
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
