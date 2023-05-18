const csv=require('csvtojson')
const Customer = require('../models/Customer')
const Product = require('../models/Product')
const Order = require('../models/Order')
class AddData{
    static addData=async(req,response)=>{
        csv()
        .fromFile(`${__dirname}/../resource/task.csv`)
        .then(res=>{
            // {
            //     'Row ID': '1',
            //     'Order ID': 'CA-2017-152156',
            //     'Order Date': '08/11/2017',
            //     'Ship Date': '11/11/2017',
            //     'Ship Mode': 'Second Class',
            //     'Customer ID': 'CG-12520',
            //     'Customer Name': 'Claire Gute',
            //     Segment: 'Consumer',
            //     Country: 'United States',
            //     City: 'Henderson',
            //     State: 'Kentucky',
            //     'Postal Code': '42420',
            //     Region: 'South',
            //     'Product ID': 'FUR-BO-10001798',
            //     Category: 'Furniture',
            //     'Sub-Category': 'Bookcases',
            //     'Product Name': 'Bush Somerset Collection Bookcase',
            //     Sales: '261.96'
            //   }
            let customerList=[];
            let productList=[];
            let orderList=[];
            let customerListDict={};
            let productListDict={};
            for(var i=0;i<res.length;i++){
                const orderId = res[i]['Order ID']
                const orderDate = res[i]['Order Date'] 
                const shipDate = res[i]['Ship Date']
                const shipMode = res[i]['Ship Mode']
                const customerId = res[i]['Customer ID']
                const customerName = res[i]['Customer Name']
                const segment = res[i]['Segment']
                const country = res[i]['Country']
                const city = res[i]['City']
                const state = res[i]['State']
                const postalCode = res[i]['Postal Code']
                const region = res[i]['Region']
                const productId = res[i]['Product ID']
                const category = res[i]['Category']
                const subCategory = res[i]['Sub-Category']
                const productName = res[i]['Product Name']
                const sales = res[i]['Sales']
                
                if(!customerListDict[customerId]){
                    const _customer=new Customer({
                        customerId,
                        customerName,
                        segment,
                        address:{
                            country,
                            city,
                            state,
                            postalCode,
                            region
                        }
                    })
                    customerListDict[customerId]=_customer.id;
                    customerList.push(_customer);
                }

                if(!productListDict[productId]){
                    const _product = new Product({
                        productId,
                        productName,
                        sales,
                        category,
                        subCategory
                    })
                    productListDict[productId]=_product.id;
                    productList.push(_product);
                }
                
                const _order = new Order({
                    orderId,
                    orderDate,
                    shipDate,
                    shipMode,
                    customerId:customerListDict[customerId],
                    productId:productListDict[productId]
                })

                orderList.push(_order);
                // console.log(res[i])
            }
            try{
                console.log("total orders: ",orderList.length);
                console.log("total customers: ",customerList.length);
                console.log("total products: ",productList.length);
                Customer.insertMany(customerList)
                Product.insertMany(productList)
                Order.insertMany(orderList)
                response.status(200).json({
                    message:"inserted succesfully"
                })
            }catch(err){
                response.status(203).json({
                    message:"error occured"
                })
            }
        })
    }
}

module.exports = AddData