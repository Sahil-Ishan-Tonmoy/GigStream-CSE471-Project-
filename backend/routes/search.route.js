const express =require ('express')
const{ get_all_employees }= require('../controllers/search.controller')
const router = express.Router()

router.get('/', get_all_employees)





module.exports = router