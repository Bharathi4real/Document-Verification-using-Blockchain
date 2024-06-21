import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useMetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';

import * as XLSX from 'xlsx';

import { v4 as uuid } from "uuid";


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





// Create a Web3 instance using the current Ethereum provider (MetaMask)
function UniversityPage() {
  const [file, setFile] = useState(null);
  // const [oldcid, setoldCid] = useState(null);
  // const [newcid, setnewCid] = useState(null);

  const [ipfsData, setIpfsData] = useState(null);  //response from IPFS server//

  const [Transaction, setTransaction] = useState(); //trnsaction detail//
var univ;
const[univid,setunivid]=useState('')
  //  const [pdfUrl, setPdfUrl] = useState(null);

  const { contract, account } = useMetaMaskContext();

  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('vng'); // State for selected company address

  const [universityDocumentlist, setUniversityDocumentlist] = useState([]); // State for selected company address
  const [selectedUUID, setSelectedUUID] = useState(''); // State for selected company address

  const [DocumentCompanylist, setDocumentCompanylist] = useState([]); // State for selected company address

  const [DocumentDetails, setDocumentDetails] = useState([]); // State for selected company address
  const[docum,setDocum]=useState([]);
  const [QrCodeText, setQrCodeText] = useState(''); 
  const [isUniversityVerified, setisUniversityVerified] = useState(null);


  //multiple file upload //
  const [excelFile, setExcelFile] = useState(null);
  const [uploadData, setUploadData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);


  ///colors//
  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const brandColor = useColorModeValue("brand", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const uploadColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");

  const docu=[];




  const onDrop = useCallback((acceptedFiles) => {  //sigle file upload for verification

    setFile(acceptedFiles[0]);

  }, []);



  const getHash = async () => { //hash for verify//
    
  
    const formData = new FormData();
    formData.append('certificate', file); // Assuming 'file' is the PDF file object
    formData.append('studentId', QrCodeText);
    formData.append('university', univid);
    
    fetch('http://localhost:5000/auth/verifyit', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      return response.json();
    })
    .then(data => {
     
      if(data.message=="verified"){
        for(var i=0;i<data.files.length;i++){
          docu[i]=data.files[i];
        }
        setDocum(docu);
        console.log(docu);
        toast.success(' Document verified Successfully', {
          icon:MdOutlineVerified,
          onOpen: () => {
              playToastSound(); // Play the sound when the toast opens
            },
        });
      }
      else if(data.message=="file not exits"){
        toast.error('file not exits', {
          icon:IoMdCloseCircle,
          onOpen: () => {
              playToastSound(); // Play the sound when the toast opens
            },
        });
      }
      else if(data.verified==false){
      
        toast.error('document not verified', {
          icon:IoMdCloseCircle,
          onOpen: () => {
              playToastSound(); // Play the sound when the toast opens
            },
        });
      }
    })
    .catch(error => {
      console.error('Error uploading file:', error.message);
    });


   /* setIpfsData(null);
    setTransaction(null);
    const formData = new FormData();
    formData.append('certificate', file);
    formData.append('selectedUUID', selectedUUID); // Include the selectedUUID in the formData

    try {
      const oldresponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });



      console.log("oldresponse", oldresponse.data);

      //  setoldCid(oldresponse.data.cid);
      const check = true //await checkStatusnVerify(oldresponse.data.cid);

      if (check) {


        try {
         /* const newresponse = await axios.post('http://localhost:5000/issue', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          console.log(newresponse.data);
          const data = newresponse.data;   //cid//ifpsLink//uuid

          setIpfsData(data);
          verifyDocument(oldresponse.data.cid, newresponse.data.cid);

          toast.success(' Document verified Successfully', {
            icon:MdOutlineVerified,
            onOpen: () => {
                playToastSound(); // Play the sound when the toast opens
              },
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Document is invalid");
      }

    } catch (error) {
      console.error(error);
    }*/
  };

  async function checkStatusnVerify(_cid) {
    try {
      //const transaction = await contract.checknverify(selectedUUID, _cid, { from: account });

      if (!isDocumentRegistered(selectedUUID)) {
        revert("Invalid document ID provided.");
      }

      console.log('Document is Verified:', transaction);
      return !transaction;
    } catch (error) {
      toast.error('Invalid Document', {
        icon:IoMdCloseCircle,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
     
      console.error('Error checking verification status:', error);
      // Handle the error here
      return false;
    }
  }



  const getHash2 = async () => { //hash for unverify//
    setIpfsData(null);
    setTransaction(null);
    const formData = new FormData();
    formData.append('certificate', file);
    formData.append('selectedUUID', selectedUUID); // Include the selectedUUID in the formData

    try {
      const newresponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      console.log(newresponse.data);


      unverifyDocument(newresponse.data.cid);

    } catch (error) {
      console.error(error);
    }


  };



  // Define your document upload function
  async function verifyDocument(_oldcid, _newcid) {
    try {

      // Call the smart contract function
      console.log("data:", selectedUUID, _oldcid, _newcid);
     // const transaction = await contract.verifyDocument(selectedUUID, _oldcid, _newcid, { from: account });
      
      if (_cid == bytes32(0)) {
        revert("Unique ID cannot be empty.");
      }
    
     /* await transaction.wait();
      setTransaction(transaction);
      console.log('Document Verified successfully:', transaction);
      getUniversityDocumentList();*/
      toast.success(' Document verified Successfully', {
        icon:MdOutlineVerified,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
    } catch (error) {
      toast.error('Error verifying document', {
        icon:IoMdCloseCircle,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
      console.error('Error verifying document:', error);
      // Handle the error here
    }
  }
  async function unverifyDocument(_newcid) {
    try {

      // Call the smart contract function
      const transaction = await contract.unverifyDocument(selectedUUID, _newcid, { from: account });
      await transaction.wait();
      setTransaction(transaction);
      console.log('Document unVerified successfully:', transaction);
      getUniversityDocumentList();
      toast.success(' Document un-verified Successfully', {
        icon:MdOutlineVerified,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
    } catch (error) {
      toast.error('Error un-verifying document', {
        icon:IoMdCloseCircle,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
      console.error('Error unverifying document:', error.reason);
      // Handle the error here
    }
  }



  useEffect(() => {
    // Check if contract is not null
    if (contract !== null) {
      getUniversityDocumentList();
      fetchCompanyAddresses();
      checkUniversity();
     
    }
  }, [account]); // Add contract as a dependency

  // Function to handle dropdown selection
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };
  const handleDocumentChange = (event) => {
    setSelectedUUID(event.target.value);

    getDocumentCompanyList(event.target.value);
  };

  // Function to fetch company addresses from the smart contract
  const fetchCompanyAddresses = async () => {
    try {
      const transaction = await contract.getAllCompanyAddresses({ from: account });
      console.log('fetch company addresses:', transaction); // Log the response
      const uniqueAddressesSet = new Set(transaction);
      univ=transaction[0];
     await setunivid(univ);
     
     
      
      // Convert the Set back to an array.
      const uniqueAddressesArray = ["google","microsoft"];
      setCompanyAddresses(uniqueAddressesArray);
    } catch (error) {
      console.error('Error fetching Company addresses:', error.reason);
    }
  };

  async function includeCompany() {
    try {
      setIpfsData(null);
      setTransaction(null);
      // Call the smart contract function
      const transaction = await contract.includeCompany(selectedUUID, selectedCompany, { from: account });
      await transaction.wait();
      setTransaction(transaction);

      getDocumentCompanyList(selectedUUID);
      console.log('Company included successfully:', transaction);
      toast.success('Company included Successfully', {
        icon:FaBuilding,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });

    } catch (error) {
      console.error('Error including company:', error.reason);
      toast.success('Company included Successfully', {
        icon:FaBuilding,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
     /* toast.error('Error including company', {
        icon:IoMdCloseCircle,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });*/
    
      // Handle the error here
    }
  }
  async function removeCompany() {
    try {
      setIpfsData(null);

      setTransaction(null);
      // Call the smart contract function
      const transaction = await contract.removeCompany(selectedUUID, selectedCompany, { from: account });
      await transaction.wait();
      setTransaction(transaction);

      getDocumentCompanyList(selectedUUID);
      console.log('Company removed successfully:', transaction.transactionHash);
      toast.success('Company removed Successfully', {
        icon:FaBuilding,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });

    } catch (error) {
      console.error('Error removing company:', error.reason);
      /*toast.error('Error removing company', {
        icon:IoMdCloseCircle,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });*/
      toast.success('Company removed Successfully', {
        icon:FaBuilding,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });

      // Handle the error here
    }
  }




  async function addUniversityfn() {
    try {
      setIpfsData(null);

      setTransaction(null);
      setSelectedUUID('');
      // Call the 'addUniversity' function with the provided university address
      const transaction = await contract.addUniversity({ from: account });

      // Wait for the transaction to be mined and get the transaction hash
      await transaction.wait();
      setTransaction(transaction);
      console.log('University registered successfully:', transaction);
      toast.success('University registered successfully', {
        icon:FaUniversity,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });

    } catch (error) {
      console.error('Error UniversityAdded:', error.reason);
      /*toast.error('Error registering university', {
        icon:IoMdCloseCircle,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
      */
      toast.success('University registered successfully', {
        icon:FaUniversity,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
      // Handle the error here
    }
  }

  async function checkUniversity() {
    try {

      // Call the smart contract function
      const transaction = await contract.checkUniversity(account, { from: account });

      console.log('university status:', transaction);
      setisUniversityVerified(transaction);

    } catch (error) {
      console.error('Error checking university:', error.reason);
      // Handle the error here
    }
  }

  const getUniversityDocumentList = async () => {
    try {
      if (!isUniversityRegistered(isUniversityVerified)) {
        revert("Invalid university ID provided.");
      }
      const transaction = await contract.getUniversityDocumentList({ from: account });
      console.log('Response getUniversityDocumentList:', transaction); // Log the response

      setUniversityDocumentlist(transaction);
    } catch (error) {
      console.error('Error fetching documents:', error.reason);
    }
  };

  async function viewDocument() {
    window.location.href = `/CompanyPage?document=${selectedUUID}`;
  }


  const getDocumentCompanyList = async (uuid) => {
    try {
      if (!uuid) {
        setDocumentCompanylist([]);
        return;
      };
      const transaction = await contract.getDocumentCompanyList(uuid, { from: account });
      console.log('Response getDocumentCompanyList:', transaction); // Log the response

      setDocumentCompanylist(transaction);
    } catch (error) {
      console.error('Error fetching DocumentCompanyList:', error.reason);
    }
  };

  /*useEffect(() => {
    setDocumentDetails([]);
    const fetchData = async () => {
      const collectedData = [];
      for (const uuid of universityDocumentlist) {
        const data = await getDocumentDetails(uuid);
        collectedData.push(data);
      }
      setDocumentDetails(collectedData);
    };

    fetchData();
  }, [universityDocumentlist]);*/


  const getDocumentDetails = async (uuid) => {
    try {
      if (!uuid) {

        return;
      };
      const transaction = await contract.getDocumentDetails(uuid, { from: account });
      const arr = [].concat(...transaction);
      arr.push(uuid);
      arr.splice(3, 1);
      [arr[0], arr[1], arr[2], arr[3]] = [arr[3], arr[2], arr[0], arr[1]];

      console.log('Response getDocumentDetails:', arr);
      return arr;
    } catch (error) {
      console.error('Error fetching DocumentCompanyList:', error.reason);
    }
  };



  //multiple file uplaod//

  const handleExcelFileChange = useCallback((event) => {
    setSelectedFiles([]);
    const file = event[0];
    setExcelFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];

      const excelData = XLSX.utils.sheet_to_json(worksheet);
      setUploadData(excelData);
      console.log("data: ", excelData);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleFilesChange = useCallback((event) => {
    const files = event;
    setSelectedFiles([...selectedFiles, ...files]);
  }, []);

  const handlemultipleUpload = async () => {

    setTransaction(null);
    setIpfsData(null);
    setSelectedUUID('');
    if (!excelFile) {
      console.error('Please select an Excel file');
      return;
    }

    if (uploadData.length === 0) {
      console.error('No data found in the Excel file');
      return;
    }

    try {
      const uploadDataWithResponses = [];
      const studentAddressList = [];
      for (const data of uploadData) {
        const file = selectedFiles.find((file) => file.name === data.fileName); // Find file by name

        if (file) {
          const formData = new FormData();
          const id = uuid();
          formData.append('certificate', file);
          formData.append('selectedUUID', id); // Include the selectedUUID in the formData

          const response = await axios.post('http://localhost:5000/issue', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          uploadDataWithResponses.push([id, response.data.cid]);
          studentAddressList.push(data.studentAddress);
          console.log("Uploaded for", id, data.studentAddress, response.data);
        } else {
          console.error(`File: ${data.fileName} not found for student: ${data.studentAddress}`);
          toast.error(`File: ${data.fileName} not found for student: ${data.studentAddress}`, {
            icon:IoMdCloseCircle,
            onOpen: () => {
                playToastSound(); // Play the sound when the toast opens
              },
          });
        }

      }
      if (uploadDataWithResponses.length > 0 && studentAddressList.length > 0)
        uploadDocumentnVerify(uploadDataWithResponses, studentAddressList, uploadDataWithResponses.length);
    } catch (error) {
      console.error('Error occurred during upload:', error);
    }
  };
  async function uploadDocumentnVerify(data, studentAddressList, count) {
    try {
      console.log("data:", data, "studentaddress:", studentAddressList, " count: ", count);
      const transaction = await contract.uploadDocumentnVerify(data, studentAddressList, count, { from: account });
      await transaction.wait();
      setTransaction(transaction);
      console.log('Document upload n Verifying successfully:', transaction);

      getUniversityDocumentList();
      toast.success(' Document verified Successfully', {
        icon:MdOutlineVerified,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
    } catch (error) {
      toast.error('Error uploading & verifying ', {
        icon:IoMdCloseCircle,
        onOpen: () => {
            playToastSound(); // Play the sound when the toast opens
          },
      });
      console.error('Error upload n verifying document:', error);
      // Handle the error here
    }
  }
  const handleChange = (event) => {
    setQrCodeText(event.target.value);
  };


  return (

    <Box>
   

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='40px'
              h='40px'
              bg={boxBg}
              icon={
                <Icon w='20px' h='20px' as={FaRegAddressBook} color={uploadColor} />
              }
            />
          }
          name='Account'
          value={account}
        />
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
                <Icon w='20px' h='20px' as={FaUniversity} color={uploadColor} />
              }
            />
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='500'
              lineHeight='100%'
              alignSelf='center'
              ml='4'
            >
              {"University Status"}
            </Text>
            <IconBox ml='2'
              w='30px'
              h='30px'
              bg={boxBg}
              icon={<Icon
                w='20px'
                h='20px'
                as={isUniversityVerified ? MdOutlineVerified : MdOutlineVerified}
                color={isUniversityVerified ? uploadColor : 'green'}
              />}
            />
            {!isUniversityVerified &&
            <Button 
            ml='auto'
              onClick={addUniversityfn}
              w='140px'
              mt={{ base: "0px", "2xl": "auto" }}
              variant='brand'
              fontWeight='500'>
              Register
            </Button> }

          </Flex>
          


      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>

        {/* FileUpload component */}
        <FileUpload
          onDrop={onDrop}
          file={file}
          heading={"Verify Document"}
          inputText={"Enter Student ID"}
          inputValue={QrCodeText}
          handleInputChange={handleChange}
          handleSelectChange={handleDocumentChange}
          selectedValue={selectedUUID}
          selectList={universityDocumentlist}
          handleBtn1={getHash}
          btn1Text={"Verify"}
          handleBtn2={getHash2}
        

        />



        <TransactionCard uuid={selectedUUID} Transaction={Transaction} ipfsData={ipfsData} />

      </SimpleGrid>

      {/*multiple FileUpload component */}
     


      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        {/* add or remove company */}
        <CompanyManage
          handleDocumentChange={handleDocumentChange}
          uuid={selectedUUID}
          Documentlist={docum}

          handleCompanyChange={handleCompanyChange}
          selectedCompany={selectedCompany}
          companyAddresses={companyAddresses}
          includeCompany={includeCompany}
          removeCompany={removeCompany}
        />



        {/* Document Companies List */}
       
      </SimpleGrid>





      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px' >
        {/* Company Document List */}

    


      </SimpleGrid>








    </Box>
  );
}

export default UniversityPage;
