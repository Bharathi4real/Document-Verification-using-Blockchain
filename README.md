# Digital-Document-Verification-using-Blockchain
Digital Document Verification using Blockchain and IPFS.

## Introduction
The students graduating either choose to continue their studies or go hunting for jobs. In both cases, they are required to submit their certificates. A couple of times students find that they have lost the certificates and they need to reapply, which is a long procedure and has to go through multiple verifications, taking a lot of time. Also, considering the increase in forgery of documents, the organization to which the certificates are submitted finds it difficult to verify the certificates. There is no effective way to check for forgery.
## Aim
To address the issue of the distribution and verification of certificates, we propose a decentralized application that does the digital certificate generation and certificate verification processes. An effective solution by integrating the concepts of blockchain, ipfs and QR codes has been proposed. The system saves paper, cuts management costs, prevents forgery, and provides accurate and reliable information about certificates.
## Components
1. Student: upload the document and request verification from the university.
2. University: verifies the document.
3. Company: check the verification status.
4. Owner: register the universities and company.
## Functions
1. student:
   - select the university and upload the document
   - select which company can access the status of selected document
2. University:
   - register as University (needs to be verified by Owner)
   - select the document id for verification and upload the original document approved by university and verify
   - select which company can access the status of selected document
3. Company:
   - register as Company (needs to be verified by Owner)
   - scan the QR code of document and check status
   - or upload document submitted by student to check its authenticity and verification status
4. Owner:
   - verify the university
   - verify the company
## Workflow
- when student upload the document, it is pining on IPFS and its CID (hash) is stored in the blockchain as <br> mapping{documentID->student_address,hash,university_address,verifiedStatus}.
- Then the university selects the document ID to be verified. To verify this document, they have to upload the original document issued by the university for verification. If both documents are the same, then the ipfs will return the same hash and in blockchain verification status is upadated to verified: true; and after that QR code is embedded on PDF with documentID. 
- OR University can directly upload multiple student document with verified status true during generation of result so this removes the posibility of counterfitting of documents completely, they just have to upload excel file with two columns as studentaddress and file name(with extension) and select multiple files. 
- Company can scan the QR to see the verification status and document. \
or they can upload the document submitted by the student, then ifps will return the hash, and blockchain will check if it is the same as the uploaded document hash or not. if it is, then the document is authentic and its verification status is returned; otherwise, the document is Fake (counterfeit)
## What we need 
1) npm , Node.js //for packages and server
2) Ganache //for local blockchain with dummy accounts loaded with ethers for transactions
3) IPFS client //for storing documents in decentralized storage
4) MetaMask //for connecting the website with blockchain (localhost), for transactions, and for accounts and token management
5) Truffle //for deploying contract on local blockchain
## Software Requirements
1) npm , Node.js
2) Ganache
3) IPFS desktop client
4) MetaMask Chrome Extension 
## Installation
> step 1. Clone the repository to your local machine:
```
git clone https://github.com/bharathi4real/Digital-Document-Verification-using-Blockchain.git
```
>step 2. Navigate to repository:
```
cd Digital-Document-Verification-using-Blockchain
```
>step 3. Navigate to frontend folder
```
cd main/frontend
```
>step 4 Install dependencies for frontend
```
Digital-Document-Verification-using-Blockchain>main>frontend>npm install
```
>step 5 Navigate to backend:
```
cd..
cd backend
```
>step 6 Install dependencies for backend
```
Digital-Document-Verification-using-Blockchain-and-IPFS>main>backend>npm install
```

## File structure Tree
```
Digital-Document-Verification-using-Blockchain
|── main //main project folder
      ├── frontend  //frontend
      │    └── src
      │        ├── pages
      │        │      ├── HomePage.js  
      │        │      ├── OwnerPage.js  
      │        │      ├── StudentPage.js
      │        │      ├── UniversityPage.js
      │        │      ├── CompanyPage.js
      │        │      └── AuthPage.js 
      │        │           
      │        └── App.js //main file
      │          
      ├── backend   //backend
      │       ├──IpfsDb
      │       │     ├── ipfsConnect.js
      │       │     └── ipfsfn.js
      │       │
      │       ├──MongoDb
      │       │     ├── mongoConnect.js
      │       │     └── mongofn.js
      │       └── server.js 
      └── SmartContract  //smartcontract
              ├── contract
              │      └── Contract.sol
              ├── migrations
              │      └── 1_deploy_contracts.js
              └── truffle-config.js

```
## Setup (Windows)
step 1. start Ganache (Default settings) \
step 2. start ipfs client               \
step 4. start MetaMask and setup account \
step 5. switch network to Localhost \
step 6. import account using private key from Ganache dummy accounts (atleast 4 accounts with names as: 1st ganache account as owner, student, university and company) \
step 7. Navigate to SmartContract folder \
step 8. Deploy smart contract using truffle cmd 
```
Digital-Document-Verification-using-Blockchain-and-IPFS>SmartContract>truffle migrate
```
## Run the project
>step 1. Ganache running in BG \
>step 2. IPFS running in BG \
>step 3. Navigate to frontend and write 
```
npm start
```
>step 4. Navigate to backend and write 
```
npm start
```
>step 5. Connect the website with MetaMask 

BOOM ALL DONE!!
## Setup 
step 1. create 3 accounts from Auth Signup page with 3 roles remember to have same wallet address as role. \
step 2. University: add university (top right) \
step 3. Company: add company (top right) \
step 4. Owner: select and verify university and company 
## Main project Interaction
*Note: The page name should match with the metamask account name.
for ex. When the student page is open, the student account is set in metamask and its address is shown on screen \
step 1. Student: upload document \
step 2. University: select document and upload original document that they have \
step 3. Company those who are added by student for document can see verification status by scanning QR code \
or can upload the document submitted by student and check its authenticity. 


      


