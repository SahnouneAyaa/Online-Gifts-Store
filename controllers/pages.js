


exports.homeController = (req,res,next)=>{
     res.render('index',{verif:req.session.userid})
};

exports.whyController = (req,res,next)=>{
     res.render('why',{verif:req.session.userid})
};

exports.testimonialController = (req,res,next)=>{
     res.render('testimonial',{verif:req.session.userid})
};

exports.contactController = (req,res,next)=>{
     res.render('contact',{verif:req.session.userid})
};
