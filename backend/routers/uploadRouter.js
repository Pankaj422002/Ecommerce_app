import express from 'express';
import multer from 'multer';
import {isAuth, isAdmin} from '../utils.js';
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'images/');
    },
    filename(req,file,cb){
        cb(null,`${Date.now()}.jpg`);
    },
});

const upload = multer({storage});
const uploadRouter = express.Router();

uploadRouter.post('/',isAuth, isAdmin, upload.single('image'), (req,res)=>{
    // console.log('authorized and admin also');
    res.status(200).send({image: `/${req.file.path}`});
});

export default uploadRouter;