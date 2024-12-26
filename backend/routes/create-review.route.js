const express =require ('express')
const{ create_new_review }= require('../controllers/review.controller')
const router = express.Router()



router.post('/', create_new_review)



module.exports = router