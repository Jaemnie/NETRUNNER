import React, { useState, useEffect, useCallback } from 'react';
import styles from './MetrixPuzzle.module.css'; // CSS 모듈 임포트

const Game = () => {
    const [matrix, setMatrix] = useState([]); // 행렬 상태
    const [buffer, setBuffer] = useState([]); // 선택된 셀을 저장할 버퍼 상태
    const [currentSelectionMode, setCurrentSelectionMode] = useState('row'); // 현재 선택 모드 (행/열)
    const [currentRow, setCurrentRow] = useState(null); // 선택된 행
    const [currentColumn, setCurrentColumn] = useState(null); // 선택된 열
    const [correctSequences, setCorrectSequences] = useState([]); // 정답 시퀀스 상태
    const [isCorrect, setIsCorrect] = useState(false); // 정답 여부 상태
    const [selectedCoordinates, setSelectedCoordinates] = useState([]); // 선택된 좌표 상태

    const generateMatrix = useCallback(() => {
        const newMatrix = Array.from({ length: 5 }, () =>
            Array.from({ length: 5 }, () => getRandomHex())
        );
        setMatrix(newMatrix);
    }, []);

    const generateCorrectSequences = useCallback(() => {
        const sequences = [];
        const sequenceCount = getRandomInt(1, 4); // 랜덤으로 1부터 3까지의 정답 시퀀스 개수

        for (let i = 0; i < sequenceCount; i++) {
            const length = getRandomInt(2, 6); // 각 시퀀스의 길이
            const sequence = [];

            while (sequence.length < length) {
                const randomRow = getRandomInt(0, 5);
                const randomCol = getRandomInt(0, 5);
                const value = matrix[randomRow][randomCol];
                if (!sequence.includes(value)) {
                    sequence.push(value);
                }
            }
            sequences.push(sequence);
        }
        sequences.sort((a, b) => a.length - b.length);
        setCorrectSequences(sequences);
    }, [matrix]);

    useEffect(() => {
        generateMatrix(); // 행렬 생성
    }, [generateMatrix]);

    useEffect(() => {
        if (matrix.length > 0) {
            generateCorrectSequences(); // 행렬이 생성된 후 정답 시퀀스 생성
        }
    }, [matrix, generateCorrectSequences]);

    const getRandomHex = () => {
        const randomNum = Math.floor(Math.random() * 256);
        return randomNum.toString(16).toUpperCase().padStart(2, '0'); // 2자리로 채우기
    };

    const handleCellClick = (value, rowIndex, colIndex) => (event) => {
        event.stopPropagation(); // 이벤트 전파 방지
        if (isSelectable(rowIndex, colIndex)) { // 클릭한 셀의 선택 가능성 체크
            // 선택된 셀의 값을 버퍼에 추가
            setBuffer((prev) => [...prev, value]);
            setSelectedCoordinates((prev) => [...prev, { rowIndex, colIndex }]); // 선택된 좌표 추가

            // 현재 선택 모드에 따라 행 또는 열 업데이트
            if (currentSelectionMode === 'row') {
                setCurrentRow(rowIndex);
                setCurrentColumn(colIndex);
            } else if (currentSelectionMode === 'column') {
                setCurrentRow(rowIndex);
                setCurrentColumn(colIndex);
            }

            // 정답 체크
            if (checkCorrectness()) {
                setIsCorrect(true);
            }

            toggleSelectionMode(); // 선택 모드 변경
        }
    };

    const toggleSelectionMode = () => {
        setCurrentSelectionMode((prev) => (prev === 'row' ? 'column' : 'row'));
    };

    const isSelectable = (rowIndex, colIndex) => {
        // 현재 선택된 좌표가 이미 선택된 좌표인지 확인
        const isAlreadySelected = selectedCoordinates.some(coord =>
            coord.rowIndex === rowIndex && coord.colIndex === colIndex
        );

        if (isAlreadySelected) {
            return false; // 이미 선택된 셀은 선택 불가
        }

        if (currentSelectionMode === 'row' && currentRow !== null) {
            return rowIndex === currentRow; // 현재 선택된 행의 셀만 선택 가능
        } else if (currentSelectionMode === 'column' && currentColumn !== null) {
            return colIndex === currentColumn; // 현재 선택된 열의 셀만 선택 가능
        }
        return true; // 기본적으로 모든 셀 선택 가능
    };

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    const checkCorrectness = () => {
        // 각 정답 시퀀스의 항목이 버퍼에 포함되어 있는지 확인
        return correctSequences.some(sequence => {
            return sequence.every(item => buffer.includes(item));
        });
    };

    const resetGame = () => {
        setBuffer([]); // 버퍼 초기화
        setIsCorrect(false); // 정답 여부 초기화
        setSelectedCoordinates([]); // 선택된 좌표 초기화
        generateMatrix(); // 새로운 행렬 생성
        generateCorrectSequences(); // 새로운 정답 시퀀스 생성
    };

    return (
        <div>
            <h2>Matrix Game</h2>
            <div className={styles.matrix}>
                {matrix.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        // 현재 선택 가능한 행 또는 열에 대해 배경색 변화
                        const isHighlighted = (currentSelectionMode === 'row' && rowIndex === currentRow) ||
                            (currentSelectionMode === 'column' && colIndex === currentColumn);
                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`${styles.cell} ${buffer.includes(cell) ? styles.selected : ''} ${isHighlighted ? styles.highlight : ''}`}
                                onClick={handleCellClick(cell, rowIndex, colIndex)} // 이벤트 핸들러 수정
                            >
                                {cell}
                            </div>
                        );
                    })
                )}
            </div>
            <div className={styles.bufferDisplay}>
                <h3>Selected Items (Buffer): {buffer.join(', ')}</h3>
                <h4>Correct Sequences:</h4>
                <ul>
                    {correctSequences.map((sequence, index) => (
                        <li key={index}>{sequence.join(', ')}</li>
                    ))}
                </ul>
                <h4>Is Correct:</h4>
                <ul>
                    {isCorrect ? <li>✔️ Correct!</li> : <li>❌ Try Again!</li>}
                </ul>
            </div>
            {isCorrect && <button onClick={resetGame}>Restart Game</button>}
        </div>
    );
};

export default Game;
