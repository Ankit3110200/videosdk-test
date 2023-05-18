const mongoose = require('mongoose');
// customerId
// customerName,
// segment
// address:{
//     country,
//     state,
//     city.
//     postalcode,
//     region
// }
const customerShhema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    customerName:{
        type:String,
        required:true
    },
    segment:{
        type:String,
        required:true,
        enum:['Consumer','Corporate','Home Office']
    },
    address:{
        country:{
            type:String,
            required:true,
            default:'United States'
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        postalCode:{
            type:Number
        },
        region:{
            type:String,
            enum:['East','West','South','Central']
        }
    }
},{timestamps:true})

module.exports = mongoose.model('customer',customerShhema)