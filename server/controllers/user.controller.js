import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { unlink } from "node:fs/promises";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedpassword,
    });

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't match",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
// old logout controller implementation
// export const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged Out Successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to logout",
//     });
//   }
// };

// new logout controller implementation

export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      })
      .json({
        message: "Logged Out Successfully.",
        success: true,
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    // console.log("aagaya bhai");
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "enrolledCourses",
        populate: {
          path: "creator",
          select: "name photoUrl",
        },
      });
    if (!user) {
      return res.status(404).json({
        message: "User Profile Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Load User",
    });
  }
};

// old updateProfile controller
// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { name } = req.body;
//     const profilePhoto = req.file;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         message: "User Not Found",
//         success: false,
//       });
//     }

//     let photoUrl = user.photoUrl;

//     // If new profile photo uploaded
//     if (profilePhoto) {
//       // Delete old image from cloudinary
//       if (user.photoUrl) {
//         const publicId = user.photoUrl.split("/").pop().split(".")[0];

//         await deleteMediaFromCloudinary(publicId);
//       }

//       // Upload new image
//       const cloudResponse = await uploadMedia(profilePhoto.path);

//       photoUrl = cloudResponse.secure_url;
//     }

//     const updatedData = {
//       name,
//       photoUrl,
//     };

//     const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     }).select("-password");

//     return res.status(200).json({
//       success: true,
//       user: updatedUser,
//       message: "Profile updated successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to Update User Profile",
//     });
//   }
// };

// new updateProfile controller implementation

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    let photoUrl = user.photoUrl;

    // If new profile photo uploaded
    if (profilePhoto) {
      // Delete old image from cloudinary
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];

        await deleteMediaFromCloudinary(publicId);
      }

      // Upload new image
      const cloudResponse = await uploadMedia(profilePhoto.path);

      photoUrl = cloudResponse.secure_url;
    }

    const updatedData = {
      name,
      photoUrl,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Update User Profile",
    });
  } finally {
    if (req.file?.path) {
      await unlink(req.file.path).catch((err) => {
        console.log("Temporary file cleanup failed:", err);
      });
    }
  }
};
