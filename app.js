const express=require('express')
const bodyParser=require('body-parser')
const dataRoute=require('./routes')
const app=express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/pak',dataRoute)
app.use((err,req,res,next)=>{
    console.log(err)
    const status=err.statusCode || 500
    const message=err.message
    res.status(status).json({message:message})
})

app.listen(3000)