import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  useEffect,
} from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { Flex, Icon, Input, InputGroup, InputLeftElement, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

// Create new GridExample component
const TabelCard = ({data,headers,heading,searchLabel,searchId}) => {
  const { colorMode } = useColorMode();
  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const theme = colorMode === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

  const customCSS = `
    .ag-theme-quartz-dark {
      --ag-background-color: transparent; /* Change this to the desired color */
      --ag-header-background-color:#1B254B;
    }
    
  `;

  const containerStyle = useMemo(() => ({ width: '100%', height: '200px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  


  const gridRef = useRef();

  const uploadColor = useColorModeValue("brand.500", "white");

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState();


  useEffect(() => {
    if (data && headers) {
      const columnDefs = headers.map((header,index) => ({
        headerName: header,
        field: `field_${index}`,
        width:header==='S.N'?'80px':header==='Companies'?'300px':undefined,
        cellRenderer: header === 'Verified' ? verifiedCellRenderer : undefined,
      }));

      const rowData = data.map((rowDataItem, index) => {
        if(rowDataItem.length>0){
        const rowObj = {};
          rowDataItem.forEach((item, colIndex) => {
          const field = `field_${colIndex+1}`; 
          rowObj[field] = item;
        });
      
        rowObj[`field_0`] =  index+1; 
      
        return rowObj;
      }
      });
      
      setColDefs(columnDefs);
      setRowData(rowData);
    }
  }, [data, headers]);



  const verifiedCellRenderer = (params) => {
    return (<Flex justifyContent='center'><Icon
      w='24px'
      h='24px'
      me='5px'
      color={
        params.value == 'true' ? 
            "green"
            :  "red"
          }
      as={
        params.value == 'true' ? 
              MdCheckCircle
            :  MdCancel
         }
    /> </Flex>)
  };

  // Column Definitions: Defines & controls grid columns.


  const autoSizeStrategy = useMemo(() => {
    return {
    //  type: 'fitGridWidth',
      //defaultMinWidth: 100,
      // columnLimits: [
      //   {
      //     colId: 'country',
      //     minWidth: 900,
      //   },
      // ],
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      'quickFilterText',
      document.getElementById(`filter-text-box-${searchId}`).value
    );
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
      if(selectedRows[0] && selectedRows[0].field_3){
        const url = `http://localhost:8080/ipfs/${selectedRows[0].field_3}`;
        window.open(url, '_blank');
      } 
  }, []);


  // Container: Defines the grid's theme & dimensions.
  return (
    <Stack
    borderRadius="20px"
    p='7'
    bg={cardbg}
    backgroundClip="border-box"
    spacing='5'
  >
    <Text mb='3'
      color={textColor}
      fontSize='22px'
      fontWeight='500'
      lineHeight='100%'>
      {heading}
    </Text>
    <div>
      <style>{customCSS}</style>
      <Stack spacing={10} w='200px' mb='5'>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color={uploadColor}
            children={<FaSearch />}
          />
          <Input size='md' variant='auth' 
          placeholder={searchLabel}
            onChange={onFilterTextBoxChanged}
            type="text"
            id={`filter-text-box-${searchId}`}
          />
        </InputGroup>
      </Stack>
      <div style={containerStyle}>
      <div
        className={
          theme
        }
        style={gridStyle}
      >
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} 
        autoSizeStrategy={autoSizeStrategy}
        rowSelection={'single'}
        onSelectionChanged={onSelectionChanged}
     
       
        />
      </div>
      </div>
    </div>
    </Stack>
  );
};
export { TabelCard };