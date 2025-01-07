const express =require ('express')
const{create_new_Message,
    get_all_Messages }= require('../controllers/chatbox.controller')
const router = express.Router()



router.post('/', create_new_Message)

router.get('/', get_all_Messages )

module.exports = router