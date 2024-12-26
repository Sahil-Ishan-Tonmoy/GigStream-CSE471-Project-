const express =require ('express')
const{get_all_gigs}= require('../controllers/gig.controller')
const router = express.Router()



router.get('/', get_all_gigs)



module.exports = router