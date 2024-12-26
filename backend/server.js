PORT=4000
const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser")

//express app
const app = express()
const mongoose = require('mongoose')
const loginRoutes = require('./routes/login.route')
const signupRoutes = require('./routes/signup.route')
const profileRoutes = require('./routes/profile.route')
const forgetpassRoutes= require('./routes/forgetpass.route')
const postgigRoutes = require('./routes/post-gig.route')
const showgigRoutes = require('./routes/show-gig.route')
const createReviewRoutes =require('./routes/create-review.route')
const showReviewRoutes =require('./routes/show-review.route')
const chatboxRoutes =require('./routes/chatbox.route')
const searchRoutes =require('./routes/search.route')
const applicationRoutes =require('./routes/application.route')
const savedGigRoutes =require('./routes/saved-gig.route')

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(bodyParser.json());
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/login',loginRoutes)
app.use('/signup',signupRoutes)
app.use('/profile',profileRoutes)
app.use('/post-gig',postgigRoutes)
app.use('/show-gig',showgigRoutes)
app.use("/forgot-password", forgetpassRoutes)
app.use('/create-review',createReviewRoutes)
app.use('/show-review',showReviewRoutes)
app.use('/chatbox',chatboxRoutes)
app.use('/search',searchRoutes)
app.use('/application',applicationRoutes)
app.use('/saved-gig',savedGigRoutes)

//connect to db
const URI= 'mongodb+srv://GigStream:Gig12345@cluster0.v15qa.mongodb.net/GigStream?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(URI)
.then(()=>{
    console.log('Connected to DB')
})
.catch((error)=>{
    console.log(error)
})

//listen
app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`)

})

