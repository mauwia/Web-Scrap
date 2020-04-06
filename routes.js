const express=require('express')
const router=express.Router()
const Overall=require('./Overall')

router.get('/alldata',Overall.getAll)


module.exports=router