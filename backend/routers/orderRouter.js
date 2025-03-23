import express from 'express';
import {isAdmin, isAuth} from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';


const orderRouter = express.Router();

orderRouter.get('/summary',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    try{

        const orderStats = await Order.aggregate([
            {
                $group: {
                    _id:null,
                    numOrders:{$sum:1},
                    totalSales: {$sum:'$totalPrice'}
                }
            }
        ]);
     
        const NumOfUsers = await User.aggregate([
                {
                    $group:{
                        _id:null,
                        numUsers:{$sum:1},
                    }
                }
        ]);       
        res.send({userStats: NumOfUsers[0],orderStats: orderStats[0]});

    }catch(err){
        res.send({message: 'error'});
    }   

}));

orderRouter.get('/',isAuth, isAdmin, expressAsyncHandler(async (req,res)=>{
    const orders = await Order.find({}).populate('user');
    res.send(orders);
}));

orderRouter.get('/mine',isAuth,expressAsyncHandler( async(req,res)=>{
    const orders = await Order.find({user:req.user._id});
    res.send(orders);
}));

orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message:'Order Not Found'});
    }
}));
orderRouter.post('/',isAuth, expressAsyncHandler(async (req,res)=>{
    const order = new Order({
        orderItems:req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({message: 'New Order Created',order: createdOrder});
}));
orderRouter.put('/:id/pay',isAuth,expressAsyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now();
        order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID,
        };
        const updateOrder = await order.save();
        res.send({message: 'Order Paid', order: updateOrder});
    }else{
        res.status(404).send({message: 'Order Not Found.'});
    }
}))

orderRouter.put('/:id/deliver',isAuth,expressAsyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true,
        order.deliveredAt = Date.now();
        const updateOrder = await order.save();
        res.send({message: 'Order Delivered', order: updateOrder});
    }else{
        res.status(404).send({message: 'Order Not Found.'});
    }
}))


orderRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        const deletedOrder = await order.remove();
        res.send({message: "Order Deleted",order: deletedOrder});
    }else{
        res.status(404).send({message: 'Order Not Found'});
    }
})); 





export default orderRouter;