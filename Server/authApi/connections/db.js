import mysql from "mysql";
const db = mysql.createConnection({
    host : process.env.host,
    port :"3306",
    user : process.env.user,
    password: process.env.password+"##++",
    database: process.env.database
})
export default db;