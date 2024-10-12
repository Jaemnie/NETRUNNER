import React, { useState, useEffect } from 'react';
import styles from './FlipMatrixGame.module.css';

const MATRIX_SIZE = 5;
const FRONT = 'front';
const BACK = 'back';
const MAX_FIX_COUNT = 2;

// 랜덤으로 앞면 또는 뒷면을 반환하는 함수
const getRandomSide = () => (Math.random() < 0.5 ? FRONT : BACK);

const FlipMatrixGame = ({ onClose }) => {
  const [matrix, setMatrix] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalState, setFinalState] = useState(null);
  const [fixedCells, setFixedCells] = useState([]); // 고정된 셀의 좌표 배열

  // 게임 초기화 함수
  const initializeGame = () => {
    const initialMatrix = Array.from({ length: MATRIX_SIZE }, () =>
      Array.from({ length: MATRIX_SIZE }, () => getRandomSide())
    );
    setMatrix(initialMatrix);
    setMoveCount(0);
    setGameOver(false);
    setFinalState(null);
    setFixedCells([]); // 고정 셀 초기화
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // 셀 클릭 핸들러
  const handleCellClick = (row, col) => {
    if (gameOver) return;

    // 현재 셀이 고정되어 있으면 아무 동작도 하지 않음
    if (fixedCells.some(([r, c]) => r === row && c === col)) return;

    setMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.map((rowArr) => [...rowArr]);

      // 인접한 셀의 좌표
      const adjacentCells = [
        [row - 1, col], // 위
        [row + 1, col], // 아래
        [row, col - 1], // 왼쪽
        [row, col + 1], // 오른쪽
      ];

      adjacentCells.forEach(([r, c]) => {
        if (r >= 0 && r < MATRIX_SIZE && c >= 0 && c < MATRIX_SIZE) {
          // 셀이 고정되어 있지 않은 경우에만 뒤집기
          if (!fixedCells.some(([fr, fc]) => fr === r && fc === c)) {
            newMatrix[r][c] = newMatrix[r][c] === FRONT ? BACK : FRONT;
          }
        }
      });

      return newMatrix;
    });

    setMoveCount((prev) => prev + 1);
  };

  // 셀 우클릭 핸들러 (고정)
  const handleCellRightClick = (e, row, col) => {
    e.preventDefault(); // 기본 컨텍스트 메뉴 방지

    // 이미 고정된 셀인 경우 해제
    const isFixed = fixedCells.some(([r, c]) => r === row && c === col);
    if (isFixed) {
      setFixedCells((prev) => prev.filter(([r, c]) => r !== row || c !== col));
      return;
    }

    // 최대 고정 횟수 초과 시 경고
    if (fixedCells.length >= MAX_FIX_COUNT) {
      alert(`최대 ${MAX_FIX_COUNT}개의 셀만 고정할 수 있습니다.`);
      return;
    }

    // 셀 고정
    setFixedCells((prev) => [...prev, [row, col]]);
  };

  // 게임 종료 조건 확인
  useEffect(() => {
    if (matrix.length === 0) return;

    const firstCell = matrix[0][0];
    const allSame = matrix.every((row) => row.every((cell) => cell === firstCell));

    if (allSame) {
      setGameOver(true);
      setFinalState(firstCell);
    }
  }, [matrix]);

  // 게임 재시작 핸들러
  const handleRestart = () => {
    initializeGame();
  };

  // 남은 고정 횟수 계산
  const remainingFixes = MAX_FIX_COUNT - fixedCells.length;

  return (
    <div className={styles.gameContainer}>
      <h2>양면 뒤집기 미니게임</h2>
      <div className={styles.matrix}>
        {matrix.map((rowArr, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {rowArr.map((cell, colIndex) => {
              const isFixed = fixedCells.some(([r, c]) => r === rowIndex && c === colIndex);
              return (
                <div
                  key={colIndex}
                  className={`${styles.cell} ${
                    cell === FRONT ? styles.front : styles.back
                  } ${isFixed ? styles.fixed : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles.info}>
        <p>이동 횟수: {moveCount}</p>
        <p>남은 고정 횟수: {remainingFixes}</p>
        {gameOver && (
          <div className={styles.gameOver}>
            <p>
              축하합니다! 모든 셀이 {finalState === FRONT ? '앞면' : '뒷면'}으로 통일되었습니다.
            </p>
            <button onClick={handleRestart} className={styles.button}>
              다시 시작
            </button>
            <button onClick={() => onClose(true)} className={styles.button}>
              종료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlipMatrixGame;
