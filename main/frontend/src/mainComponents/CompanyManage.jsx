import React from 'react'
import { Box, Button, Select, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const CompanyManage = ({
    handleDocumentChange,uuid,Documentlist,
    handleCompanyChange,selectedCompany,companyAddresses,
    includeCompany,removeCompany,
    btn1text="Include company",btn2text="Remove Company",
    select1label="Select Document", oneSelect=false,
    heading="Add or Remove Company",
}) => {

    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const textColor = useColorModeValue("secondaryGray.900", "white");



    return (
        <Stack
            borderRadius="20px"
            p='7'
            bg={cardbg}
            backgroundClip="border-box"
            spacing='5'
        >
            <Text mb='5'
                color={textColor}
                fontSize='22px'
                fontWeight='500'
                lineHeight='100%'>
               {heading}
            </Text>

            <Select variant='auth' label={select1label} onChange={handleDocumentChange} value={uuid}>
                <option value="">{select1label}</option>
                {Documentlist.map((ipfs, index) => (
                    <option key={index} value={ipfs}>
                        {ipfs}
                    </option>
                ))}
            </Select>
          {!oneSelect &&
            <Select variant='auth' label="Select Company" onChange={handleCompanyChange} value={selectedCompany}>
                <option value="">Select Company</option>
                {companyAddresses.map((address, index) => (
                    <option key={index} value={address}>
                        {address}
                    </option>
                ))}
            </Select>
          }
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap={{ base: '10%', }} >
                <Button
                    onClick={includeCompany}

                    variant='brand'
                    fontWeight='500'>
                    {btn1text}
                </Button>
                <Button
                    onClick={removeCompany}

                    variant='brand'
                    fontWeight='500'>
                    {btn2text}
                </Button>
            </SimpleGrid>
        </Stack>

    )
}

export default CompanyManage