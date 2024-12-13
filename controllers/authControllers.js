import { get } from "mongoose";
import userSchme from "../mongodB/model/Users.js";
import jwt from "jsonwebtoken"



//input Error Validation
// for sending error to user in Json format
const handleErrors =(error)=>{
    let err = {email : '' ,password : '', useName :''}
    
    // dupicate error code
    if(error.code === 11000){
        err.email = "This Email is already Registered";
        return err;
    }

    // validation error
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors);
        errors.forEach((error) => {
            err[error.path] = error.message;
        });
    } 
    
    if(error.message == "Incorrect Password"){
        err.password = "Please Enter valid password";
    }
    if(error.message === "Incorrect Email"){
        err.email = "Please Enter a Registered Email";
    }

    return err;
}

// Token age limit(expiry date)
const maxAge = 3*24*60*60
const getToken = (id) =>{
    return jwt.sign({id},process.env.SECRECT_KEY,{
        expiresIn : maxAge
    })
}


const handleGetsignUp = (req,res)=>{
    
}

const handlePostsignUp = async (req,res)=>{
    const {firstName, lastName, email, password, role} = req.body;
    const userName = firstName+" "+ lastName;
    // console.log(req.body);
    try{
      const user =await userSchme.create({userName,password,email,role});
      const  token = getToken(user._id);
      res.cookie('jwt',token, {httpOnly : true, maxAge : maxAge*1000});
      res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        const error = handleErrors(err);
        res.status(400).json(error);
    }
}

const handlelogout = (req,res)=>{
    const  token = req?.cookies?.jwt;
   try{
    blacklistToken(token);
    res.send({ message: 'Logged out successfully' });
   }
  catch(err){
    res.status(401).json({message : "Please Login First"})
  }
}

const handlePostLogin = async(req,res)=>{
    const {email , password } = req.body;
    try{
        const user = await userSchme.login(email, password);
        const  token = getToken(user._id);
        res.cookie('jwt',token, {httpOnly: false,secure: false,
        sameSite: 'None', maxAge : maxAge*1000});
        res.status(200).json(user);
    }
    catch(err){
        const error = handleErrors(err);
        res.status(400).json(error);
    }
}

export {handleGetsignUp,handlePostsignUp,handlelogout,handlePostLogin};