import cors from "cors";
import express from "express";
import multer from "multer";
import fs from "fs";
import { PDFDocument, rgb } from "pdf-lib";
import { v4 as uuid } from "uuid";
import path from "path";
import morgan from "morgan";
import QRCode from "qrcode";
import bodyParser from 'body-parser';


const port=5000;
/////.////////////////base setup////////
const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(bodyParser.json());




//////////////////////////MongoDbFn../////////////////////////////
/////mongo///////////////
import { mongoConnect } from "./MongoDb/mongoConnect.js";
import authRouter from "./MongoDb/mongofn.js";

mongoConnect();

app.use('/auth', authRouter);
////////////////////////////////////////////////////////////

// Call the function to initialize the IPFS client
////////ipfs////////////////
import { initIPFSClient } from "./IpfsDb/ipfsConnect.js";
import ipfsRouter from "./IpfsDb/ipfsfn.js";

initIPFSClient();
app.use('/',ipfsRouter);
//////////////////////////////////////////////////////



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
