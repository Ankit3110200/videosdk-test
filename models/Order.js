const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true       
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    orderDate:{
        type:String,
        required:true
    },
    shipDate:{
        type:String,
        required:true
    },
    shipMode:{
        type:String,
        required:true,
        enum:['Same Day','First Class','Second Class','Standard Class'],
        default:'Standard Class'
    }
},{timestamps:true})

module.exports = mongoose.model('order',orderSchema)