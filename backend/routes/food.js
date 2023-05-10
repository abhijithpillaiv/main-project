var express = require('express');
var router = express.Router();
var userHelper = require("../helpers/userHelper")
const nodemailer = require("nodemailer");
const { response } = require('express');
var jwt = require('jsonwebtoken');
var collection = require('../config/collection');
var handlebars = require('handlebars');
const fs = require("fs");
const foodHelper = require('../helpers/foodHelper');

// Get food by date
router.post('/getfood',((req,res)=>{
  foodHelper.getfood(req.body).then((data)=>{
    res.send(data)
  })
}))

// set food
router.post('/setfood',((req,res)=>{
  foodHelper.setfood(req.body).then((data)=>{
    res.send(data)
  })
}))

// daily nutrition
router.post('/getnutrition',((req,res)=>{
  foodHelper.getnutrition(req.body).then((data)=>{
    res.send(data)
  })
}))
// daily nutrition dated
router.post('/getnutritiondated',((req,res)=>{
  const promises = req.body.date.map(date => foodHelper.getnutritiondated(req.body.id, date));
  Promise.all(promises)
    .then(dataArr => {
      const arr = dataArr.map(data => data.length ? data : 0);
      console.log(arr);
      res.send(arr);
    })
}))
// delete food
router.get('/dltfood/:id/:userid',((req,res)=>{
  foodHelper.dltfood(req.params.id,req.params.userid).then((data)=>{
    res.send(data)
  })
}))
module.exports = router;
