
const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });





//express app
const app = express()
const mongoose = require('mongoose')

//Routes    
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
const DetailsRoutes =require('./routes/details.route')
const ApplyRoutes =require('./routes/application.route')
const SavedRoutes= require('./routes/saved-gig.route')
const NotificationRoutes= require('./routes/notification.route')

//middleware
app.use(express.json())

app.use(cors({
    origin: process.env.Origin, // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(bodyParser.json());
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/uploads/:filename', (req, res, next) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath, filename, (err) => {
      if (err) {
        console.log('Error downloading file:', err);
        res.status(500).send('File not found');
      }
      next();
    });
  });


//routes
app.use('/login',loginRoutes)
app.use('/signup',signupRoutes)
app.use('/profile',profileRoutes)
app.use('/gig',postgigRoutes)
app.use('/show-gig',showgigRoutes)
app.use("/forgot-password", forgetpassRoutes)
app.use('/create-review',createReviewRoutes)
app.use('/show-review',showReviewRoutes)
app.use('/chatbox',chatboxRoutes)
app.use('/search',searchRoutes)
app.use('/application',applicationRoutes)
app.use('/saved-gig',savedGigRoutes)
app.use('/search/:role/:id/details/', DetailsRoutes);
app.use('/apply', ApplyRoutes);
app.use('/saved-gigs', SavedRoutes);
app.use('/set-favourite',savedGigRoutes)
app.use('/notifications',NotificationRoutes)



//connect to db

mongoose.connect(process.env.URI)
.then(()=>{
    console.log('Connected to DB')
})
.catch((error)=>{
    console.log(error)
})

//listen
app.listen(process.env.PORT, ()=> {
    console.log(`listening to port ${process.env.PORT}`)

})

