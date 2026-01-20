import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Fill Complete Details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT__SECRET);
    console.log("JWT SECRET:", process.env.JWT__SECRET);
    res.json({ success: true, token, user: {name: user.name } });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Does'nt Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT__SECRET);
      return res.json({
        success: true,
        token,
        user: { name: user.name, id: user._id },
      });
    } else {
      return res.json({ success: false, message: "Invalid Credintial" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
    try {
      const { userId } = req.body;
      console.log("req.body:", req.body);
  
      if (!userId) {
        return res.json({ success: false, message: "userId is required" });
      }
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
  
      res.json({
        success: true,
        credits: user.creditsBalance,
        user: { name: user.name },
      });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
export { registerUser, loginUser, userCredits };
