const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * @name registerUser
 * @description Register a new user, expects name, email and password in the request body
 * @access public
 */
  
   //user registration 
  async function registerUser(req, res){
    try{
        const {username, email, password} = req.body

        if(!username || !email || !password){
            return res.status(400).json({message: "Please provide name, email and password"})
        }
        // check if user already exists with the same email or username
        const isUserExist = await userModel.findOne({
            $or: [{email},{username}]
        })
        
        // if user exists already then return error res
        if(isUserExist){
            res.status(400).json({message: "User already exists"})
                }
        
        // hashing password
        const hash = await bcrypt.hash(password, 10)
         
        // user creation in database
        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        // created a jwt token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
       
        res.cookie("token", token)

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
            })


    }

    catch(err){
        console.log("an error caught",err)
    }
}



// user login
  /**
   * @name loginUser
   * @description Login user, expects email and password in the request body
   * @access public
   */
   
  async function loginUser(req, res){
       
    const{email,password} = req.body
    
    if(!email || !password){
        return res.status(400).json({message: "Please provide email and password"})
    }

    const user = await userModel.findOne({
        $or:[{email}]
    })

    if(!user){
        return res.status(400).json({message: "Invalid credentials"})
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid credentials"})
    }

    // created a jwt token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
       
        res.cookie("token", token)

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

  }


  


module.exports = {registerUser,loginUser}