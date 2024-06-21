import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import body_parser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const app = express();
const upload = multer({ dest: 'uploads/' });
// Load environment variables from .env file
dotenv.config();

const authRouter = express.Router();
authRouter.use(body_parser.urlencoded({ extended: false }));
authRouter.use(body_parser.json());


const userSchema = new mongoose.Schema({
  role:String,
  name: String, 
  email: String,
  password: String,
  roleid: String,
  address:String,
});

const User = mongoose.model('User', userSchema);

authRouter.post('/ff',upload.single('certificate'),async(req,res)=>{

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
}
//console.log(req.file);
//console.log(req.body);

const studentId = req.body.studentId;

const university = req.body.university;

// Directory path for the university
const universityDir ="C:/Users/gkavi/Desktop/test_repo/main/backend/MongoDb/uploads/"+university;

// Check if the directory for the university exists
if (!fs.existsSync(universityDir)) {
    // If the directory doesn't exist, create it
    fs.mkdirSync(universityDir);
}

// Directory path for the specific studentId inside the university
const studentDir = path.join(universityDir, studentId);

// Check if the directory for the studentId exists inside the university
if (!fs.existsSync(studentDir)) {
    // If the directory doesn't exist, create it
    fs.mkdirSync(studentDir);
}

// Construct the new path for the file
const newFileName = req.file.originalname.slice(0, req.file.originalname.length - 4) + "_" + studentId + "_" + university + ".pdf";
const newPath = path.join(studentDir, newFileName);

// Check if the file already exists
if (fs.existsSync(newPath)) {
  const universityDir = "C:/Users/gkavi/Desktop/test_repo/main/backend/MongoDb/uploads/"+university;
  // Read the contents of the student's directory
  fs.readdir(studentDir, (err, files) => {
      if (err) {
          console.error('Error reading directory:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      // Filter out only the file names
      const fileNames = files.filter(file => fs.statSync(path.join(studentDir, file)).isFile()).map(file => file);

      // Send the list of file names as a response
      res.json({ files: fileNames,message:"already exits" });
      //console.log(fileNames);
  });

}

// Rename and move the file
fs.rename(req.file.path, newPath, err => {
    if (err) {
        console.error('Error moving file:', err);
        return res.status(500).json({ error: 'Failed to save the file' });
    }
    //console.log('File uploaded successfully');
    const universityDir = "C:/Users/gkavi/Desktop/test_repo/main/backend/MongoDb/uploads/"+university;

    // Read the contents of the student's directory
    fs.readdir(studentDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Filter out only the file names
        const fileNames = files.filter(file => fs.statSync(path.join(studentDir, file)).isFile()).map(file => file);

        
        res.json({ files: fileNames });
        //console.log(fileNames);
    });

    //res.status(200).json({ message: 'File uploaded successfully' });
});
});
authRouter.post('/verifyit',upload.single('certificate'),async(req,res)=>{

 const studentId = req.body.studentId;
 const university = req.body.university;
 
 const fileName = req.file.originalname.slice(0, req.file.originalname.length - 4) + "_" + studentId + "_" + university + ".pdf";
 //console.log(fileName);

 const universityDir = "C:/Users/gkavi/Desktop/test_repo/main/backend/MongoDb/uploads/"+university;


 if (!fs.existsSync(universityDir)) {
  //console.log("hook")
     return res.json({ verified: false });
 }

 const studentDir = path.join(universityDir, studentId);

 if (!fs.existsSync(studentDir)) {
  //console.log("hooked")
     return res.json({ verified: false });
 }


 const filePath = path.join(studentDir, fileName);
 if(req.file.originalname.slice(0, 8)=="official"){
  var file=path.join(studentDir,("original_"+req.file.originalname.slice(9,req.file.originalname.length - 4)+"_"+studentId + "_" + university + ".pdf"));
  if (fs.existsSync(file)) {
      console.log("original file verifies");
       const universityDir = "C:/Users/gkavi/Desktop/test_repo/main/backend/MongoDb/uploads/"+university;
    
      // Read the contents of the student's directory
      fs.readdir(studentDir, (err, files) => {
          if (err) {
              console.error('Error reading directory:', err);
              return res.status(500).json({ error: 'Internal server error' });
          }
    
          // Filter out only the file names
          const fileNames = files.filter(file => fs.statSync(path.join(studentDir, file)).isFile()).map(file => file);
    
          return res.json({ verified: true,message:"verified",files: fileNames });
        
          //console.log(fileNames);
      });
       
     } else {
        //console.log("went")
         return res.json({ verified: false,message:"file not exits" });
     }
}

 else if (fs.existsSync(filePath)) {
  const universityDir = "C:/Users/gkavi/Desktop/test_repo/main/backend/MongoDb/uploads/"+university;

  // Read the contents of the student's directory
  fs.readdir(studentDir, (err, files) => {
      if (err) {
          console.error('Error reading directory:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      // Filter out only the file names
      const fileNames = files.filter(file => fs.statSync(path.join(studentDir, file)).isFile()).map(file => file);

      return res.json({ verified: true,message:"verified",files: fileNames });
    
      //console.log(fileNames);
  });
   
 } else {
    //console.log("went")
     return res.json({ verified: false,message:"file not exits" });
 }
 });
 authRouter.post('/companyverify',upload.single('certificate'),async(req,res)=>{
  
 const studentId = req.body.studentId;
 const university = req.body.university;
 
 const fileName = req.file.originalname.slice(0, req.file.originalname.length - 4) + "_" + studentId + "_" + university + ".pdf";
 //console.log(fileName);

 const universityDir = "C:/Users/gkavi/Desktop/test_repo/main/backend/MongoDb/uploads/"+university;


 if (!fs.existsSync(universityDir)) {
  //console.log("hook")
     return res.json({ verified: false });
 }

 const studentDir = path.join(universityDir, studentId);

 if (!fs.existsSync(studentDir)) {
  //console.log("hooked")
     return res.json({ verified: false });
 }


 const filePath = path.join(studentDir, fileName);


 if (fs.existsSync(filePath)) {
  
     return res.json({ verified: true,message:"verified" });
 } else {
    //console.log("went")
     return res.json({ verified: false,message:"file not exits" });
 }

  });
authRouter.post('/signup', async (req, res) => {
  try {
    const {role, name, email, password ,roleid,address} = req.body;
  
    if (!role|| !name|| !email|| !password ||!roleid||!address) {
      return res.status(400).json({ error: 'fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ role,name, email, password: hashedPassword,roleid,address });
    //console.log(user);
    await user.save();
    
    res.status(200).json({message:'Account Created Successfully'});
    //console.log('Data saved in User db:', user);
  } catch (error) {
    
    console.error('Error saving User:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const {role, email, password,address } = req.body;
    
    if (!role||  !email|| !password ||!address ) {
      return res.status(400).json({ error: 'fields are required' });
    }
    const user = await User.findOne({role, email,address });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare hashed password
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and return JWT token on successful login
    const token = jwt.sign({ email: user.email, id: user._id }, 'bharathi4real', { expiresIn: '1h' });
    res.status(200).json({ message:"Login Successful" });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

authRouter.post('/profile', async (req, res) => {
  try {
    const {role, email,address } = req.body;
    
    if (!role||  !email ||!address ) {
      return res.status(400).json({ error: 'fields are required' });
    }
    const user = await User.findOne({role, email,address });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message:"Profile fetched successfully",name:user.name,roleid:user.roleid });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }
    req.user = decoded;
    next();
  });
};

// Protected route example
authRouter.get('/JwtProfile', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

export default authRouter;

