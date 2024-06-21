// Chakra Imports
import { Button, Icon, useColorMode, useColorModeValue } from "@chakra-ui/react";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import React from "react";

export default function FixedPlugin(props) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";

	const navbarIcon = useColorModeValue('gray.400', 'white');
  return (
    <Button
      {...rest}
    
      variant='no-effects'
   
      onClick={toggleColorMode}
    
      p='0px'
    
      >
      <Icon
      
        color={navbarIcon}
        as={colorMode === "light" ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
