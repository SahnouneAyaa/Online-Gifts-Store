require('dotenv').config();
const mongoose=require('mongoose')


var schemaProduct =mongoose.Schema(
    {
        name:String,
        price:Number,
        img:String,
        userid:String
    }
)

var Product=mongoose.model('products',schemaProduct)

var url= process.env.MONGODB

exports.getAllProducts=()=>{

    return new Promise((res,rej)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then( ()=>{
         return Product.find({})
        }).then((products)=>{
            console.log('data connected')
            mongoose.disconnect()
            res(products)
        }).catch(err =>{
            console.log('fail to connect with database')
            mongoose.disconnect('Error connecting to MongoDB:', err)
            rej(err)
        })   
    })
}



exports.getProductDetails=(id)=>{

    return new Promise((res,rej)=>{
        mongoose.connect(url).then( ()=>{
         return Product.findOne({_id:id})
        }).then((product)=>{
            console.log('item found')
            mongoose.disconnect()
            res(product)
        }).catch(err =>{
            mongoose.disconnect('Error connecting to MongoDB:', err)
            rej(err)
        })   
    })
}


exports.postAddProduct=(name,price,img,userid)=>{
    console.log(img)
    return new Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{
            let product = new Product({
                name:name,
                price:price,
                img:img,
                userid:userid
            })
            console.log('saved')
            return product.save()
        }).then(()=>{
            mongoose.disconnect()
            res('Added !')
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
}


exports.getMyProducts=(userid)=>{

    return new Promise((res,rej)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then( ()=>{
         return Product.find({userid:userid})
        }).then((products)=>{
            mongoose.disconnect()
            res(products)
        }).catch(err =>{
            mongoose.disconnect('Error connecting to MongoDB:', err)
            rej(err)
        })   
    })
}


exports.deleteProduct=(id)=>{

    return new Promise((res,rej)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then( ()=>{
         return Product.deleteOne({_id:id})
        }).then(()=>{
            mongoose.disconnect()
            res(true)
        }).catch(err =>{
            mongoose.disconnect('Error connecting to MongoDB:', err)
            rej(err)
        })   
    })
}


exports.updateProduct=(id)=>{

    return new Promise((res,rej)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then( ()=>{
         return Product.findOne({_id:id})
        }).then((product)=>{
            mongoose.disconnect()
            res(product)
        }).catch(err =>{
            mongoose.disconnect('Error connecting to MongoDB:', err)
            rej(err)
        })   
    })
}


exports.postUpdate=(name,price,img,id)=>{
    return new Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{
            return Product.updateOne({_id:id},{name:name,price:price,img:img})
        }).then(()=>{
            mongoose.disconnect()
            res(true)
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
}