import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
// import mailSender from "../utils/mailSender";
// import { passwordUpdated } from "../mail/templates/passwordUpdate";
import User from "../models/User.js";
// import OTP from "../models/OTP";
import Profile from "../models/Profile.js";
import dotenv from "dotenv";

dotenv.config();
export const fakeApi = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "OK",
    });
  } catch (error) {
    console.log(error);
  }
};

// Signup Controller for Registering Root User
export const signupRootUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, userType } =
      req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    // if (response.length === 0 || otp !== response[0].otp) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "The OTP is not valid",
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const approved = accountType === "Instructor" ? false : true;
    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      // approved,
      additionalDetails: profileDetails._id,
      image: "",
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch users",
      error: error.message,
    });
  }
};
export const getManagers = async (req, res) => {
  try {
    const managers = await User.find({ userType: "PROJECT_MANAGER" });
    return res.status(200).json({
      message: "Users retrieved successfully",
      managers: managers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch users",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    // Check if the user creating the account is a root user
    // if (req.user.userType !== 'ROOT') {
    //   return res.status(403).json({ message: 'Only ROOT user can create accounts' });
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      userType,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login controller for authenticating users
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: `Please Fill up All the Required Fields`,
//       });
//     }

//     // const user = await User.findOne({ email }).populate("additionalDetails");
//     const user = await User.findOne({ email }).populate("additionalDetails");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: `User is not Registered with Us Please SignUp to Continue`,
//       });
//     }

//     if (await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign(
//         { email: user.email, id: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "24h",
//         }
//       );

//       user.token = token;
//       user.password = undefined;

//       const options = {
//         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//       };

//       res.cookie("token", token, options).status(200).json({
//         success: true,
//         token,
//         user,
//         message: `User Login Success`,
//       });
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: `Password is incorrect`,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: `Login Failure Please Try Again`,
//     });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, userType: user.userType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;

      await user.save();

      return res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
        },
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

// Send OTP For Email Verification
// export const sendotp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const checkUserPresent = await User.findOne({ email });

//     if (checkUserPresent) {
//       return res.status(401).json({
//         success: false,
//         message: `User is Already Registered`,
//       });
//     }

//     let otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     let result = await OTP.findOne({ otp });

//     while (result) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//       });

//       result = await OTP.findOne({ otp });
//     }

//     const otpPayload = { email, otp };
//     await OTP.create(otpPayload);

//     res.status(200).json({
//       success: true,
//       message: `OTP Sent Successfully`,
//       otp,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };

// Controller for Changing Password
// export const changePassword = async (req, res) => {
//   try {
//     const userDetails = await User.findById(req.user.id);

//     const { oldPassword, newPassword } = req.body;

//     const isPasswordMatch = await bcrypt.compare(
//       oldPassword,
//       userDetails.password
//     );
//     if (!isPasswordMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "The password is incorrect" });
//     }

//     const encryptedPassword = await bcrypt.hash(newPassword, 10);
//     await User.findByIdAndUpdate(
//       req.user.id,
//       { password: encryptedPassword },
//       { new: true }
//     );

//     try {
//       await mailSender(
//         userDetails.email,
//         "Password for your account has been updated",
//         passwordUpdated(
//           userDetails.email,
//           `Password updated successfully for ${userDetails.firstName} ${userDetails.lastName}`
//         )
//       );
//     } catch (error) {
//       console.error("Error occurred while sending email:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error occurred while sending email",
//         error: error.message,
//       });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error occurred while updating password:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error occurred while updating password",
//       error: error.message,
//     });
//   }
// };
