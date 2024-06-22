import User from "../models/userModel.js";
import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, isTeacher } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isTeacher,
  });
  try {
    const savedUser = await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isTeacher: savedUser.isTeacher,
    });
  } catch (err) {
    res.status(400);
    throw new Error(`invalid Student data ${err.message}`);
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isTeacher: existingUser.isTeacher,
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out Successfully" });
});

export { createUser, login, logoutCurrentUser };
