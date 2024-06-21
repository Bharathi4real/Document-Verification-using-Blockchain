import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import StudentNode from './StudentNode';
import UniversityNode from './UniversityNode';
import DoqfyNode from './DoqfyNode';
import BlockchainNode from './BlockchainNode';
import IpfsNode from './IpfsNode';
import CompanyNode from './CompanyNode';




// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { 
    studentNode: StudentNode,
    universityNode:UniversityNode,
    doqfyNode:DoqfyNode,
    blockchainNode:BlockchainNode,
    ipfsNode:IpfsNode,
    companyNode:CompanyNode
 };

function FlowChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   
    
   
   
        
    
    useEffect(() => {
        setNodes([
            {
                id: 'node-1', 
                type: 'studentNode', 
                position: { x: 0, y: 100 },
                data:{}
            },
            {
                id: 'node-2',
                type: 'universityNode',
              
                position: { x: 0, y: 250 },
                data:{}
            },
            {
                id: 'node-3',
                type: 'doqfyNode',
                position: { x: 180, y: 130 },
                data: {  },
            },
            {
                id: 'node-4',
                type: 'blockchainNode',
                position: { x: 350, y: 100 },
                data: {  },
            },
            {
                id: 'node-5',
                type: 'ipfsNode',
                position: { x: 350, y: 300 },
                data: {  },
            },
            {
                id: 'node-6',
                type: 'companyNode',
                position: { x: 180, y: 250 },
                data: {  },
            },
        ]
        );
        setEdges(
            [
                { id: 'edge-1', source: 'node-1', target: 'node-3', sourceHandle: 'a' ,targetHandle:'c'},
                { id: 'edge-2', source: 'node-2', target: 'node-3', sourceHandle: 'b' ,targetHandle:"d"},
                { id: 'edge-3', source: 'node-3', target: 'node-4', sourceHandle: 'e' ,targetHandle:"g"},
                { id: 'edge-4', source: 'node-3', target: 'node-5', sourceHandle: 'f' ,targetHandle:"h"},
                { id: 'edge-5', source: 'node-6', target: 'node-3', sourceHandle: 'i' ,targetHandle:"j"},
          
            ]
        );
    }, []);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            fitView
        > <Background />
            <Controls />
        </ReactFlow>
    );
}

export default FlowChart;
