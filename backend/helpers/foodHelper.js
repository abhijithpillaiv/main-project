const promise = require('promise');
var db = require('../config/connection')
var bcrypt = require('bcrypt');
var collection = require('../config/collection');
const { ObjectID } = require('bson');
const { resolve, reject } = require('promise');
const { response } = require('express');
var healthHelper=require('./healthHelper')
module.exports = {
    // Get item by date
    getfood:(data)=>{
        return new promise(async (resolve,reject)=>{
            let res=await db.get().collection(collection.food).find({'id':data.id,'date':data.date}).toArray()
                resolve(res);
        })
    },
    setfood:(data)=>{
        return new promise(async (resolve,reject)=>{
            await db.get().collection(collection.food).insertOne(data).then((data)=>{
                resolve(data)
            })
        }) 
    },
    // Get calorie by date
    getnutrition:(data)=>{
        return new promise(async (resolve,reject)=>{
            console.log(data);
            let res=await db.get().collection(collection.food).aggregate([
                {
                    $match: {'id':data.id,'date':data.date}
                },
                  {
                    $group: {
                      _id: data.date,
                      calories: {
                        $sum: "$nut_val.calories"
                      },
                      fat: {
                        $sum:"$nut_val.fat"
                      },
                      protein: {
                        $sum:"$nut_val.protein"
                      },
                      carb: {
                        $sum:"$nut_val.carb"
                      }
                    }
                  }
            ]).toArray();
                resolve(res);
        })
    },
    // Get nut dated
    getnutritiondated:(id,date)=>{
        return new promise(async (resolve,reject)=>{
            let res=await db.get().collection(collection.food).aggregate([
                {
                    $match: {'id': id, 'date':  date }
                },
                  {
                    $group: {
                      _id: date,
                      calories: {
                        $sum: "$nut_val.calories"
                      },
                      fat: {
                        $sum:"$nut_val.fat"
                      },
                      protein: {
                        $sum:"$nut_val.protein"
                      },
                      carb: {
                        $sum:"$nut_val.carb"
                      }
                    }
                  }
            ]).toArray();
                resolve(res);
        })
    },
    dltfood:(id,userid)=>{
        return new promise(async (resolve,reject)=>{
            await db.get().collection(collection.food).deleteOne( { "_id" : ObjectID(id),"id":userid} ).then(()=>{
                resolve();
            })        
        })
    },
}