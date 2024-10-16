import React, { useState, useEffect, useRef, useCallback } from 'react';
import Swal from 'sweetalert2';
import styles from './WormMazeGame.module.css';
import WormSVG from '../../../assets/Worm'; // SVG 컴포넌트 임포트
import { generateMaze } from './Utils/mazeGenerator';
import { convertGridToWalls } from './Utils/mazeConverter';

const CELL_SIZE = 60; // 셀 크기 (픽셀 단위)
const GRID_COLS = 10; // 열 수
const GRID_ROWS = 10; // 행 수
const INITIAL_CLEAR_CELLS = 2; // 초기 출발 경로를 위한 셀 수

const WORM_SIZE = 30; // 지렁이 크기 (픽셀 단위)
const WORM_RADIUS = WORM_SIZE / 3; // 충돌 반경 (픽셀 단위)

const ROTATION_SPEED = 5; // 프레임당 회전 속도 (도)
const WORM_SPEED = 0.5; // 지렁이 이동 속도 (픽셀 단위)

const EXIT_ZONE = {
  x: GRID_COLS * CELL_SIZE - CELL_SIZE / 2,
  y: GRID_ROWS * CELL_SIZE - CELL_SIZE / 2,
  size: 20,
}; // 출구 위치와 크기

const CONTROL_KEYS = {
  ArrowUp: 270,
  ArrowDown: 90,
  ArrowLeft: 180,
  ArrowRight: 0,
  w: 270,
  W: 270,
  s: 90,
  S: 90,
  a: 180,
  A: 180,
  d: 0,
  D: 0,
}; // 키보드 입력에 따른 목표 각도

const WormMazeGame = ({ onClose }) => {
  const [mazeWalls, setMazeWalls] = useState([]); // 동적 미로 벽
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const requestRef = useRef(null);
  const mazeRef = useRef(null);

  // 지렁이 상태를 useRef로 관리하여 불필요한 리렌더링 방지
  const wormRef = useRef({
    x: CELL_SIZE / 2, // 초기 위치 (0,0 셀 중앙)
    y: CELL_SIZE / 2,
    angle: 90, // 초기 각도 (아래쪽)
    targetAngle: 90, // 목표 각도 초기화
    speed: WORM_SPEED,
  });

  // 게임 초기화 함수
  const initializeGame = useCallback(() => {
    cancelAnimationFrame(requestRef.current);
    createMaze(); // 새로운 미로 생성
    wormRef.current = {
      x: CELL_SIZE / 2,
      y: CELL_SIZE / 2,
      angle: 90,
      targetAngle: 90,
      speed: WORM_SPEED,
    };
    setGameStarted(false);
    setGameOver(false);
  }, []);

  // 미로 생성 함수
  const createMaze = useCallback(() => {
    const grid = generateMaze(GRID_COLS, GRID_ROWS);

    // 초기 출발 경로 확보 (아래쪽으로 N개의 셀)
    for (let y = 0; y < INITIAL_CLEAR_CELLS; y++) {
      if (y < GRID_ROWS - 1) {
        grid[y][0].walls.bottom = false;
        grid[y + 1][0].walls.top = false;
      }
    }

    let walls = convertGridToWalls(grid, CELL_SIZE);

    // 출구 셀의 하단 및 오른쪽 벽 제거 (오른쪽 하단 출구)
    const exitX1 = (GRID_COLS - 1) * CELL_SIZE;
    const exitY1 = (GRID_ROWS - 1) * CELL_SIZE;
    const exitX2 = GRID_COLS * CELL_SIZE;
    const exitY2 = GRID_ROWS * CELL_SIZE;

    walls = walls.filter(
      (wall) =>
        !(
          (wall.x1 === exitX2 && wall.y1 === exitY1 && wall.x2 === exitX2 && wall.y2 === exitY2) || // 오른쪽 벽 제거
          (wall.x1 === exitX1 && wall.y1 === exitY2 && wall.x2 === exitX2 && wall.y2 === exitY2) // 하단 벽 제거
        )
    );

    // 출발 셀의 상단 및 왼쪽 벽 제거 (출발점 명확하게)
    walls = walls.filter(
      (wall) =>
        !(
          (wall.x1 === 0 && wall.y1 === 0 && wall.x2 === CELL_SIZE && wall.y2 === 0) || // 상단 벽 제거
          (wall.x1 === 0 && wall.y1 === 0 && wall.x2 === 0 && wall.y2 === CELL_SIZE) // 왼쪽 벽 제거
        )
    );

    setMazeWalls(walls);
  }, []);

  // 키보드 입력 처리
  const handleKeyDown = useCallback((e) => {
    if (CONTROL_KEYS.hasOwnProperty(e.key)) {
      e.preventDefault(); // 기본 동작 방지 (예: 페이지 스크롤)
      setGameStarted(true); // 게임 시작
      setGameOver(false); // 게임 오버 상태 초기화

      wormRef.current.targetAngle = CONTROL_KEYS[e.key];
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 선과 원의 충돌 감지 함수
  const lineIntersectsCircle = useCallback((x1, y1, x2, y2, cx, cy, radius) => {
    const acx = cx - x1;
    const acy = cy - y1;
    const abx = x2 - x1;
    const aby = y2 - y1;

    const abSquared = abx * abx + aby * aby;
    const ac_ab = acx * abx + acy * aby;
    let t = ac_ab / abSquared;

    t = Math.max(0, Math.min(1, t));

    const closestX = x1 + abx * t;
    const closestY = y1 + aby * t;

    const distance = Math.hypot(cx - closestX, cy - closestY);
    return distance < radius;
  }, []);

  // 충돌 감지 함수
  const checkCollision = useCallback(
    (x, y) => {
      // 게임 보드 경계 체크
      if (
        x < WORM_RADIUS ||
        x > GRID_COLS * CELL_SIZE - WORM_RADIUS ||
        y < WORM_RADIUS ||
        y > GRID_ROWS * CELL_SIZE - WORM_RADIUS
      ) {
        return true;
      }

      // 내부 벽과의 충돌 체크
      for (let wall of mazeWalls) {
        if (lineIntersectsCircle(wall.x1, wall.y1, wall.x2, wall.y2, x, y, WORM_RADIUS)) {
          return true;
        }
      }
      return false;
    },
    [mazeWalls, lineIntersectsCircle]
  );

  // 지렁이 이동 함수
  const moveWorm = useCallback(() => {
    let { x, y, angle, targetAngle, speed } = wormRef.current;

    // **수정된 회전 로직: 최소 각도 경로로 회전 (시계 또는 반시계)**
    if (angle !== targetAngle) {
      let delta = (targetAngle - angle + 360) % 360;
      if (delta > 180) {
        angle -= ROTATION_SPEED;
      } else {
        angle += ROTATION_SPEED;
      }

      // 목표 각도에 도달했을 때
      const newDelta = (targetAngle - angle + 360) % 360;
      if (
        (delta <= ROTATION_SPEED && delta > 0) ||
        (delta >= 360 - ROTATION_SPEED && delta < 360)
      ) {
        angle = targetAngle;
      }

      angle = (angle + 360) % 360; // 0~359도로 유지
    }

    const rad = (angle * Math.PI) / 180;
    const newX = x + Math.cos(rad) * speed;
    const newY = y + Math.sin(rad) * speed;

    // 충돌 감지
    const collision = checkCollision(newX, newY);
    console.log(`Moving to (${newX.toFixed(2)}, ${newY.toFixed(2)}), Collision: ${collision}`);

    if (collision) {
      if (!gameOver) {
        setGameOver(true);
        Swal.fire({
          title: '게임 오버!',
          text: '벽에 부딪혔습니다.',
          icon: 'error',
          confirmButtonText: '다시 시작',
        }).then(() => {
          initializeGame();
        });
      }
      return;
    }

    // 출구 도착 감지
    const exitDist = Math.hypot(newX - EXIT_ZONE.x, newY - EXIT_ZONE.y);
    if (exitDist < EXIT_ZONE.size) {
      if (!gameOver) {
        setGameOver(true);
        Swal.fire({
          title: '축하합니다!',
          text: '출구에 도착했습니다! 게임 클리어.',
          icon: 'success',
          confirmButtonText: '다시 시작',
        }).then(() => {
          initializeGame();
          onClose(true);
        });
      }
      return;
    }

    // 지렁이 위치 업데이트
    wormRef.current = { ...wormRef.current, x: newX, y: newY, angle };
  }, [checkCollision, gameOver, initializeGame]);

  // 애니메이션 루프
  const animate = useCallback(() => {
    moveWorm();
    requestRef.current = requestAnimationFrame(animate);
  }, [moveWorm]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameStarted, gameOver, animate]);

  const handleStart = () => {
    setGameStarted(true);
    setGameOver(false);
  };

  return (
    <div className={styles.gameContainer}>
      <h2>지렁이 미로찾기 게임</h2>
      <div className={styles.maze} ref={mazeRef}>
        {/* 벽 렌더링 */}
        {mazeWalls.map((wall, index) => {
          const length = Math.hypot(wall.x2 - wall.x1, wall.y2 - wall.y1);
          const angle = (Math.atan2(wall.y2 - wall.y1, wall.x2 - wall.x1) * 180) / Math.PI;
          return (
            <div
              key={index}
              className={styles.wall}
              style={{
                left: wall.x1,
                top: wall.y1,
                width: length,
                height: '15px', // 벽 두께 증가
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0',
              }}
            ></div>
          );
        })}
        {/* 출구 렌더링 */}
        <div
          className={styles.exit}
          style={{
            left: EXIT_ZONE.x - EXIT_ZONE.size / 2,
            top: EXIT_ZONE.y - EXIT_ZONE.size / 2,
            width: EXIT_ZONE.size,
            height: EXIT_ZONE.size,
          }}
        >
        </div>
        {/* 지렁이 렌더링 */}
        <div
          className={styles.worm}
          style={{
            left: wormRef.current.x,
            top: wormRef.current.y,
            transform: `translate(-50%, -50%) rotate(${wormRef.current.angle}deg)`,
          }}
        >
          <WormSVG size={WORM_SIZE} color="#ff5722" /> {/* 지렁이 크기 조정 */}
        </div>
      </div>
      {!gameStarted ? (
        <button onClick={handleStart} className={styles.button}>
          게임 시작
        </button>
      ) : (
        <button onClick={initializeGame} className={styles.button}>
          게임 중지
        </button>
      )}
    </div>
  );
};

export default WormMazeGame;
