const productModel=require('../models/product')


exports.productController = (req,res,next)=>{
    productModel.getAllProducts().then((products)=>{
        res.render('shop',{products : products,verif:req.session.userid})
    })
}


exports.productDetailsController = (req,res,next)=>{
    productModel.getProductDetails(req.params.id).then((product)=>{
        res.render('productDetails',{productItem:product,verif:req.session.userid})
    })
}

exports.addProductController = (req,res,next)=>{
    res.render('addProducts',{verif:req.session.userid, successMessage:req.flash('successMessage')[0],failMessage:req.flash('failMessage')[0]})
};

exports.postAddProduct= (req, res, next) =>{
       productModel.postAddProduct(req.body.name,req.body.price,req.file.filename,req.session.userid).then((msg)=>{
          console.log(req.file.filename)
          req.flash('successMessage', msg)
          res.redirect('/addProduct')
       }).catch((err)=>{
          req.flash('failMessage', err)
          res.redirect('/addProduct')
       })
}

exports.myProductController = (req,res,next)=>{
    productModel.getMyProducts(req.session.userid).then((products)=>{
        res.render('myProducts',{verif:req.session.userid,myproducts:products})

    })
};


exports.deleteProduct=(req,res,next)=>{
    id=req.params.id

    productModel.deleteProduct(id).then((verif)=>{
        console.log(verif)
        res.redirect('/myProduct')
    }).catch((err)=>{
        console.log(err)
    })
}


exports.updateProduct=(req,res,next)=>{

    productModel.updateProduct(req.params.id).then((product)=>{
        res.render('update',{verif:req.session.userid,productUpdate:product})
    }
     
    )
}


exports.postUpdate=(req, res, next) =>{

    if(req.file){
        productModel.postUpdate(req.body.name,req.body.price,req.file.filename,req.body.productId).then(()=>{
            res.redirect('/myProduct')
         }).catch((err)=>{
            res.redirect('/myProduct')
         })
    }else{
        productModel.postUpdate(req.body.name,req.body.price,req.body.oldimg,req.body.productId).then(()=>{
            res.redirect('/myProduct')
         }).catch((err)=>{
            res.redirect('/myProduct')
         })
    }
    
}
