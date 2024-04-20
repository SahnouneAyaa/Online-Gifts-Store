const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
require('dotenv').config();



var schemaAuth= mongoose.Schema({
    name:String,
    email:String,
    password:String,
})


var users=mongoose.model('users',schemaAuth)
var url= process.env.MONGODB

exports.registerModel=(name,email,password)=>{

    return new Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{

            return users.findOne({email:email})
    
        }).then((user)=>{
            if(user){
                mongoose.disconnect()
                rej('email is used')
            } else {
                return bcrypt.hash(password, 10)
            }
        }).then((hpassword)=>{
            let user = new users({
                name:name,
                email:email,
                password:hpassword
            })
            return user.save()
        }).then(()=>{
            mongoose.disconnect()
            res('registred !')
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
}



exports.loginModel=(email,password)=>{

    return new Promise((res,rej)=>{
        mongoose.connect(url).then(()=>{

            return users.findOne({email:email})
    
        }).then((user)=>{
            if(user){
                bcrypt.compare(password, user.password).then((verif)=>{
                    if(verif){
                        mongoose.disconnect()
                        res(user._id)
                    }else{
                        mongoose.disconnect()
                        rej('invalid password')
                    }
                })
            } else {
                mongoose.disconnect()
                rej('we don\'t have this user' )
            }
        }).catch((err)=>{
            mongoose.disconnect()
            rej(err)
        })
    })
}