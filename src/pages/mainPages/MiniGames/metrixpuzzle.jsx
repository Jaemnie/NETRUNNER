import React, { useState, useEffect, useCallback } from 'react';
import styles from './MetrixPuzzle.module.css'; // CSS 모듈 임포트

const Game = () => {
    const [matrix, setMatrix] = useState([]); // 행렬 상태
    const [buffer, setBuffer] = useState([]); // 선택된 셀을 저장할 버퍼 상태
    const [currentSelectionMode, setCurrentSelectionMode] = useState('row'); // 현재 선택 모드 (행/열)
    const [currentRow, setCurrentRow] = useState(null); // 선택된 행
    const [currentColumn, setCurrentColumn] = useState(null); // 선택된 열
    const [correctSequences, setCorrectSequences] = useState([]); // 정답 시퀀스 상태

    const generateMatrix = useCallback(() => {
        const newMatrix = Array.from({ length: 5 }, () =>
            Array.from({ length: 5 }, () => getRandomHex())
        );
        setMatrix(newMatrix);
    }, []);

    const generateCorrectSequences = useCallback(() => {
        const sequences = [];
        const sequenceCount = 3;

        for (let i = 0; i < sequenceCount; i++) {
            const length = getRandomInt(2, 6);
            const sequence = [];

            // 행렬에서 랜덤으로 선택된 셀들을 정답 시퀀스로 추가
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

        if (isSelectable(rowIndex, colIndex)) {
            if (currentSelectionMode === 'row') {
                setCurrentRow(rowIndex);
                setCurrentColumn(colIndex);
            } else {
                if (currentRow !== null && currentColumn !== null) {
                    // 기존 버퍼에 포함 여부와 관계없이 추가
                    setBuffer((prev) => [...prev, value]);
                }
                toggleSelectionMode();
            }
        }
    };

    const toggleSelectionMode = () => {
        setCurrentSelectionMode((prev) => (prev === 'row' ? 'column' : 'row'));
    };

    const isSelectable = (rowIndex, colIndex) => {
        if (currentSelectionMode === 'row' && currentRow !== null) {
            return rowIndex === currentRow; // 현재 선택된 행의 셀만 선택 가능
        } else if (currentSelectionMode === 'column' && currentColumn !== null) {
            return colIndex === currentColumn; // 현재 선택된 열의 셀만 선택 가능
        }
        return true;
    };

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    const checkCorrectness = () => {
        const results = correctSequences.map((sequence) => {
            return sequence.every((item) => buffer.includes(item)) && checkOrder(sequence);
        });
        return results;
    };

    const checkOrder = (sequence) => {
        const sequenceIndices = sequence.map((item) => buffer.indexOf(item));
        return sequenceIndices.every((value, index) => {
            return index === 0 || value > sequenceIndices[index - 1];
        });
    };

    return (
        <div>
            <h2>Matrix Game</h2>
            <div className={styles.matrix}>
                {matrix.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`${styles.cell} ${buffer.includes(cell) ? styles.selected : ''}`}
                            onClick={handleCellClick(cell, rowIndex, colIndex)} // 이벤트 핸들러 수정
                        >
                            {cell}
                        </div>
                    ))
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
                    {checkCorrectness().map((isCorrect, index) => (
                        <li key={index}>Sequence {index + 1}: {isCorrect ? '✔️' : '❌'}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Game;
