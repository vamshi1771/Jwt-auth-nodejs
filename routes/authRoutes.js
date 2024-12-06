import express from 'express';
import { handleGetLogin,handlePostLogin,handleGetsignUp,
        handlePostsignUp } from '../controllers/authControllers.js';
import Router  from 'express';

const authrouter = Router();

authrouter.get('/signup',handleGetsignUp);

authrouter.post('/signup',handlePostsignUp);

authrouter.get('/login',handleGetLogin);

authrouter.post('/login',handlePostLogin);

export default authrouter;