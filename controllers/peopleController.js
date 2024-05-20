import People from "../models/People.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import APIFeatures from "../utils/apiFeatures.js";
import Profile from "../models/Profile.js";
import dotenv from "dotenv";

dotenv.config();
// Signup Controller for Registering Root User
export const signupRootUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userType,
    } = req.body;

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

    const existingUser = await People.findOne({ email });
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
      })
    const user = await People.create({
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

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    // Check if the user creating the account is a root user
    // if (req.user.userType !== 'ROOT') {
    //   return res.status(403).json({ message: 'Only ROOT user can create accounts' });
    // }

    const existingUser = await People.findOne({ email });
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

    const user = await People.findOne({ email }).populate("additionalDetails");

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

// Create a new person
async function createPerson(req, res) {
  try {
    const person = new People(req.body);
    const result = await person.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all people
// async function getPeople(req, res) {
//   try {
//     const people = await People.find();
//     res.json(people);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

const getPeople = async (req, res, next) => {
  try {
    const features = new APIFeatures(People.find(), req.query)
      // .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const people = await features.query;

    res.status(200).json({
      status: "success",
      results: people.length,
      data: {
        people,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific person by ID
async function getPersonById(req, res) {
  try {
    const person = await People.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a person by ID
async function updatePerson(req, res) {
  try {
    const person = await People.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a person by ID
async function deletePerson(req, res) {
  try {
    const person = await People.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createPerson, getPeople, getPersonById, updatePerson, deletePerson };
