import React, { useEffect, useRef, forwardRef, useState, useMemo, useImperativeHandle, useCallback } from 'react';
import { Network } from 'vis-network';
import TerminalInteraction from '../Terminal/TerminalInteraction';

const NodeMap = forwardRef((props, ref) => {
    const container = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const currentNodeIdRef = useRef(1);
    const options = useMemo(() => ({
        nodes: {
            shape: 'dot',
            size: 15,
            shadow: true,
            color: {
                border: 'white',
                background: 'skyblue',
            },
            font: {
                color: 'white',
                size: 15,
            },
        },
        edges: {
            color: 'gray',
        },
        layout: {
            hierarchical: {
                direction: 'LR',
            },
        },
        interaction: {
            zoomView: true,
            dragView: true,
            selectable: false,
        },
    }), []);

    const initialNodes = useMemo(() => [
        { id: 1, label: 'myNode', size: 15, fixed: true },
    ], []);

    const initialEdges = useMemo(() => [], []);

    const addNode = (label) => {
        if (label !== "") {
            setNodes((prevNodes) => {
                const nodeExists = prevNodes.some(node => node.label === label);
                if (nodeExists) {
                    console.log(`Node with label "${label}" already exists.`);
                    return prevNodes;
                } else {
                    const newNode = {
                        id: prevNodes.length + 1,
                        label: label,
                        fixed: true,
                    };
                    return [...prevNodes, newNode];
                }
            });
        }
    };

    const addEdge = (startID, endID) => {
        setEdges((prevEdges) => {
            for (let edge of prevEdges) {
                if (startID === endID || (edge.from === startID && edge.to === endID)) {
                    return prevEdges;
                }
            }
            return [...prevEdges, { from: startID, to: endID, id: prevEdges.length + 1 }];
        });
    };
    useEffect(() => { console.log(edges); }, [edges]);
    useEffect(() => {
        TerminalInteraction.setNodeMap(ref.current);
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [ref, initialNodes, initialEdges]);

    const initializeNetwork = useCallback(() => {
        if (container.current) {
            const network = new Network(container.current, { nodes, edges }, options);
            network.fit();
            network.setOptions({ manipulation: { enabled: false } });
            const zoomLevel = 1.5;
            network.moveTo({ scale: zoomLevel });
            return () => network.destroy();
        }
    }, [nodes, edges, options]);

    useEffect(() => {
        const cleanup = initializeNetwork();
        return () => {
            if (cleanup) cleanup();
        };
    }, [initializeNetwork]);

    useImperativeHandle(ref, () => ({
        updateMap(newContent) {
            const commandParts = newContent.split(' ');
            const command = commandParts[0];

            if (newContent.match(/^username\s*{?\s*node\d{2}\s*}?/gm)) {
                let ip = [];
                const nodes = newContent.trim().split('\n');
                for (const node of nodes) {
                    if (node.trim().startsWith('IP{')) {
                        const ipMatch = node.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
                        if (ipMatch) {
                            ip.push(ipMatch[0]);
                        }
                    }
                }
                if (ip.length > 0) {
                    ip.forEach(i => addNode(i));
                }
            } else if (command.startsWith('connected')) {
                const targetLabel = commandParts[1];
                if (!nodes.find(node => node.label === targetLabel)) {
                    addNode(commandParts[1]);
                }
                setNodes((prevNodes) => {
                    let targetNode = prevNodes.find(node => node.label === targetLabel);
                    if (targetNode) {
                        addEdge(currentNodeIdRef.current, targetNode.id);
                        currentNodeIdRef.current = targetNode.id;
                    }
                    return prevNodes;
                });
            } else if (command.startsWith('Disconnected')) {
                setEdges(prevEdges => {
                    if (prevEdges.length > 0) {
                        const updatedEdges = prevEdges.slice(0, -1);
                        if (updatedEdges.length > 0) {
                            const lastEdge = updatedEdges[updatedEdges.length - 1];
                            currentNodeIdRef.current = lastEdge.to;
                        } else {
                            currentNodeIdRef.current = 1;
                        }
                        return updatedEdges;
                    }
                    return prevEdges;
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
