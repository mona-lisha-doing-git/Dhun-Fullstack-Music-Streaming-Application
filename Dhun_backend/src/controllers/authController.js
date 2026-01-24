import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

/* ================= SIGN UP ================= */
export const signup = async (req, res) => {
  try {
    const { name, phone, password, securityAnswer } = req.body;

    if (!name || !phone || !password || !securityAnswer) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(securityAnswer, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      securityAnswer: hashedAnswer
    });

    res.status(201).json({
      message: "Account created",
      user: { id: user._id, name: user.name, phone: user.phone }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, phone: user.phone }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============ FORGOT PASSWORD (VERIFY ANSWER) ============ */
export const forgotPassword = async (req, res) => {
  try {
    const { phone, securityAnswer } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isCorrect = await bcrypt.compare(
      securityAnswer,
      user.securityAnswer
    );

    if (!isCorrect) {
      return res.status(400).json({ message: "Incorrect answer" });
    }

    res.json({ message: "Answer verified" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============ RESET PASSWORD ============ */
export const resetPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { phone },
      { password: hashedPassword }
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
