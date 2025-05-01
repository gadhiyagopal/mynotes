const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const { check , validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fetchUser = require('./../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'mynotes@2023';

// Route-1 : add user using : POST   /api/user/create
router.post( "/create" , 
    [
        check('name').notEmpty().withMessage('Please Enter Name..!'),
        check('email').isEmail().withMessage('Please Enter Valid Email..!'),
        check('password').notEmpty().withMessage('Please Enter Password..!'),
    ], 
    async ( req , res ) => {

        try{
            let flag = false;
            // check validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.json(errors);
            }
            else {

                // check email is exist or not
                const checkEmail = await User.findOne({ email: req.body.email });
                if( checkEmail ){
                    return res.status(500).json({ flag , error: "Email Already Registered." });
                }
                else{ 
                    
                    // create password encryption
                    let genSalt = await bcrypt.genSalt(15);
                    let ps = await bcrypt.hash( req.body.password , genSalt );
                    
                    // store in mongoDB
                    const user = User({ "name":req.body.name , "email":req.body.email , "password": ps });
                    user.save();
                    
                    // generate Token
                    let data = {
                        user:{
                            id: user.id
                        }
                    }
                    var token = jwt.sign( data , JWT_SECRET_KEY );

                    // response
                    flag = true;
                    res.send({ flag , token});
                }
            }
        }
        catch( err ){
            return res.status(400).json({ flag , error:"Something Want Wrong.", message:err.message });
        }
    
    } 
);


//  Route-2 : login user using : POST   /api/user/login
router.post( "/login" , 
    [
        check('email').isEmail().withMessage('Please Enter Valid Email..!'),
        check('password').notEmpty().withMessage('Please Enter Password..!'),
    ], 
    async ( req , res ) => {

        try{
            let flag = false;
            // check validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.json(errors);
            }
            else {

                let { email , password } = req.body;

                // verify email
                const user = await User.findOne({email});
                if( !user ){
                    return res.status(500).json({ flag , error: "Invalid Email or Password!" });
                }

                // verify password
                const passVerify = await bcrypt.compare( password , user.password );
                if( !passVerify ){
                    return res.status(500).json({ flag , error: "Invalid Email or Password!" });
                }
                
                // generate Token
                let data = {
                    user:{
                        id: user.id
                    }
                }
                var token = jwt.sign( data , JWT_SECRET_KEY );

                // response
                flag = true;
                res.send({flag , token});

            }
        }
        catch( err ){
            return res.status(400).json({ error:"Something Want Wrong.", message:err.message });
        }
    
    } 
);


//  Route-3 : get login user detail using : POST   /api/user/getuser
router.post( "/getuser" , fetchUser , async ( req , res ) => {
        try{
            flag = false;
            let userId = req.user;
            const user = await User.findById(userId).select("-password");
            res.json({ flag , user });
        }
        catch( err ){
            return res.status(400).json({ flag , error:"Something Want Wrong.", message:err.message });
        }
    }
);    

module.exports = router;