// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Contract {
    struct Document {
        address owner;             // Address of the document owner (student)
        address universityAddress; // Address of the university that can verify the document
        string ipfsHash;          // IPFS hash of the document
        bool verified;            // Indicates if the document is verified by the university
    }

    mapping(string => mapping(address => bool)) private  AccessCompanyMapping;   //document->companies[]
    mapping(address => bool) private  universities;      //valid or invalid university list
    mapping(address => bool) private  companies;         //valid or invalid companies list
    mapping(string => Document) private  documentsById; // Mapping to store documents by their unique Id
    mapping(address => string[]) private universityDocumentList; // mapping of university-> document[] list//
    mapping(address => string[]) private studentDocumentList; // mapping of student-> document[] list//
    

    address[] private  universityAddresses; // Separate array to store university addresses
    address[] private  companyAddresses; // Separate array to store company addresses
   


    address private  contractOwner;     //contract owner

    event LogPrint(string  message);   //success log 
    event LogAddressPrint(address message); 
    constructor() {
        contractOwner = msg.sender; // Set the contract owner to the address that deploys the contract
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the contract owner can perform this action");
        _;
    }

    function getOwner() public view returns(address){
        return contractOwner;
    }


    function uploadDocument(string memory uniqueId,string memory ipfsHash, address universityAddress) public {  //call by student or university
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        require(documentsById[uniqueId].owner== address(0), "Document already exist");
        require(universities[universityAddress], "Only Registered university is allowed");
             

        Document memory document = Document({
            owner: msg.sender,
            universityAddress: universityAddress,
            ipfsHash: ipfsHash,
            verified: false
        });

        documentsById[uniqueId] = document; // Store the document by its id // 
        universityDocumentList[universityAddress].push(uniqueId); //add new id in university document list
        studentDocumentList[msg.sender].push(uniqueId);  //add new id in student document list
         emit LogPrint("Document uploaded successfully");
    }

    function uploadDocumentnVerify(string[][] memory data,address[] memory studentAddressList,uint  count) public { //only by university//
      require(universities[msg.sender], "Only Registered university is allowed");
        require(data.length >= count || studentAddressList.length >= count , "Count exceeds array length");
       require(data.length==studentAddressList.length,"elements mismatch");
       for(uint i=0;i<count;i++){
        require(data[i].length == 2, "Each data row should have 2 elements");

        Document memory document = Document({
            owner: studentAddressList[i],
            universityAddress:  msg.sender,
            ipfsHash: data[i][1],
            verified: true
        });
        string memory documentId=data[i][0];
        documentsById[documentId] = document; // Store the document by its id // 
        universityDocumentList[msg.sender].push(documentId); //add new id in university document list
        studentDocumentList[document.owner].push(documentId);  //add new id in student document list
        

        emit LogAddressPrint(document.owner); // Emitting the event with the concatenated message
    }
    }

    function verifyDocument(string memory uniqueId,string memory oldipfsHash,string memory newipfsHash) public  { //only call by university
        require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        require(universities[msg.sender], "Only valid universities can verify documents");
        require(bytes(oldipfsHash).length > 0, "old IPFS hash cannot be empty");
        require(bytes(newipfsHash).length > 0, "new IPFS hash cannot be empty");
        require(documentsById[uniqueId].owner!= address(0), "Document does not exist");
        Document storage document = documentsById[uniqueId];
        require(document.universityAddress==msg.sender, "This university is not authorized to verify this student's document");
        require(keccak256(abi.encodePacked(document.ipfsHash)) == keccak256(abi.encodePacked(oldipfsHash)),"Fake document");
        require(!document.verified, "Document is already verified");
        document.ipfsHash=newipfsHash;
        document.verified = true;
         emit LogPrint("Document verified successfully");
        
    }
    function unverifyDocument(string memory uniqueId,string memory newipfsHash) public  { //only call by university
        require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        require(universities[msg.sender], "Only valid universities can unverify documents");
        require(bytes(newipfsHash).length > 0, "new IPFS hash cannot be empty");
        require(documentsById[uniqueId].owner!= address(0), "Document does not exist");
        Document storage document = documentsById[uniqueId];
        require(document.universityAddress==msg.sender, "This university is not authorized to unverify this student's document");
        require(keccak256(abi.encodePacked(document.ipfsHash)) == keccak256(abi.encodePacked(newipfsHash)),"Fake document");
        require(document.verified, "Document is already unverified");
        
        document.verified = false;
         emit LogPrint("Document unverified successfully");
    }
    

    function includeCompany(string memory uniqueId,address companyAddress) public   { // can be call by student or university
        require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        require(companies[companyAddress],"Require Valid Company");
        require(documentsById[uniqueId].owner!= address(0), "Document does not exist");
     
        require(!AccessCompanyMapping[uniqueId][companyAddress], "Company is already included");
     
        Document storage document = documentsById[uniqueId];
        require(document.owner==msg.sender||document.universityAddress==msg.sender,"Only Document Owner or University can perform this action");
       
        AccessCompanyMapping[uniqueId][companyAddress] = true;
         emit LogPrint("company included successfully");
    }

    function removeCompany(string memory uniqueId,address companyAddress) public {  // can be call by student or university
        require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        require(companies[companyAddress],"Require Valid Company");
        require(documentsById[uniqueId].owner!= address(0), "Document does not exist");
     
        require( AccessCompanyMapping[uniqueId][companyAddress], "Company is not included by the student or university");
      
        Document storage document = documentsById[uniqueId];
        require(document.owner==msg.sender||document.universityAddress==msg.sender,"Only Document Owner or university can perform this action");
       
        AccessCompanyMapping[uniqueId][companyAddress] = false;
         emit LogPrint("company removed successfully");
    }

    function checkStatus(string memory uniqueId) public view  returns (string[2] memory) { // can be call by student or university or comapny with mapping with student or university
        require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        require(documentsById[uniqueId].owner!= address(0), "Document does not exist");
        
        Document storage document = documentsById[uniqueId];
        
        require(AccessCompanyMapping[uniqueId][msg.sender] ||document.owner==msg.sender||document.universityAddress==msg.sender,"This company is not authorized by the student or university" );
        if(document.verified){
        return ["true",document.ipfsHash];
        }else{
        return ["false",document.ipfsHash];
  
        }
        
    }
    function checknverify(string memory uniqueId,string memory newipfsHash) public view  returns (bool) { // can be call by student or university or comapny with mapping with student or university
        require(bytes(newipfsHash).length > 0, "IPFS hash cannot be empty");
        require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        require(documentsById[uniqueId].owner!= address(0), "Document does not exist");
        
        Document storage document = documentsById[uniqueId];
        
        require(AccessCompanyMapping[uniqueId][msg.sender] ||document.owner==msg.sender||document.universityAddress==msg.sender,"This company is not authorized by the student or university" );
        require(keccak256(abi.encodePacked(document.ipfsHash)) == keccak256(abi.encodePacked(newipfsHash)),"Fake document");
        return document.verified;
    }

    function registerCompany() public {  //call by company//no check//
        companies[msg.sender]=false; 
        companyAddresses.push(msg.sender);         //creates a new company/
         emit LogPrint("company registered successfully");
    }

    function verifyCompany(address companyAddress) public onlyOwner{
        require( !companies[companyAddress],"company alredy verified");
         companies[companyAddress] = true; 
          emit LogPrint("company verified successfully");
    }

    function unverifyCompany(address companyAddress) public onlyOwner{
        require( companies[companyAddress],"company alredy unverified");
         companies[companyAddress] = false; 
          emit LogPrint("company un-verified successfully");
         
    }
    
    
    function addUniversity() public    //no check//
     {
        universities[msg.sender] = false; 
        universityAddresses.push(msg.sender);
         emit LogPrint("university added successfully");
    }

    function verifyUniversity(address universityAddress) public onlyOwner{ //onlyOwner   
        require( !universities[universityAddress],"university already verified");
        universities[universityAddress] = true; 
         emit LogPrint("university verified successfully");
    }

    function removeUniversity(address universityAddress) public onlyOwner{ //onlyOwner  
        require( universities[universityAddress],"university already unverified");
        universities[universityAddress] = false; 
         emit LogPrint("university removed successfully");
    }


    // Function to get all university addresses
    function getAllUniversityAddresses() public view returns (address[] memory) {
        return universityAddresses;
    }

    // Function to get all company addresses
    function getAllCompanyAddresses() public view returns (address[] memory) {
        return companyAddresses;
    }

    function checkUniversity(address universityAddress) public view returns(bool){
        return  universities[universityAddress];
    }

    function checkCompany(address companyAddress) public view returns(bool){
        return  companies[companyAddress];
    }

    function getUniversityDocumentList() public view returns(string[] memory){
    require( universities[msg.sender],"require valid university");
       return universityDocumentList[msg.sender];
    }
    
    function getStudentDocumentList() public view returns(string[] memory){
       return studentDocumentList[msg.sender];
    }

      function getDocumentCompanyList(string memory uniqueId) public view returns (address[] memory) {
       require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        
       Document storage document = documentsById[uniqueId];
        require(document.owner!= address(0), "Document does not exist");
         
          require(document.owner==msg.sender||document.universityAddress==msg.sender,"The user is not authorized to access document" );
     
        mapping(address => bool) storage companiesm = AccessCompanyMapping[uniqueId];
    
     uint256 count;

    // First, count the number of addresses that have true values
    for (uint256 i = 0; i < companyAddresses.length; i++) {
        if (companiesm[companyAddresses[i]]) {
            count++;
        }
    }

    // Create an array to hold the eligible addresses
    address[] memory allowedCompanies = new address[](count) ;
    uint256 index = 0;

    // Collect the addresses with true values
    for (uint256 i = 0; i < companyAddresses.length; i++) {
        if (companiesm[companyAddresses[i]]) {
            allowedCompanies[index] = companyAddresses[i];
            index++;
        }
    }

    return allowedCompanies;

    }

    function getDocumentDetails(string memory uniqueId) public view returns(string[2] memory,address[2] memory){
     require(bytes(uniqueId).length > 0, "uniqueId cannot be empty");
        
       Document storage document = documentsById[uniqueId];
        require(document.owner!= address(0), "Document does not exist");
         
          require(AccessCompanyMapping[uniqueId][msg.sender] ||document.owner==msg.sender||document.universityAddress==msg.sender,"This user is not authorized to access document" );
        string memory verifiedStr = document.verified ? "true" : "false";
        return ([document.ipfsHash, verifiedStr],[document.owner,document.universityAddress]);
   
     }

 

}