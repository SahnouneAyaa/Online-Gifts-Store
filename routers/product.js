const productConteller=require('../controllers/product')
const router=require('express').Router()
const multer=require('multer')
const guardAuth=require('./guardAuth')



router.get('/shop', productConteller.productController)

router.get('/product/:id', productConteller.productDetailsController)

router.get('/addProduct' ,guardAuth.isNotAuth, productConteller.addProductController)

router.get('/myProduct' ,guardAuth.isNotAuth, productConteller.myProductController)

router.post('/addProduct',multer({
    storage:multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null, 'assets/images')
        },
        filename:(req,file,cb)=>{
            cb(null, file.originalname)
        },
    })
}).single('image'), productConteller.postAddProduct)

router.get('/myproduct/delete/:id', guardAuth.isNotAuth, productConteller.deleteProduct)

router.get('/myproduct/update/:id', guardAuth.isNotAuth, productConteller.updateProduct)

router.post('/update' ,multer({
    storage:multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null, 'assets/images')
        },
        filename:(req,file,cb)=>{
            cb(null, file.originalname)
        },
    })
}).single('image'), guardAuth.isNotAuth, productConteller.postUpdate)


module.exports=router