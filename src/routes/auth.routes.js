const {Router} = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = Router()

/**
 * @route POST/ api/auth/register
 * @description  Register new user
 * @access Public
 */

authRouter.post('/register',authController.registerUser)

/**
 * @route POST/ api/auth/login
 * @description  Login user with email,password
 * @access Public
 */
authRouter.post('/login',authController.loginUser)

/**
 * @route GET/ api/auth/logout
 * @description  Logout user by clearing the token cookie
 * @access Public
 */

authRouter.get('/logout',authController.logoutUser)



module.exports = authRouter;