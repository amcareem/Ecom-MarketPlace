import jwt from 'jsonwebtoken';
import db from "../connections/db.js";
export const verifyToken = async(req,res,next) =>{
    try{
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).json({msg:"access denied"});
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
function getUserById(userId) {
    return new Promise((resolve, reject) => {
        // Your database query logic here
        // Replace this with your actual database query
        db.query('SELECT * FROM user WHERE user_id = ?', [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]); // Assuming you want to resolve the first user from the result
            }
        });
    });
}