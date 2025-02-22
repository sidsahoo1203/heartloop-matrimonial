import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true
    })
    .json({
      success: true,
      message,
      user,
    });
};

export const deleteToken = (res, message) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0),
    })
    .json({
      success: true,
      message,
    });
};
