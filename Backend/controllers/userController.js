import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GENERATE A TOKEN JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER FUNCTION
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECK IF USER ALREADY EXISTS
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // FIXED password length check
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be of atleast 8 characters",
        });
    }

    // HASHING PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// LOGIN FUNCTION
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    res.status(201).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      token: generateToken(existingUser._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// GET USER PROFILE FUNCTION
export const getUserProfile = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user.id).select("-password");
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(existingUser);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
