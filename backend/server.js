import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './routers/userRoute';
import bodyParser from 'body-parser';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';
import path from 'path';

const port = process.env.PORT || 9000;

mongoose.connect(config.MONGODB_URL).then(()=>{
  console.log("connected to mongodb.");
}).catch((error)=>{
  console.log(error.reason);
});
 
// const express = require("express");
// const cors = require("cors");
// const data = require("./data");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users',userRouter);
app.use('/api/uploads',uploadRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.get('/api/paypal/clientId',(req,res)=>{
  res.send({clientId: config.PAYPAL_CLIENT_ID});
})


// also have to make the upload as static file: 
app.use('/uploads',express.static(path.join(__dirname,'../uploads')));

/// make frontend folder to static :
app.use(express.static(path.join(__dirname,'/../frontend')));
// also make the index.html as starting file: 
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/../frontend/index.html'));
});


app.use((err,req,res,next)=>{
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({message:err.message});
});

app.listen(port, () => {
  console.log('server is running at : http://localhost:9000');
});

// cnt+shift+p
