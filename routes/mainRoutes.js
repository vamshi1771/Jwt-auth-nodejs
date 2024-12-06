
import express from "express";
import { Router } from "express";

const mainRouter = Router();

mainRouter.get('/',(req,res)=>{
res.status(200).json({message : " You are Logged In"});
})

export default mainRouter;