import { Box, Button, Divider, Input, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import { Handle, Position, applyNodeChanges, useNodes, useNodesState, useReactFlow, useStoreApi } from 'reactflow';

const handleStyle1 = {};

const UniversityNode = memo(({ data, isConnectable }) => {
    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
    const uploadColor = useColorModeValue("brand.500", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [selectedDocument, setSelectedDocument] = useState(); //1
    const [selectedFile, setSelectedFile] = useState(); //2
    const [selectIndex, setSelectIndex] = useState(-1);

    const { setNodes } = useReactFlow();
    const store = useStoreApi();
    const { nodeInternals } = store.getState();

    const handleSelectChange = (event) => {

        const index = event.target.value;
        if (index == -1) return;
        setSelectedDocument(data.selectList[index]); //1
        setSelectIndex(index);

    }

    const handleFileUpload = (event) => {

        const file = event.target.files[0];
        if (!file) return;
        setSelectedFile(file);  //2

    };


    const handleUploadClick = () => {
        if (!selectedDocument || !selectedFile) return;
        console.log("d3", selectedDocument.name, " od", selectedFile.name);
        setNodes(
            Array.from(nodeInternals.values()).map((node) => {

                if (node.id === "node-3") { //doqfy
                    node.data = {
                        ...node.data,
                        document3: selectedDocument, original: selectedFile,
                    };
                }

                return node;
            })
        );

    };



    return (
        <Box  w="140px" border='1px' borderColor='gray.300' bg={boxBg} backgroundClip="border-box" borderRadius={"10px"}>
            <Text

                color={textColor}
                fontSize='14px'
                fontWeight='400'
                lineHeight='100%'
                m="2"
            >
                University
            </Text>
            <Divider />
            <Stack p="4">
                <Select size="xs"  variant='auth' label="Select Document" onChange={handleSelectChange}
                    value={selectIndex}  >
                    <option value={-1}>Select Document</option>
                    {data.selectList && data.selectList.map((file, index) => (
                        <option key={index} value={index}>
                            {file.name}
                        </option>
                    ))}
                </Select>
                <Input
                    type="file"
                    display="none"
                    onChange={handleFileUpload}
                    id="file-input2"
                />
                <label htmlFor="file-input2">
                    <Button w="100%" as="span" variant="outline" size="xs"  >
                        Choose file 
                    </Button>
                </label>
                <Text

                    color={textColor}
                    fontSize='12px'
                    fontWeight='400'
                    lineHeight='100%'
                  align="center"
                >
                    {selectedFile && selectedFile.name}
                </Text>
                <Button onClick={handleUploadClick} variant="brand" size="xs" >Verify</Button>
            </Stack>
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={handleStyle1}
                isConnectable={isConnectable}
            />
        </Box>
    );
})

export default UniversityNode;
