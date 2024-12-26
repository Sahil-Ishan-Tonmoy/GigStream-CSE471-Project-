const express =require ('express')
const{ get_all_reviews }= require('../controllers/review.controller')
const router = express.Router()



router.get('/', get_all_reviews)



module.exports = router