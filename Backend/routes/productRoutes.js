const  express=require("express");
const productController=require("../controllers/productController");
const router=express.Router()


//console.log("productController:", productController);

router.post('/add-product/:firmId',productController.addProduct)
router.get('/:firmId/products',productController.getProductByFrim)


router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/productId',productController.deleteProductById)
module.exports=router;
