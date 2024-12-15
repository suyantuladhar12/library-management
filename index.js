const express = require('express');
const { router } = require ('./routes/routes.js');
const cors = require ('cors');
const {config} = require('./config/config.js');

const app = express();

app.use(express.json())
app.use(cors())
app.use(router)



app.listen(config.PORT,()=>{
    console.log(`server is running at PORT ${config.PORT}`)
});