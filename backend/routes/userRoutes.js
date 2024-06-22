import express from 'express';
const router=express.Router();
import {createUser,login,logoutCurrentUser} from'../controllers/userController.js'

router.route('/').post(createUser)
router.post('/auth',login)
router.post('/logout',logoutCurrentUser)

export default router