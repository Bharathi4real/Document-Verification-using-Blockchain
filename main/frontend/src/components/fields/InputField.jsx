// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";

const InputField = (props) => {
  const { id,name,register, isRequired,label,variant, extra, placeholder, type, mb, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
   
  return (
   

    <Flex direction='column' mb={mb ? mb : "10px"}>
   
      <FormLabel
        display='flex'
        ms='4px'
        htmlFor={id}
        fontSize='sm'
        color={textColorPrimary}
        fontWeight='500'
        _hover={{ cursor: "pointer" }}>
        {label}
        <Text color={brandStars} fontSize='sm' fontWeight='400' ms='2px'>
          {extra}
        </Text>
      </FormLabel>
      <Input
        {...rest}
      //  ref={ref}
      {...register(name,{ required:isRequired })}
    
        isRequired={isRequired}
        type={type}
        id={id}
       
        variant={variant}
        placeholder={placeholder}
        h='44px'
        maxh='44px'
        fontSize='sm'
        ms={{ base: "0px", md: "0px" }}
        size='lg'
      />
    </Flex>
  );
}
//export default React.forwardRef(InputField);
export default InputField;