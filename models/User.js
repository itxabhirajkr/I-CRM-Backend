import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the user schema using the Mongoose Schema constructor
const userSchema = new Schema(
  {
    // Define the name field with type String, required, and trimmed
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: [
        "ROOT",
        "SALES_MANAGER",
        "HR",
        "PROJECT_MANAGER",
        "CLIENT",
        "REFERRAL_PARTNER",
        "FINANCE_MANAGER",
        "CONTRACTOR",
      ],
      required: true,
    },

    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },

    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
const User = model("User", userSchema);

export default User;
