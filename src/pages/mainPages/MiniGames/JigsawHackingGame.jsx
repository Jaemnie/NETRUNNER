import React, { useState } from 'react';
import styles from './JigsawHackingGame.module.css'; // 스타일 파일을 따로 만들어줍니다.

function JigsawHackingGame({ onClose }) {
  const [grid, setGrid] = useState(generateGrid());

  function generateGrid() {
    // 초기 퍼즐 상태를 설정합니다 (단순한 예시).
    return [
      [true, false, true],
      [false, true, false],
      [true, false, true]
    ];
  }

  function rotatePiece(row, col) {
    // 특정 위치의 조각을 회전시킵니다.
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col]; // true/false로 토글하는 간단한 회전 로직
    setGrid(newGrid);
  }

  function checkSolution() {
    // 간단한 예시: 모든 조각이 true이면 성공
    return grid.every(row => row.every(piece => piece));
  }

  return (
    <div className={styles.jigsawContainer}>
      <h2>Jigsaw Hacking Game</h2>
      <div className={styles.grid}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.gridRow}>
            {row.map((piece, colIndex) => (
              <div
                key={colIndex}
                className={`${styles.gridPiece} ${piece ? styles.active : ''}`}
                onClick={() => rotatePiece(rowIndex, colIndex)}
              >
                {piece ? 'O' : 'X'}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={onClose} className={styles.closeButton}>Close</button>
      {checkSolution() && <p>Success! You've completed the hack!</p>}
    </div>
  );
}

export default JigsawHackingGame;
