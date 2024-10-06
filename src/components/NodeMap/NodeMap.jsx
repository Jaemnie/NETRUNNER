import React, { useEffect, useRef, forwardRef, useState, useMemo, useImperativeHandle, useCallback } from 'react';
import { Network } from 'vis-network';
import TerminalInteraction from '../Terminal/TerminalInteraction';

const NodeMap = forwardRef((props, ref) => {
    const container = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [nextNodeId, setNextNodeId] = useState(2);
    const [currentNodeId, setCurrentNodeId] = useState(1);
    const [history, setHistory] = useState([1]);
    const [, forceUpdate] = useState(0);
    const [options] = useState({
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
        layout: {
            hierarchical: {
                direction: 'LR', // 원하는 방향 설정
            }
        },
        interaction: {
            zoomView: false,
            dragView: true,
            selectable: false,
        },
    });
    const initialNodes = useMemo(() => [
        { id: 1, label: 'myNode', size: 15, fixed: true },
    ], []);

    const initialEdges = useMemo(() => [], []);

    const addNode = (label) => {
        setNodes((prevNodes) => {
            const nodeExists = prevNodes.some(node => node.label === label);
            console.log("addNodes check:", prevNodes);
            console.log("nodeExists : ", nodeExists);

            if (nodeExists) {
                console.log(`Node with label "${label}" already exists.`);
                return prevNodes; // 기존 상태를 반환
            } else {
                const newNode = {
                    id: nextNodeId,
                    label: label,
                    fixed: true,
                };
                setNextNodeId((prevId) => prevId + 1); // nextNodeId를 먼저 업데이트
                return [...prevNodes, newNode]; // 새로운 노드를 포함한 상태 반환
            }
        });
    };


    const addEdge = (startID, endID) => {
        const newEdge = { from: startID, to: endID };
        setEdges((prevEdges) => [...prevEdges, newEdge]);
    };

    useEffect(() => {
        TerminalInteraction.setNodeMap(ref.current);
        setNodes(initialNodes);
        setEdges(initialEdges);
        setNextNodeId(initialNodes.length + 1);
    }, [ref, initialNodes, initialEdges]);

    const initializeNetwork = useCallback(() => {
        if (container.current) {
            const network = new Network(container.current, { nodes, edges }, options);
            network.fit();
            network.setOptions({
                manipulation: { enabled: false }
            });
            const zoomLevel = 1.5;
            network.moveTo({ scale: zoomLevel });

            return () => {
                network.destroy();
            };
        }
    }, [nodes, edges, options]);

    useEffect(() => {
        const cleanup = initializeNetwork();
        return () => {
            if (cleanup) cleanup();
        };
    }, [initializeNetwork]);

    useEffect(() => {
        console.log("Updated history:", history);
    }, [history]);

    useImperativeHandle(ref, () => ({
        updateMap(newContent) {
            const commandParts = newContent.split(' ');
            const command = commandParts[0];
            if (command.includes('scan')) {
                console.log("newContent", newContent);
                const label = JSON.parse(localStorage.getItem('ipData'));
                if (label) {
                    addNode(label);
                }

            } else if (command.includes('ssh')) {
                const targetLabel = commandParts[1];
                setNodes((prevNodes) => {
                    const targetNode = prevNodes.find(node => node.label === targetLabel);
                    if (targetNode) {
                        addEdge(currentNodeId, targetNode.id);
                        setHistory((prevHistory) => [...prevHistory, targetNode.id]);
                        setCurrentNodeId(targetNode.id);
                    } else {
                        console.log(`Node with label "${targetLabel}" not found.`);
                    }
                    return prevNodes;
                });

            } else if (command.includes('exit')) {
                setEdges((prevEdges) => {
                    if (prevEdges.length > 0) {
                        const updatedEdges = prevEdges.slice(0, -1);

                        if (history.length > 1) {
                            const lastNodeId = history[history.length - 2];
                            setHistory((prevHistory) => prevHistory.slice(0, -1));
                            setCurrentNodeId(lastNodeId);
                        } else {
                            setCurrentNodeId(1);
                        }
                        return updatedEdges;
                    }
                    return prevEdges;
                });
            } else {
                console.log('Unknown command');
            }
            console.log("rerender");
            forceUpdate(n => n + 1);

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
