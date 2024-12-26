const express =require ('express')
const{
    create_application,
    get_applications_by_gig
}= require('../controllers/application.controller')
const router = express.Router()



router.post('/', create_application)

router.get('/:gig_id',get_applications_by_gig)



module.exports = router