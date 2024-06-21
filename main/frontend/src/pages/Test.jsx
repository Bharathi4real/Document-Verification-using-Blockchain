import React, { useRef, useState } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import { Box, Button, Flex, Image, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import playToastSound from '../mainComponents/ToastSound';
import { MdOutlineDownloadForOffline } from "react-icons/md";

const Test = () => {
  const [name, setName] = useState('Yash Sugandhi');
  const [about, setAbout] = useState('has demonstrated exceptional commitment and excellence, earning this certificate as a testament to their commendable accomplishments in');

  const [event, setEvent] = useState('Tabel Tennis');

  
  const [organization, setOrganization] = useState('SSGMCE');
  const certificateRef = useRef(null);
  const cardbg = useColorModeValue('#ffffff', '#ffffff');
  


  const handleExport = () => {
    exportComponentAsPNG(certificateRef, { fileName: 'certificate' });
    toast.success("Download Started", {
      icon: MdOutlineDownloadForOffline,
      onOpen: () => {
        playToastSound(); // Play the sound when the toast opens
      },
    });
  };
   const labelstyle={
    color:"black"
   }
  return (
    <Flex bg={cardbg}  borderRadius='20px'>


      {/* User Input Fields */}
      <Box   m="7">
        <Stack spacing={'5'}>
          <label style={labelstyle}>Name:</label>
          <Input variant={'auth'}
            type="text"
            value={name}
            color="black"
            onChange={(e) => setName(e.target.value)}
          />
           <label style={labelstyle}>About:</label>
          <Input variant={'auth'}
            type="text"
            value={about} 
            color="black"
            onChange={(e) => setAbout(e.target.value)}
          />
          <label style={labelstyle}>Event:</label>
          <Input variant={'auth'}
            type="text"
            value={event}
            color="black"
            onChange={(e) => setEvent(e.target.value)}
          />

          <label style={labelstyle}>Organization:</label>
          <Input variant={'auth'}
            type="text"
            color="black"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />


          <Button variant={"brand"} onClick={handleExport}>Download Certificate</Button>
        </Stack>
      </Box>


      {/* Certificate */}
      <div ref={certificateRef} style={{ position: 'relative' ,display: "inline-block"}}>
      
    <img 
      src='./images/c1.png'
      alt='Certificate Background'
      width='800px' height="700px"
      style={{display: "block",marginTop:"-120px"}}
    />
 
  <Box  position={"absolute"}  top={120} left={0} m="100">
    <Text color="black" align="center" fontSize='22px' fontWeight='400' lineHeight='100%' m="2">
      {name}
    </Text>
    <Text color="black" align="center" fontSize='16px' fontWeight='400' lineHeight='100%' m="3">
   <br/>
    {about}
    </Text>
    <Text color="black" align="center"  fontSize='16px' fontWeight='600' lineHeight='100%' m="2">
      {event}
    </Text>
    <Text color="black" align="center" fontSize='22px' fontWeight='400' lineHeight='100%' m="2">
      <br/><br/><br/>
      {organization}
    </Text>
  </Box>
  
</div>



    </Flex>
  );
};

export default Test;
