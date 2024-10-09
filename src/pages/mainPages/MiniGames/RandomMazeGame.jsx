import React, { useState, useEffect, useCallback } from 'react';
import styles from './RandomMazeGame.module.css';

const generateMaze = (width, height) => {
    const maze = Array.from({ length: height }, () => Array(width).fill(1)); // 1: 벽
    const stack = [];

    const startX = 1;
    const startY = 1;
    maze[startY][startX] = 0; // 0: 빈 공간, 길

    stack.push([startX, startY]);

    const directions = [
        [0, 2], [2, 0], [0, -2], [-2, 0],
    ];

    while (stack.length) {
        const [x, y] = stack.pop();
        const neighbors = [];

        directions.forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            if (ny > 0 && ny < height && nx > 0 && nx < width && maze[ny][nx] === 1) {
                neighbors.push([nx, ny]);
            }
        });

        if (neighbors.length) {
            stack.push([x, y]);
            const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[(y + ny) / 2][(x + nx) / 2] = 0; // 빈 공간 설정
            maze[ny][nx] = 0; // 빈 공간 설정
            stack.push([nx, ny]);
        }
    }

    maze[1][0] = 2; // 시작점
    maze[height - 2][width - 1] = 3; // 종료점

    return { maze, start: { x: startX, y: startY } };
};

const Game = ({ onClose }) => {
    const [maze, setMaze] = useState([]);
    const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 0 });
    const viewRadius = 1; // 플레이어 주변의 시야 반경 (3x3)

    const resetGame = () => {
        const { maze: newMaze, start } = generateMaze(9, 9);
        setMaze(newMaze);
        setPlayerPosition(start);
    };

    useEffect(() => {
        resetGame(); // 초기 게임 설정
    }, []);

    const movePlayer = (dx, dy) => {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (newY >= 0 && newY < maze.length && newX >= 0 && newX < maze[0].length && maze[newY][newX] !== 1) {
            setPlayerPosition({ x: newX, y: newY });

            // 종료점에 도착했을 때 게임 리셋
            if (maze[newY][newX] === 3) {
                resetGame(); // 게임 리셋
                onClose();
            }
        }
    };

    const handleKeyPress = useCallback((event) => {
        switch (event.key) {
            case 'w':
                movePlayer(0, -1);
                break;
            case 's':
                movePlayer(0, 1);
                break;
            case 'a':
                movePlayer(-1, 0);
                break;
            case 'd':
                movePlayer(1, 0);
                break;
            default:
                break;
        }
    }, [movePlayer]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const visibleMaze = maze.map((row, y) =>
        row.map((cell, x) => {
            const inView = Math.abs(playerPosition.x - x) <= viewRadius && Math.abs(playerPosition.y - y) <= viewRadius;
            return inView ? cell : -1; // -1은 보이지 않는 타일
        })
    );

    return (
        <div>
            <div className={styles.maze}>
                {visibleMaze.map((row, y) => (
                    <div key={y} className={styles.mazeRow}>
                        {row.map((cell, x) => {
                            const isPlayer = playerPosition.x === x && playerPosition.y === y;
                            const isStart = cell === 2;
                            const isEnd = cell === 3;
                            const isWall = cell === 1;
                            const isPath = cell === 0;

                            return (
                                <div
                                    key={x}
                                    className={`${styles.cell} ${isPlayer ? styles.player : isStart ? styles.start : isEnd ? styles.end : isPath ? styles.path : isWall ? styles.wall : styles.hidden}`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className={styles.controls}>
                <p>W: Up, A: Left, S: Down, D: Right</p>
            </div>
        </div>
    );
};

export default Game;
