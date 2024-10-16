import React, { useEffect, useState } from "react";
import styles from './RotatePuzzle.module.css';
const RotatePuzzleGame = ({ onClose }) => {
    const [arrSize, SetArrSize] = useState();
    const [variable1, setVariable1] = useState([]);
    const [variable2, setVariable2] = useState([]);
    const [resultText, setResultText] = useState("");

    useEffect(() => {
        SetArrSize(16);
        const buffer = new Array(arrSize);
        const answer = new Array(arrSize);
        for (let i = 0; i < arrSize; i++) {
            buffer[i] = 1;
            answer[i] = Math.floor(Math.random() * 2);
        }

        setVariable1(buffer);
        setVariable2(answer);
        setResultText("");

    }, [arrSize]);

    const handleRotate = (e) => {
        let newVariable1 = []; // 새로운 배열로 초기화

        if (e.key === "a") {
            newVariable1 = [...variable1]; // 기존 값을 복사
            let tmp = newVariable1.pop(); // 맨 마지막 요소를 꺼냄
            newVariable1.unshift(tmp); // 앞에 추가
        } else if (e.key === "d") {
            newVariable1 = [...variable1];
            let tmp = newVariable1.shift();
            newVariable1.push(tmp);
        } else if (e.key === "k") {
            newVariable1 = [...variable1];
            newVariable1[6] = invert(newVariable1[6]);
        } else {
            e.preventDefault();
            console.log("wrong input");
        }

        // 상태를 새 배열로 업데이트
        setVariable1(newVariable1);
    };

    const invert = (v) => {
        return v === 0 ? 1 : 0;
    }
    const checkCorrect = () => {
        const isTrue = variable1.length === variable2.length && variable1.every((v1, index) => v1 === variable2[index]);

        if (isTrue) {
            setResultText("Success");
            onClose(isTrue);
        } else {
            setResultText("Failed");
        }

    }
    useEffect(() => {
        window.addEventListener('keydown', handleRotate);
        return () => {
            window.removeEventListener('keydown', handleRotate); // 컴포넌트 언마운트 시 이벤트 리스너 제거
        };
    }, [variable1]);

    return (
        <div >
            <div className={styles.box}>
                key : {variable1.map((v1, index) => (<span style={
                    index === 6 ? { color: '#316497' } :
                        { color: "#5bd5a7" }
                }>{v1}</span>))}
                <br />
                lock : {variable2.map(v2 => (<span>{v2}</span>))}
            </div>
            <button className={styles.button} onClick={checkCorrect}>Check Correctness</button>
            <span>{resultText}</span>
        </div>
    );
}
export default RotatePuzzleGame;






