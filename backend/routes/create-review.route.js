const express =require ('express')
const{ add_or_update_review, create_new_review }= require('../controllers/review.controller')
const router = express.Router()



router.put('/:id/:employeeId', add_or_update_review)



module.exports = router