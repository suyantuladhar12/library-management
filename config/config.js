require('dotenv').config();
 
const config = {
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    db_port: process.env.db_port,
    database: process.env.database,
    PORT: process.env.PORT
};


module.exports = {
    config
  };