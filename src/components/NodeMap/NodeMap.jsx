import React, { useEffect, useRef, forwardRef, useState, useMemo, useImperativeHandle } from 'react';
import { Network } from 'vis-network';
import TerminalInteraction from '../Terminal/TerminalInteraction';

const NodeMap = forwardRef((props, ref) => {
    const container = useRef(null);
    const [nodes, setNodes] = useState([]); // 노드 배열 정의
    const [edges, setEdges] = useState([]);
    const [nextNodeId, setNextNodeId] = useState(2); // 다음 노드 ID를 관리
    const [currentNodeId, setCurrentNodeId] = useState(1); // 현재 선택된 노드 ID
    const [history, setHistory] = useState([1]); // 노드 이동 기록

    // 초기 노드 및 엣지 데이터
    const initialNodes = useMemo(() => [
        { id: 1, label: 'myNode', size: 15, shape: 'dot', fixed: true },
    ], []);

    const initialEdges = useMemo(() => [], []); // 기본적으로 엣지가 없음

    // Network options
    const options = useMemo(() => ({
        nodes: {
            shape: 'dot',
            size: 15,
            shadow: true,
            color: {
                border: 'white',
                background: 'skyblue'
            },
            font: {
                color: 'white',
                size: 15
            }
        },
        edges: {
            color: 'gray',
        },
        interaction: {
            zoomView: true,
            dragView: true,
            selectable: true, // 노드 선택 가능
        },
        autoResize: true,
        layout: {
            hierarchical: {
                direction: 'LR',
            }
        },
    }), []);

    // 노드 추가 함수
    const addNode = (label) => {
        const nodeExists = nodes.some(node => node.label === label);
        if (nodeExists) {
            console.log(`Node with label "${label}" already exists.`);
            return; // 이미 존재하면 추가하지 않음
        } else {
            const newNode = {
                id: nextNodeId,
                label: label,
                fixed: true,
            };
            setNodes((prevNodes) => [...prevNodes, newNode]); // 이전 노드 배열에 새 노드 추가
            setNextNodeId((prevId) => prevId + 1); // 다음 노드 ID 증가
        }
    };

    // 엣지 추가 함수
    const addEdge = (startID, endID) => {
        const newEdge = { from: startID, to: endID };
        setEdges((prevEdges) => [...prevEdges, newEdge]); // 이전 엣지 배열에 새 엣지 추가
    };

    // 노드 스타일 변경 함수
    const updateNodeStyle = (nodeId, newStyle) => {
        setNodes((prevNodes) => {
            return prevNodes.map(node => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        ...newStyle, // 새로운 스타일 적용
                    };
                }
                return node; // 다른 노드는 그대로 반환
            });
        });
    };

    // 초기 설정
    useEffect(() => {
        TerminalInteraction.setNodeMap(ref.current);
        setNodes(initialNodes); // 초기 노드 데이터로 설정
        setEdges(initialEdges); // 초기 엣지 데이터로 설정
        setNextNodeId(initialNodes.length + 1); // 다음 노드 ID 초기화
    }, [ref, initialNodes, initialEdges]);

    // Initialize network when nodes or edges change
    useEffect(() => {
        if (container.current) {
            const network = new Network(container.current, { nodes, edges }, options);
            network.fit();
            network.setOptions({
                manipulation: { enabled: false } // 편집 비활성화
            });

            const zoomLevel = 1.5; // 초기 줌 레벨 설정
            network.moveTo({ scale: zoomLevel });

            return () => {
                network.destroy(); // 컴포넌트 언마운트 시 네트워크 정리
            };
        }
    }, [nodes, edges, options]);

    // history가 변경될 때마다 실행
    useEffect(() => {
        console.log("Updated history:", history);
    }, [history]);

    useImperativeHandle(ref, () => ({
        // 디렉토리 내용을 업데이트
        updateMap(newContent) {
            const commandParts = newContent.split(' ');
            const command = commandParts[0];

            if (command.includes('scan')) {
                const label = JSON.parse(localStorage.getItem('ipData'));
                if (label) {
                    addNode(label); // 스캔 명령어로 새로운 노드 추가
                }

            } else if (command.includes('ssh')) {
                const targetLabel = commandParts[1];
                setNodes((prevNodes) => {
                    const targetNode = prevNodes.find(node => node.label === targetLabel);
                    if (targetNode) {
                        // 현재 노드 스타일을 기본으로 되돌림
                        updateNodeStyle(currentNodeId, {
                            color: { background: 'skyblue', border: 'white' },
                            size: 15
                        });
                        // 이동할 노드 스타일 변경
                        updateNodeStyle(targetNode.id, { color: { background: 'green', border: 'black' }, size: 20 });

                        // 이전 노드 ID 기록
                        setHistory((prevHistory) => [...prevHistory, targetNode.id]); // history에 현재 노드 ID 추가
                        addEdge(currentNodeId, targetNode.id); // 현재 노드와 타겟 노드 간의 엣지 추가
                        setCurrentNodeId(targetNode.id); // 현재 노드 ID 업데이트
                    } else {
                        console.log(`Node with label "${targetLabel}" not found.`);
                    }
                    return prevNodes; // 상태를 그대로 반환
                });

            } else if (command.includes('exit')) {
                // exit 명령어로 마지막 엣지 제거
                setEdges((prevEdges) => {
                    if (prevEdges.length > 0) {
                        const updatedEdges = prevEdges.slice(0, -1); // 마지막 엣지 제거

                        if (history.length > 1) {
                            updateNodeStyle(currentNodeId, {
                                color: { background: 'skyblue', border: 'white' },
                                size: 15
                            });
                            const lastNodeId = history[history.length - 2]; // 이전 노드 ID 가져오기 (마지막 요소)
                            setHistory((prevHistory) => prevHistory.slice(0, -1)); // history에서 마지막 요소 제거
                            setCurrentNodeId(lastNodeId); // 현재 노드 ID 업데이트
                            updateNodeStyle(lastNodeId, { color: { background: 'green', border: 'black' }, size: 20 }); // 스타일 변경
                        } else {
                            setCurrentNodeId(1); // 기본 노드로 돌아가기
                        }
                        return updatedEdges; // 업데이트된 엣지 배열 반환
                    }
                    return prevEdges; // 엣지가 없으면 그대로 반환
                });
            } else {
                console.log('Unknown command');
            }
        },
    }));

    return (
        <>
            {nodes.length !== 0 ? (
                <div>
                    <div ref={container} style={{ width: '100%', height: '100%' }} />
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>No data</p>
                </div>
            )}
        </>
    );
});

export default NodeMap;
