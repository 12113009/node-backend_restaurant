const Frim=require("../models/firm")
const Vendor=require("../models/Vendor"); 
const  multer=require('multer');

   // Configure Multer Storage
   const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + path.extname(file.originalname));
    }
    });
    const upload=multer({storage:storage});

const addFirm= async(req,res)=>{
    try{
    const{firmName,area,categroy,region,offer}=req.body
    const image=req.file?req.file.filename:undefined
    const Vendor=await Vendor.findById(req.vendorId)
    if(!Vendor){
        res.status(404).json({message:"Vendor not found"})
    }
    const firm=new Frim({
        firmName,area,categroy,region,offer,image,vendor:vendor._id
    })
    const savedFirm= await firm.save()
    Vendor.firm.push(savedFirm)
    await Vendor.save()


    return res.status(200).json({message:"Firm Added Successfully"})
    }
    catch(error){
        console.error(error)
        res.status(500).json("internal server error");

    }
    
}

const deleteFirmById=async(req,res)=>{
    try{
        const firmId=req.params.firmId;
        const deletedProduct=await Firm.findByIdAndDelete(firmId)
        if(!deletedProduct){
            return res.status(404).json({error: "No product found"})

        }

    }catch(error){
        console.error(error)
        res.status(500).json("Internal server error");

    }
}
module.exports = {addFirm:[
    upload.single("image"),
    addFirm
],deleteFirmById};
