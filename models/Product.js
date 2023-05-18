const mongoose = require('mongoose')
// productId,
// productName,
// sales,
// category,
// subCategory
const productShcema=new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    sales:{
        type:mongoose.Schema.Types.Decimal128,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('product',productShcema);