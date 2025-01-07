const express =require ('express')
const{ get_all_employees, get_all_gigs }= require('../controllers/search.controller')
const router = express.Router()

router.get('/employee', get_all_employees)

router.get('/gig', get_all_gigs)





module.exports = router