const express =require ('express')
const{create_new_gig}= require('../controllers/gig.controller')
const router = express.Router()



router.post('/', create_new_gig)



module.exports = router