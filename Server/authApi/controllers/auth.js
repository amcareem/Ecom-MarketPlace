import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../connections/db.js"

export const register = async(req,res) =>{
    console.log(req.body)
    try{
        const {name,email,password,confirmPassword} = req.body;
        db.query('select email from user where email = ?',[email], (error,results) =>{
            if(error){
                console.log(error);
            }
            if(results.length > 0){
                return res.status(400).json({msg:"email already in use"})
            }
        });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        db.query('insert into user set ?', {user_name:name, email:email, password:passwordHash},(error,results)=>{
            if(error){
                console.log(error)
            }
            else{
                // console.log(res);
                return res.send({msg:"successfully registered"})
            }
        })
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      db.query('select email from user where email = ?',[email], (error,results) =>{
        if(error){
            console.log(error);
        }
        if(results.length = 0){
            return res.status(400).json({msg:"you havn't registered yet"})
        }
    });
        db.query('select * from user where email = ?',[email],(error,rows,fields) =>{
            if(error){
                console.log(error);
            }
            var password_hash=rows[0]['password'];
            const isMatch = bcrypt.compare(password,password_hash);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
            const token = jwt.sign({ name: rows[0].user_name }, process.env.JWT_SECRET);
            res.status(200).json({
                msg:"login successfull",
                token,
                user: rows[0]
            });
        });
        
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };