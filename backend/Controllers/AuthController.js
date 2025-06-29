import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if user already exists

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    //hash password
    userModel.password = await bcrypt.hash(password, 10);
    // save user
    await userModel.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists

    const user = await UserModel.findOne({ email });
    const errorMessage =
      "Authentication failed: email or password is incorrect";
    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id }, // Fixed typo here (user._id instead of user_id)
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error)
  }
};

export { signup, login };
