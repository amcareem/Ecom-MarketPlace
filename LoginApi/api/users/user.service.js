const pool = require("../../config/database");

module.exports = {
    create: (data, callBack)=>{
        pool.query(
            `insert into registration(firstName, lastName, gender, email,password,number,userType)
                    values(?,?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.typeUser
            ],
            (error,results,fields)=>{
                if(error){
                   callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },

    getUsers: callBack => {
        pool.query(
            `select id,firstName,lastName,gender,email,number,userType from registration`,
            [],
            (error, results, fields) => {
                if(error) {
                     callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUserByUserId:(id, callBack) => {
        pool.query(
            `select id,firstName,lastName,gender,email,number,userType from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
       
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update registration set firstName=?, lastName=?, gender=?,email=?,password=?,number=?,userType=? where id=?`,
            [data.first_name,
             data.last_name,
             data.gender,
             data.email,
             data.password,
             data.number,
             data.typeUser,
             data.id
            ],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }

                return callBack(null,results);
            }

        );
    },
    deleteUser: (data , callBack) =>{
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};