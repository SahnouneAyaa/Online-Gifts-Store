const express= require('express')
const path=require('path')
const routerAuth=require('./routers/auth')
const productRouter=require('./routers/product')
const session=require('express-session')
const mongodbSession=require('connect-mongodb-session')(session)
const pagesRouter=require('./routers/pages')
const flash=require('connect-flash')



const app = express()



app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')


var store=new mongodbSession({
    uri:'mongodb+srv://sahnouneaya18:BLQXEyYOmRUB1spH@cluster0.gbqy8bv.mongodb.net/',
    collection:'sessions'
})

app.use(flash())

app.use(session({
    secret:'this is my secret key',
    store:store,
    resave:true,
    saveUninitialized:true
}))


app.use('/',pagesRouter)

app.use('/',productRouter)

app.use('/',routerAuth)




app.listen(3005,()=>{
    console.log('the server is connected')
})