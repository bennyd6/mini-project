const jwt=require('jsonwebtoken')
const JWT_SECRET='Bennyi$ag00dguy'
const fetchfarmer=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.farmer=data.farmer
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}


module.exports=fetchfarmer;