import { Box, Button, Divider, Input, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position, applyNodeChanges, useNodes, useNodesState, useReactFlow, useStoreApi } from 'reactflow';
import CryptoJS from 'crypto-js';

const handleStyle1 = { top: 50 };

const BlockchainNode = memo(({ data, isConnectable }) => {
    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
    const uploadColor = useColorModeValue("brand.500", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [message, setMessage] = useState("Intermediatary"); //1


    const { setNodes } = useReactFlow();
    const store = useStoreApi();
    const { nodeInternals } = store.getState();

    const [document, setDocument] = useState([]);

    useEffect(() => {
        const updateDocument = (newDocument) => {
            const existingIndex = document.findIndex((doc) => doc.did4 === newDocument.did4);

            if (existingIndex !== -1) {
                // Update existing object
                const updatedData = [...document];
                updatedData[existingIndex] = { ...updatedData[existingIndex], verified: newDocument.verified };
                setDocument(updatedData);
            } else {
                // Add new object
                setDocument((prevDocument) => [...prevDocument, newDocument]);
            }
        };
        if (data.document4) { updateDocument(data.document4); }
    }, [data.document4]);

    useEffect(() => {
        setNodes(
            Array.from(nodeInternals.values()).map((node) => {

                if (node.id === "node-6") {
                    node.data = {
                        ...node.data,
                        document6: document,
                    };
                }

                return node;
            })
        );
    }, [document])





    return (
        <Box w="440px" border='1px' borderColor='gray.300' bg={boxBg} backgroundClip="border-box" borderRadius={"10px"}>
            <Text

                color={textColor}
                fontSize='14px'
                fontWeight='400'
                lineHeight='100%'
                m="2"
            >
                Blockchain
            </Text>
            <Divider />
            <Stack p="2.5">
                <p className='text-sm'>Transactions</p>
                {document && document.map((doc, index) => (

                    <Text key={index}
                        color={textColor}
                        fontSize='12px'
                        fontWeight='400'
                        bg={cardbg}
                        m="0.5"
                        p="1.5"
                        borderRadius={"10px"}
                        wordBreak="break-all"
                    >
                        Did: {doc.did4}<br />
                        Hash: {doc.hash4}<br />
                        Verified: {doc.verified}<br />
                    </Text>

                ))}


            </Stack>
            <Handle
                type="target"
                position={Position.Left}
                id="g"
                style={handleStyle1}
                isConnectable={isConnectable}
            />

        </Box>
    );
})

export default BlockchainNode;
