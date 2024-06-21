import { ipfs } from "./ipfsConnect.js";
import fs from "fs";
import { PDFDocument, rgb } from "pdf-lib";
import { v4 as uuid } from "uuid";
import path from "path";
import QRCode from "qrcode";

import multer from "multer";
import express from "express";
const ipfsRouter = express.Router();


////////////////Setup_Start/////////////////////////////
const UPLOADS_DIR = path.join(process.cwd(), "./uploads");
const APPENDED_DIR = path.join(process.cwd(), "./appended");


if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}
if (!fs.existsSync(APPENDED_DIR)) {
    fs.mkdirSync(APPENDED_DIR);
}



const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOADS_DIR);
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const id = uuid();
            cb(null, id + ext);
        },
    }),
});
export {upload};
//////////////////////Setup END////////////////////////////


///////////////////IPFS_UPLOAD_FN//////////////////////////////
async function uploadFileToIPFS(filePath) {
    const file = fs.readFileSync(filePath);
    const result = await ipfs.add(file, {
        pin: true,
    });
    return result.cid.toString();
}
/////////////////////////////////////////////////////////////




////////////////////////REQUEST////////////////////////////////////////
/// uploading fn//
ipfsRouter.post('/upload', upload.single("certificate"),
    catchAsync(async (req, res) => {
        try {
            if (!req.file) {
                throw new createHttpError.BadRequest("file not found");
            }
            const id = uuid();
            const cid = await uploadFileToIPFS(req.file.path);
            console.log("id:"+id);

            res.json({
                uuid: id,
                ifpsLink: `http://localhost:8080/ipfs/${cid}`, //`https://ipfs.io/ipfs/${cid}/?filename=${id}.pdf`,
                cid: cid.toString()
            });
         

        } catch (error) {
            console.error(error+"fck");
            res.status(500).json({ error: 'An error occurred while uploading the file' });
        }
    }));


//issue//
ipfsRouter.post("/issue", upload.single("certificate"),
  catchAsync(async (req, res) => {
    try {
      if (!req.file) {
        throw new createHttpError.BadRequest("file not found");
      }

    /*  const id = req.body.selectedUUID; // Access the value of selectedIpfs here

      const certificatePath = req.file.path; // Assuming the path is correct

      const appendedFilePath = path.join(APPENDED_DIR, id + ".pdf");

      await generateQRCodePDF(id, certificatePath, appendedFilePath);
      const cid = await uploadFileToIPFS(appendedFilePath); // Upload the appended PDF*/

      res.json({
        ifpsLink: `http://localhost:4001/p2p/12D3KooWC3RiC4yAANKiTnsRpFk1FopUHwkz2sYd5xDbRppmZEGp`, // Link to the appended PDF
        cid: cid.toString(),
        uuid: id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
  })
);

////////////////////////////////////////////////////////////////////////    

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
// generate QR Code////////////////////
async function generateQRCodePDF(text, pdfInputPath, pdfOutputPath) {
    const link = `http://localhost:5173/CompanyPage?document=${text}`;

    const qrCode = await QRCode.toDataURL(link,
        { errorCorrectionLevel: 'H' });
    const pdfBytes = fs.readFileSync(pdfInputPath); // Read the PDF file

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const [page] = pdfDoc.getPages();

    const qrCodeImage = await pdfDoc.embedPng(qrCode);
    const qrCodeDims = qrCodeImage.scale(0.25);

    page.drawImage(qrCodeImage, {
        x: page.getWidth() - qrCodeDims.width - 20,
        y: 20,
        width: qrCodeDims.width,
        height: qrCodeDims.height,
    });

    // Add text below the QR code
    page.drawText(text, {
        x: page.getWidth() - qrCodeDims.width - 200,
        y: 20 - 15,
        size: 12,
        color: rgb(0, 0, 0),
    });

    const modifiedPdfBytes = await pdfDoc.save();

    // Write the modified PDF bytes to a new file
    fs.writeFileSync(pdfOutputPath, modifiedPdfBytes);
}


export default ipfsRouter;
