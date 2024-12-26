const express =require ('express')
const{
    create_fav_gig,
    get_savedGigs
}= require('../controllers/saved-gig.controller')
const router = express.Router()



router.post('/', create_fav_gig)

router.get('/',get_savedGigs)



module.exports = router