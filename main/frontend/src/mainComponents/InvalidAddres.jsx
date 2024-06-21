import { Box, Flex, Icon, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import IconBox from '../components/icons/IconBox'
import { BiError } from "react-icons/bi";
const InvalidAddres = () => {
  
    const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const brandColor = useColorModeValue("brand", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const uploadColor = useColorModeValue("red.500", "red.500");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");

  
    return (
    
<Flex justifyContent={'center'}  alignItems={'center'}>
 <Stack borderRadius="20px"
  p='7'
  bg={cardbg}
  backgroundClip="border-box"
  spacing='10'
  m='10'
 
>
<IconBox m='auto' 
              w='130px'
              h='130px'
              bg={boxBg}
              icon={
                <Icon w='90px' h='90px' as={BiError} color={uploadColor} />
              }
            />
  <Text 
    mb='5'
    color={textColor}
    fontSize='16px'
    fontWeight='500'
    lineHeight='100%'>
    Login Address does not match with Wallet Address
  </Text>
  </Stack>
  </Flex>
  )
}

export default InvalidAddres