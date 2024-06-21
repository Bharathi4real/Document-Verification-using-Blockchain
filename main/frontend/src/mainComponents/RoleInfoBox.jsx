import React from 'react';
import { Text, Box, Flex, Icon, List, ListItem, ListIcon, useColorModeValue } from '@chakra-ui/react';
import { MdCheckCircle } from "react-icons/md";
import IconBox from '../components/icons/IconBox';

const RoleInfoBox = ({ icon, title, points, pl }) => {
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const uploadColor = useColorModeValue("brand.500", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <Box pl={pl}>
            <Flex gap="3">
                <IconBox
                    w='40px'
                    h='40px'
                    bg={boxBg}
                    icon={
                        <Icon w='20px' h='20px' as={icon} color={uploadColor} />
                    }
                />
                <Text color={textColor} fontSize='32px' fontWeight='500' lineHeight='100%'>{title}</Text>
            </Flex>

            <Text mt="4" color={textColor} fontSize='16px' fontWeight='400'>
                <List spacing={1}>
                    {points.map((point, index) => (
                        <ListItem key={index}>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            {point}
                        </ListItem>
                    ))}
                </List>
            </Text>
        </Box>
    )
};
export default RoleInfoBox;