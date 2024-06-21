import { Box, Button, Divider, Input, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position, applyNodeChanges, useNodes, useNodesState, useReactFlow, useStoreApi } from 'reactflow';
import CryptoJS from 'crypto-js';

const handleStyle1 = { top: 50 };
const handleStyle2 = { top: 65 };

const DoqfyNode = memo(({ data, isConnectable }) => {
    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
    const uploadColor = useColorModeValue("brand.500", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [message, setMessage] = useState("Intermediatary Processor"); //1
   

    const { setNodes } = useReactFlow();
    const store = useStoreApi();
    const { nodeInternals } = store.getState();



    async function calculateFileHash(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                try {
                    const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
                    const hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
                    resolve(hash);
                } catch (error) {
                    reject(error);
                }
            };

            fileReader.onerror = (error) => {
                reject(error);
            };

            fileReader.readAsArrayBuffer(file);
        });
    }


    ///from student///
    useEffect(() => {

        const sendData = async (data) => {
            const hash = await calculateFileHash(data.document);
         
            setNodes(
                Array.from(nodeInternals.values()).map((node) => {

                    if (node.id === "node-4") { //blockchain
                        node.data = {
                            ...node.data,
                            document4: { did4: data.document.name, hash4: hash, verified: "false" },
                        };
                    }

                    if (node.id === "node-5") { //ipfs
                        node.data = {
                            ...node.data,
                            document5: data.document.name,
                        };
                    }

                    return node;
                })
            );

            setMessage(`File uploaded to IPFS & Blockchain`);
          
        };
        if (data.document) sendData(data);
    }, [data.document]);


    ///from university//
    useEffect(() => {

        const sendData = async (data) => {
            
            const hash1 = await calculateFileHash(data.document3);
            const hash2 = await calculateFileHash(data.original);
            const check = hash1 === hash2;
            if (!check) {
                console.log("Invalid or Fraud Document");
                setMessage("Invalid or Fraud Document");
                return;
            }
           
            setNodes(
                Array.from(nodeInternals.values()).map((node) => {

                    if (node.id === "node-4") { //blockchain
                        node.data = {
                            ...node.data,
                            document4: { did4: data.document3.name,  verified: "true" },
                        };
                    }
                    console.log("verified");
                    setMessage("Document verified Successfully");
                  
                    return node;
                })
            );

        };
        if (data.document3 && data.original) sendData(data);
    }, [data.document3, data.original]);




    return (
        <Box w="140px" border='1px' borderColor='gray.300' bg={boxBg} backgroundClip="border-box" borderRadius={"10px"}>
            <Text

                color={textColor}
                fontSize='14px'
                fontWeight='400'
                lineHeight='100%'
                m="2"
            >
                DoQfy
            </Text>
            <Divider />
            <Stack p="4">
                <Text
                    color={textColor}
                    fontSize='12px'
                    fontWeight='400'

                   
                >
                    {message}
                </Text>

            </Stack>
            <Handle
                type="target"
                position={Position.Left}
                id="c"
                style={handleStyle1}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="d"
                style={handleStyle2}
                isConnectable={isConnectable}
            />
             <Handle
                type="source"
                position={Position.Right}
                id="e"
                style={handleStyle1}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="f"
                style={handleStyle2}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Bottom}
                id="j"
                // style={handleStyle2}
                isConnectable={isConnectable}
            />
        </Box>
    );
})

export default DoqfyNode;
