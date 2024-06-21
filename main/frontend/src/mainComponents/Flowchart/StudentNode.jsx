import { Box, Button, Divider, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import { Handle, Position, applyNodeChanges, useNodes, useNodesState, useReactFlow, useStoreApi } from 'reactflow';

const handleStyle1 = {};

const StudentNode = memo(({ data, isConnectable }) => {
  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const uploadColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [selectedFile, setSelectedFile] = useState();
  const [selectListm, setSelectListm] = useState([]);

  const handleFileUpload = (event) => {

    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const { nodeInternals } = store.getState();


  const handleUploadClick = () => {
    if (!selectedFile) return;
    console.log("st:", selectedFile.name);
    const updatedSelectList = [...selectListm, selectedFile];



    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === "node-2") {
          node.data = {
            ...node.data,
            selectList: updatedSelectList,
          };
        }
        if (node.id === "node-3") {
          node.data = {
            ...node.data,
            document: selectedFile,
          };
        }

        return node;
      })
    );
    setSelectListm(updatedSelectList);
    setSelectedFile();
  };

  return (
    <Box w="140px" border='1px' borderColor='gray.300' bg={boxBg} backgroundClip="border-box" borderRadius={"10px"}>
      <Text

        color={textColor}
        fontSize='14px'
        fontWeight='400'
        lineHeight='100%'
        m="2"
      >
        Student
      </Text>
      <Divider />
      <Stack p="4">
        <Input
          type="file"
          display="none"
          onChange={handleFileUpload}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button as="span" variant="outline" size="xs" w="100%" >
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
        <Button onClick={handleUploadClick} variant="brand" size="xs" >Upload</Button>
      </Stack>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={handleStyle1}
        isConnectable={isConnectable}
      />
    </Box>
  );
})

export default StudentNode;
