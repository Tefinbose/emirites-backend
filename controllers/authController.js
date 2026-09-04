const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username,email,password);
    
    // check the user is already exists
    const isUserExist = await User.findOne({ email });
    console.log(isUserExist);
    

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword);
    
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedpassword,
    });
    
   return  res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};
// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    //compare password
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    // create jwt
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    return res.status(200).json({
      message: "Login successfull",token,
      user:user.email,
      role:user.role
    });
  } catch (error) {
    return res.status(500).json({
        message:"Login failed",error:error.message
    })
  }
};

module.exports = {
    login,
    register
};
