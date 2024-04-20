const router=require('express').Router()
const pagesController=require('../controllers/pages')



router.get('/' , pagesController.homeController)

router.get('/why' , pagesController.whyController)

router.get('/testimonial' , pagesController.testimonialController)

router.get('/contact' , pagesController.contactController)


module.exports=router