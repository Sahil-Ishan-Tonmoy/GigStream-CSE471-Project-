const express =require ('express')
const{get_all_notification, delete_notification}= require('../controllers/notification.controller')
const router = express.Router()

router.get('/:role/:id', get_all_notification)
router.delete('/:role/:nid',delete_notification)





module.exports = router