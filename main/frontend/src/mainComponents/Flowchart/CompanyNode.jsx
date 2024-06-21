import { Box, Button, Divider, Input, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position, applyNodeChanges, useNodes, useNodesState, useReactFlow, useStoreApi } from 'reactflow';

const handleStyle1 = {};

const CompanyNode = memo(({ data, isConnectable }) => {
    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
    const uploadColor = useColorModeValue("brand.500", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const[documents,setDocuments]=useState();
    const [selectedDocument, setSelectedDocument] = useState(); //1
    const [selectIndex, setSelectIndex] = useState(-1);
    const [message, setMessage] = useState(""); //1

    const { setNodes } = useReactFlow();
    const store = useStoreApi();
    const { nodeInternals } = store.getState();

    const handleSelectChange = (event) => {

        const index = event.target.value;
        if (index == -1) return;
       
        setSelectIndex(index);

    }



    const handleUploadClick = () => {
        setMessage("");
        if (selectIndex==-1) return;
        console.log("dc",documents[selectIndex]);
        setMessage(`Document is ${documents[selectIndex].verified=="true" ? "verified" : "Not Verified"}`);
       
    };

    useEffect(()=>{
     if(data.document6){
        setDocuments(data.document6);
        console.log("d",data.document6);
     }
    },[data.document6])


    return (
        <Box  w="140px" border='1px' borderColor='gray.300' bg={boxBg} backgroundClip="border-box" borderRadius={"10px"}>
            <Text

                color={textColor}
                fontSize='14px'
                fontWeight='400'
                lineHeight='100%'
                m="2"
            >
                Company
            </Text>
            <Divider />
            <Stack p="4">
                <Select size="xs"  variant='auth' label="Select Document" onChange={handleSelectChange}
                    value={selectIndex}  >
                    <option value={-1}>Select Document</option>
                    {documents && documents.map((file, index) => (
                        <option key={index} value={index}>
                            {file.did4}
                        </option>
                    ))}
                </Select>


                <Button onClick={handleUploadClick} variant="brand" size="xs" >Check</Button>
                <Text

                    color={textColor}
                    fontSize='12px'
                    fontWeight='400'
                    lineHeight='100%'
                    m="2"
                >{message }</Text>
            </Stack>
            <Handle
                type="source"
                position={Position.Top}
                id="i"
                // style={handleStyle1}
                isConnectable={isConnectable}
            />
        </Box>
    );
})

export default CompanyNode;
