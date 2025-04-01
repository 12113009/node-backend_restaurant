const Vendor = require("../models/Vendor");

const bcryptjs=require("bcryptjs")
const jsonwebtoken=require("jsonwebtoken")
//Vendor Register
const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const vendorEmail=await Vendor.findOne({email});
        if (vendorEmail){
            return res.status(400).json("Email already Exists");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newVendor=new Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save()
        res.status(201).json({message: "Vendor as Registers Successfully"});
        console.log("Registered");

    }catch(e){
        console.error("error");
        res.status(500).json({error:"Internal Server Error"});

    }
}
//Vendor Login
const vendorLogin=async(req,res)=>{
    const{email,password}=req.body
    try{
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error :"Invalid User"});
        }
        const token=Jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        res.status(200).json({sucess:"Login Successful",token});
        conslog.log(email);
    }catch(e){
        console.log(error);
        res.status(500).json({error:"Interval server error"})
    }
}

const getAllVendors=async(req,res)=>{
    try{
        const vendors= await Vendor.find().populate('firm');
        res.json({vendors})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Interval server error"})
    }
}

const getVendorById= async(req,res)=>{
    const vendorId=req.params.apple;
    try{
        const vendor= await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
           return res.status(404).json({error:"Vendor not found"})
        }
        res.status(200).json({vendor})

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Interval server error"})
    }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById};