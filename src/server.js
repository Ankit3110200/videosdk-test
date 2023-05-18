const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();
const app = express();
const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: true
  };
  
app.use(cors(corsOptions));
app.use(express.json())

const port = process.env.port || 3001
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster-test.9jsiyzo.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log("Database Connection Error",err.message)
})


const AddData = require('../controllers/addData');
const Operation = require('../controllers/Operation');


// app.get('/add-data',AddData.addData)
app.get('/op1',Operation.getCustomerWith3DayShippment);
app.get('/op2',Operation.getCustomerWith6Months);
app.get('/op3',Operation.getOrderWithYearWise);
app.get('/',(req,res)=>{
    res.json({message:"Server is running up to date"}); 
})
app.listen(port,()=>{
    console.log("server is running on port",port);
})