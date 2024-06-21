import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { HSeparator } from "../../separator/Separator";
import { DoQfyIcon } from "../../logo";

// Custom components

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column' >
       <DoQfyIcon  /> 
      <HSeparator mb='20px' mt='40px' />
    </Flex>
  );
}

export default SidebarBrand;
