const { Pool } = require('pg');
const { config } = require('../config/config.js');

const db_config = {
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.db_port,
    database: config.database,
};
const pool = new Pool(db_config);

module.exports = {
    pool
  };
