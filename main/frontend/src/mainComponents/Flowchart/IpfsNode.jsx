import { Box, Button, Divider, Input, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position, applyNodeChanges, useNodes, useNodesState, useReactFlow, useStoreApi } from 'reactflow';
import CryptoJS from 'crypto-js';

const handleStyle1 = { top: 50 };

const IpfsNode = memo(({ data, isConnectable }) => {
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
             const updated=[...document,newDocument] ;
             setDocument(updated)  
        };
       
        if (data.document5) {  updateDocument(data.document5); }
    }, [data.document5]);







    return (
        <Box border='1px' borderColor='gray.300' bg={boxBg} backgroundClip="border-box" borderRadius={"10px"}>
            <Text

                color={textColor}
                fontSize='14px'
                fontWeight='400'
                lineHeight='100%'
                m="2"
            >
                IPFS Storage
            </Text>
            <Divider />
            <Stack p="2">
               <p className='text-sm'>Files</p> 
                {document && document.map((doc, index) => (

                    <Text key={index}
                        color={textColor}
                        fontSize='14px'
                        fontWeight='400'
                        bg={cardbg}
                        borderRadius={"10px"}
                        p="0.5"
                    >
                       {index+1}: {doc}
                    </Text>

                ))}


            </Stack>
            <Handle
                type="target"
                position={Position.Left}
                id="h"
                style={handleStyle1}
                isConnectable={isConnectable}
            />

        </Box>
    );
})

export default IpfsNode;
