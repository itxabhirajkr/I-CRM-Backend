
// import mailSender from "../utils/mailSender";
// import { passwordUpdated } from "../mail/templates/passwordUpdate";
import People from "../models/People.js";
// import OTP from "../models/OTP";


export const fakeApi = async (req,res)=> {
  try {
     return res.status(200).json({
      success: true,
      message: "OK",
    });; 
  } catch (error) {
     console.log(error)
  }
}


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
