const authModel=require('../models/auth')



exports.postRegister=(req,res,next)=>{
    
    authModel.registerModel(req.body.name,req.body.email,req.body.password).then((user)=>{
        res.redirect('/login')
    }).catch((err)=>{
        req.flash('error', err)
        res.redirect('/register')
    })

}


exports.getRegister=(req,res,next)=>{
    
    res.render('register',{verif:req.session.userid, message : req.flash('error')[0]})

}




exports.postLogin=(req,res,next)=>{
    
    authModel.loginModel(req.body.email,req.body.password).then((id)=>{
        req.session.userid=id
        res.redirect('/')
    }).catch((err)=>{
        req.flash('error', err)
        res.redirect('/login')
    })

}

exports.getLogin=(req,res,next)=>{
    res.render('login',{verif:req.session.userid,message : req.flash('error')[0]})
}



exports.logoutController=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}