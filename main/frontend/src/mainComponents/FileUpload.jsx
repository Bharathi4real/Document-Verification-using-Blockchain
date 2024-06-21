import { Box, Button, Flex, Icon, Input, Select, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useDropzone } from 'react-dropzone';
import { MdUpload } from "react-icons/md";

const FileUpload = ({
  onDrop, file,
  heading,
  selectLabel, handleSelectChange, selectedValue, selectList,
  handleBtn1, btn1Text,
  handleBtn2, btn2Text,
  uploadLabel='Only PDF file is allowed',width,
  inputText,inputValue,handleInputChange,
}) => {
  // handleUniversityChange,selectedUniversity,universityAddresses,
  // handleUpload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const uploadColor = useColorModeValue("brand.500", "white");
  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const textColor = useColorModeValue("secondaryGray.900", "white");


  return (
    <Stack borderRadius="20px"
      p='7'
      bg={cardbg}
      backgroundClip="border-box"
      spacing='5'
      w={width}
    >
      <Text 
        mb={heading?5:10}
        color={textColor}
        fontSize='22px'
        fontWeight='500'
        lineHeight='100%'>
        {heading}
      </Text>
      {inputText &&
        <Input
        type="text"
        placeholder={inputText}
        value={inputValue}
        onChange={handleInputChange}
        variant='auth'
        isRequired='true'
        h='44px'
        maxh='44px'
        fontSize='sm'
        ms={{ base: "0px", md: "0px" }}
        size='lg'
      />
      }

      {selectLabel &&
        <Select variant='auth' label={selectLabel} onChange={handleSelectChange} value={selectedValue}>
          <option value="">{selectLabel}</option>
          {selectList.map((op, index) => (
            <option key={index} value={op}>
              {op}
            </option>
          ))}
        </Select>
      }
      <Flex
        align='center'
        justify='center'
        bg={bg}
        border='1px dashed'
        borderColor={borderColor}
        borderRadius='16px'
        w={{ base: "100%", "2xl": "268px" }}
        minH='180px'
        cursor='pointer'
        {...getRootProps()}


      >
        <Input variant='main' {...getInputProps()} />
        <Button variant='no-effects' >
          <Box >
            <Icon as={MdUpload} w='80px' h='80px' color={uploadColor} />
            <Flex justify='center' mx='auto' mb='12px'>
              <Text fontSize='xl' fontWeight='700' color={uploadColor}>
                Upload Files
              </Text>
            </Flex>
            <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
               {uploadLabel}
            </Text>

            <Text fontSize='sm' fontWeight='400' color='secondaryGray.500'>
              {file && file.name && `Selected file: ${file.name}`}
              {Array.isArray(file) && file.length >= 1 && (
                <>
                  Selected files:
                  {file.map((ele, index) => (
                    <span key={index}> {ele.name}, </span>
                  ))}
                </>
              )}
            </Text>

          </Box>

        </Button>
      </Flex>

      {btn1Text &&
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} 
        gap={{ base: '40%', }} 
        >

          <Button
            onClick={handleBtn1}
            // w='140px'
            mt={{ base: "0px", "2xl": "auto" }}
            variant='brand'
            fontWeight='500'>
            {btn1Text}
          </Button>
          {btn2Text &&
            <Button
              onClick={handleBtn2}
              // w='140px'
              mt={{ base: "0px", "2xl": "auto" }}
              variant='brand'
              fontWeight='500'>
              {btn2Text}
            </Button>
          }
        </SimpleGrid>
      }
    </Stack>

  )
}

export default FileUpload