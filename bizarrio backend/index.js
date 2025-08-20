
const express=require('express')
const cors=require('cors');
const path = require('path');
const connect = require('./connectdb');
const bodyParser = require('body-parser');
require('dotenv').config();


const app=express();


app.use(bodyParser.json({ limit: "50mb" })); // Increase limit for JSON payloads
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Increase limit for form data

app.use(express.json({ limit: '50mb' }));


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors())

connect();
app.get('/',(req,res)=>
{
    res.send("welcome to bizarrio")
})
app.use('/doctor',require('./routers/doctor/doctoroutes'));
app.use('/hospital',require('./routers/hospital/hospitalroutes'));


const server=app.listen(process.env.PORT,()=>
{
    console.log(`server is running on port:${process.env.PORT}`);
})
server.setTimeout(5 * 60 * 1000); // 300000 ms = 5 minutes

