const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const path = require("path")
const hbs = require('hbs')

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
app.set('views',path.join(__dirname));
app.set('view engine','hbs')
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
app.get('/op1',(req,res)=>{
    Operation.getCustomerWith3DayShippment()
    .then((data)=>{
        // console.log(data)
        res.render('data',{
            title:"the total number of unique customers who received their shipment within 3 days of ordering any product.",
            value: data
        }); 
    })
});
app.get('/op2',(req,res)=>{
    Operation.getCustomerWith6Months()
    .then((data)=>{
        // console.log(data)
        res.render('data',{
            title:"the total number of unique customers who ordered any product every month for 6 months continuously.",
            value: data
        }); 
    })
});
app.get('/op3',(req,res)=>{
    Operation.getOrderWithYearWise()
    .then((data)=>{
        // console.log(data)
        res.render('data',{
            title:"Find a single city for every year where most orders were placed",
            value: data
        }); 
    })
});
app.get('/',async (req,res)=>{
    res.render('index')
})
app.listen(port,()=>{
    console.log("server is running on port",port);
})