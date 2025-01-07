const express =require ('express')
const{ get_all_reviews }= require('../controllers/review.controller')
const router = express.Router()



router.get('/:id/:employeeId', get_all_reviews)



module.exports = router