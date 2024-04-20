

exports.isAuth=(req,res,next)=>{
    if(req.session.userid){
        res.redirect('/')
    }else{
        next()
    }
}

exports.isNotAuth=(req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/')
    }else{
        next()
    }
}
