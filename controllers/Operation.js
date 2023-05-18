const Order = require("../models/Order")

class Operation{
    static getCustomerWith3DayShippment=async(req,res)=>{
        let data = await Order.aggregate([
            {
              $match: { shipMode: "First Class" },
            },
              {
              $lookup: {
                from: "customers",
                localField: "customerId",
                foreignField: "_id",
                as: "customerDetails",
              },
            },
            {
                $unwind: "$customerDetails"
            },
            {
              $group: {
                _id: null,
                uniqueValues: {
                  $addToSet: "$customerId",
                },
                customerId:{
                  $first: "$customerId"
                },
                customerDetails:{
                  $addToSet:"$customerDetails"
                },
                shipMode:{
                  $first:"$shipMode"
                }
              },
            },
          
            {
              $project: {
                numberOfCustomersWith3DayShip: { $cond: { if: { $isArray: "$uniqueValues" }, then: { $size: "$uniqueValues" }, else: 0} },
                // CustomerDetailsList: { $cond: { if: { $isArray: "$customerDetails" }, then: { $size: "$customerDetails"}, else: 0} },
                // customerDetails: 1,
                // shipMode:1
              },
            },
          ])
        //   console.log(data)
        return res.status(200).json({
            data
        })
    }
    
    static getCustomerWith6Months=async(req,res)=>{
        let data = await Order.aggregate([
            {
              $addFields: {
                orderDate: {
                  $dateFromString: {
                    dateString: "$orderDate",
                    format: "%d/%m/%Y"
                  }
                }
              }
            },
            {
              $group: {
                _id: {
                  customerId: "$customerId",
                  year: { $year: "$orderDate" },
                  month: { $month: "$orderDate" }
                },
                orderCount: { $sum: 1 }
              }
            },
            {
              $group: {
                _id: "$_id.customerId",
                monthCount: { $sum: 1 }
              }
            },
            {
              $match: {
                monthCount: { $gte: 6 }
              }
            },
            {
              $group: {
                _id: null,
                uniqueCustomers: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                uniqueCustomers: 1
              }
            }
          ])
          return res.status(200).json({
            data
          })
    }
    static getOrderWithYearWise=async(req,res)=>{
        let data=await Order.aggregate([
            {
              $lookup: {
                from: "customers",
                localField: "customerId",
                foreignField: "_id",
                as: "customer"
              }
            },
            {
              $unwind: "$customer"
            },
            {
              $addFields: {
                orderDate: {
                  $dateFromString: {
                    dateString: "$orderDate",
                    format: "%d/%m/%Y"
                  }
                }
              }
            },
            {
              $group: {
                _id: {
                  year: { $year: "$orderDate" },
                  city: "$customer.address.city"
                },
                orderCount: { $sum: 1 }
              }
            },
            {
              $sort: {
                "_id.year": 1,
                orderCount: -1
              }
            },
            {
              $group: {
                _id: "$_id.year",
                city: { $first: "$_id.city" },
                orderCount: { $first: "$orderCount" }
              }
            },
            {
              $project: {
                _id: 0,
                year: "$_id",
                city: 1,
                orderCount: 1
              }
            },
            {
              $sort: {
                year: 1
              }
            }
          ])

        return res.status(200).json({
            data
        })
    }
}
module.exports=Operation