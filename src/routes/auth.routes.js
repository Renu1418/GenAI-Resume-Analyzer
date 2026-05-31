const {Router} = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = Router()

/**
 * @route POST/ api/auth/register
 * @description  Register user
 * @access Public
 */

authRouter.post('/register',authController.registerUser)
authRouter.post('/login',authController.loginUser)



module.exports = authRouter;