const express =require ('express')
const{get_all_Applicants_by_gig_title, create_new_gig, get_all_posted_gigs_by_user}= require('../controllers/gig.controller')
const router = express.Router()



router.post('/post', create_new_gig)
router.get('/', get_all_posted_gigs_by_user)
router.get('/applicants/:title', get_all_Applicants_by_gig_title)



module.exports = router