const express =require ('express')
const{
    create_fav_gig,
    get_savedGigs,
    is_saved
}= require('../controllers/saved-gig.controller')
const router = express.Router()



router.put('/:gigId/:id/:status', create_fav_gig)
router.get('/:id',get_savedGigs)
router.get('/:gigId/:id',is_saved)





module.exports = router