import React, { useState, useEffect, useContext } from 'react';
import { useMetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';



import MiniStatistics from '../components/card/MiniStatistics';
import IconBox from '../components/icons/IconBox';
import { Box, Button, Card, Checkbox, CheckboxGroup, Flex, Icon, IconButton, Input, Select, SimpleGrid, Stack, useCheckboxGroup, useColorModeValue } from '@chakra-ui/react';
import { FaRegAddressBook } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import { Text } from '@chakra-ui/react';

import { useMemo } from 'react';

import { FaBuilding } from "react-icons/fa";

import { FaUniversity } from "react-icons/fa";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";

import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import { MdUpload } from "react-icons/md";

import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { TabelCard } from '../mainComponents/TabelCard';
import TransactionCard from '../mainComponents/TransactionCard';
import CompanyManage from '../mainComponents/CompanyManage';
import FileUpload from '../mainComponents/FileUpload';


import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloseCircle } from "react-icons/io";
import playToastSound from '../mainComponents/ToastSound';

import { MdOutlineAdminPanelSettings } from "react-icons/md";


// Create a Web3 instance using the current Ethereum provider (MetaMask)
function OwnerPage() {
  const { contract, account } = useMetaMaskContext();
  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(''); // State for selected company address

  const [universityAddresses, setUniversityAddresses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(''); // State for selected university address

  const [universityStatus, setUniversityStatus] = useState();
  const [companyStatus, setCompanyStatus] = useState();
  ///colors//
  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const brandColor = useColorModeValue("brand", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const uploadColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");


  // Function to handle dropdown selection
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // Function to handle dropdown selection
  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

  // Function to fetch company addresses from the smart contract
  const fetchCompanyAddresses = async () => {
    try {
      const transaction = await contract.getAllCompanyAddresses({ from: account });
      const uniqueAddressesSet = new Set(transaction);
      // Convert the Set back to an array.
      const uniqueAddressesArray = [...uniqueAddressesSet];
      setCompanyAddresses(uniqueAddressesArray);
      console.log('company addresses:', uniqueAddressesArray); // Log the response

    } catch (error) {
      console.error('Error fetching Company addresses:', error.reason);
    }
  };
  // Function to fetch university addresses from the smart contract
  const fetchUniversityAddresses = async () => {
    try {
      // const response = await contract.methods.getAllUniversityAddresses().call();
      const transaction = await contract.getAllUniversityAddresses({ from: account });

      const uniqueAddressesSet = new Set(transaction);
      // Convert the Set back to an array.
      const uniqueAddressesArray = [...uniqueAddressesSet];
      setUniversityAddresses(uniqueAddressesArray);
      console.log('university addresses:', uniqueAddressesArray); // Log the response

    } catch (error) {
      console.error('Error fetching university addresses:', error.reason);
    }
  };


  useEffect(() => {
    // Check if contract is not null
    if (contract !== null) {

      fetchCompanyAddresses();
      fetchUniversityAddresses();
    }
  }, [account]); // Add contract as a dependency


  useEffect(() => {
    setUniversityStatus(null);
    const fetchData = async () => {
      const collectedData = [];
      for (const university of universityAddresses) {
        const data = await checkUniversity(university);

        collectedData.push([university, data ? 'true' : 'false']);

      }
      console.log("ds", collectedData);
      setUniversityStatus(collectedData);
    };

    fetchData();
  }, [universityAddresses]);
  useEffect(() => {
    setCompanyStatus(null);
    const fetchData = async () => {
      const collectedData = [];
      for (const company of companyAddresses) {
        const data = await checkCompany(company);

        collectedData.push([company, data ? 'true' : 'false']);

      }
      console.log("cs", collectedData);
      setCompanyStatus(collectedData);
    };

    fetchData();
  }, [companyAddresses]);


  async function verifyCompany() {
    try {

      // Call the smart contract function
      const transaction = await contract.verifyCompany(selectedCompany, { from: account });
      await transaction.wait();
      console.log('Company verified successfully:', transaction.transactionHash);
      fetchCompanyAddresses();
      toast.success('Company verified Successfully', {
        icon: MdOutlineVerified,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
    } catch (error) {
      console.error('Error verifying company:', error.reason);
      toast.success('Error verifying company', {
        icon: MdOutlineVerified,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
      // Handle the error here
    }
  }
  async function unverifyCompany() {
    try {

      // Call the smart contract function
      const transaction = await contract.unverifyCompany(selectedCompany, { from: account });
      await transaction.wait();
      console.log('Company unverified successfully:', transaction.transactionHash);
      fetchCompanyAddresses();
      toast.success('Company unverified Successfully', {
        icon: MdOutlineVerified,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
    } catch (error) {
      console.error('Error unverifying company:', error.reason);
      toast.success('Error unverifying company', {
        icon: MdOutlineVerified,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
      // Handle the error here
    }
  }

  async function verifyUniversity() {
    try {

      // Call the smart contract function
      const transaction = await contract.verifyUniversity(selectedUniversity, { from: account });
      await transaction.wait();
      console.log('university verified successfully:', transaction.transactionHash);
      fetchUniversityAddresses();
      toast.success('university verified Successfully', {
        icon: MdOutlineVerified,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
    } catch (error) {
      console.error('Error verifying university:', error.reason);
      toast.success('Error verifying university', {
        icon: MdOutlineVerified,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
      // Handle the error here
    }
  }
  async function unverifyUniversity() {
    try {

      // Call the smart contract function
      const transaction = await contract.removeUniversity(selectedUniversity, { from: account });
      await transaction.wait();
      console.log('university unverified successfully:', transaction.transactionHash);
      fetchUniversityAddresses();
      toast.success('university unverified Successfully', {
        icon: MdOutlineVerified,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
    } catch (error) {
      console.error('Error unverifying university:', error.reason);
      // Handle the error here
      toast.error('Error unverifying university', {
        icon: IoMdCloseCircle,
        onOpen: () => {
          playToastSound(); // Play the sound when the toast opens
        },
      });
    }
  }
  async function checkUniversity(university) {
    try {

      // Call the smart contract function
      const transaction = await contract.checkUniversity(university, { from: account });
      console.log("university status", transaction);
      return transaction;

    } catch (error) {
      console.error('Error checking university:', error.reason);
      // Handle the error here
    }
  }
  async function checkCompany(company) {
    try {

      // Call the smart contract function
      const transaction = await contract.checkCompany(company, { from: account });

      return transaction;

    } catch (error) {
      console.error('Error checking company:', error.reason);
      // Handle the error here
    }
  }


  return (

    <Box>


      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
        gap='20px'
        mb='20px'>

        <Flex
          borderRadius="20px"
          p='4'
          bg={cardbg}
          backgroundClip="border-box"

          alignItems='center' >
          <IconBox
            w='40px'
            h='40px'
            bg={boxBg}
            icon={
              <Icon w='20px' h='20px' as={MdOutlineAdminPanelSettings} color={uploadColor} />
            }
          />
          <Text
            color={textColor}
            fontSize={{
              base: "sm",
              md: "md"
            }}
            fontWeight='500'
            lineHeight='100%'
            alignSelf='center'
            ml='4'
          >
            {account}
          </Text>
          <IconBox ml='2'
            w='30px'
            h='30px'
            bg={boxBg}
            icon={<Icon
              w='20px'
              h='20px'
              as={MdOutlineVerified}
              color={uploadColor}
            />}
          />

        </Flex>

      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        {/* add or remove company */}
        <CompanyManage
          select1label='Select University'
          handleDocumentChange={handleUniversityChange}
          uuid={selectedUniversity}
          Documentlist={universityAddresses}
          oneSelect={true}

          includeCompany={verifyUniversity}
          removeCompany={unverifyUniversity}

          btn1text='Verify'
          btn2text='Un-Verify'

          heading='Verify or Un-Verify University'
        />



        {/* Document university List */}
        <TabelCard data={universityStatus} headers={["S.N", "Universities", "Verified"]}
          heading={"Universities"} searchId={0} searchLabel={"Search university"} />

      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        {/* add or remove company */}
        <CompanyManage
          select1label='Select Company'
          handleDocumentChange={handleCompanyChange}
          uuid={selectedCompany}
          Documentlist={companyAddresses}
          oneSelect={true}

          includeCompany={verifyCompany}
          removeCompany={unverifyCompany}

          btn1text='Verify'
          btn2text='Un-Verify'

          heading='Verify or Un-Verify Company'
        />



        {/* Document university List */}
        <TabelCard data={companyStatus} headers={["S.N", "Company", "Verified"]}
          heading={"Companies"} searchId={0} searchLabel={"Search company"} />

      </SimpleGrid>



    </Box>
  );
}

export default OwnerPage;
