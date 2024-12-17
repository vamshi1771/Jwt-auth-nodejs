import jwt from "jsonwebtoken"

const requireAuth = (req,res,next)=>{
    const  token = req?.cookies?.jwt;
    if(token){
        jwt.verify(token,process.env.SECRECT_KEY,(err, decodedToken)=>{
            if(err){
                console.log(err);
                console.log(token);
                // 401 status code for unauthorised user requests
                res.status(401).json({error : "Please login first"});
            }
            else {
                next();
            }
        })
    }
    else{
        res.status(401).json({error : "Please login first"});
    }
}

export default requireAuth;