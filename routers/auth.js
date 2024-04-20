const route=require('express').Router()
const authController=require('../controllers/auth')
const body=require('express').urlencoded({extended:true})
const guardAuth=require('./guardAuth')

route.get('/register',guardAuth.isAuth,authController.getRegister)
route.post('/register',body,authController.postRegister)


route.get('/login',guardAuth.isAuth,authController.getLogin)
route.post('/login',body,authController.postLogin)

route.post('/logout',authController.logoutController)


module.exports=route