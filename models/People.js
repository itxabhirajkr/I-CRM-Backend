import mongoose from "mongoose";

const { Schema, model } = mongoose;

const peopleSchema = new Schema({
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
      additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Profile",
      },
      image: {
        type: String,
      },
  
      // Add timestamps for when the document is created and last modified
    
  nature: {
    type: String,
    enum: [
      "CONTRACTOR",
      "INDEPENDENT_CONTRACTOR",
      "WORKER_UNDER_CONTRACTOR",
      "EMPLOYEE",
      "REFERRAL_PARTNER",
    ],
    required: true,
  },
  contractorId: {
    type: Schema.Types.ObjectId,
    required: function () {
      return this.nature === "WORKER_UNDER_CONTRACTOR";
    },
  },
  workEmail: {
    type: String,
    required: true,
  },
  personalEmail: {
    type: String,
    required: false,
  },
  billingEmail: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  officialName: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    enum: ["Engineering", "Sales", "OutsideInzint"],
    required: true,
  },
  employeeId: {
    type: String,
    required: function () {
      return this.nature === "EMPLOYEE";
    },
  },
  commissionOnInvoice: {
    type: Number,
    default: 0,
  },
  hourlyRate: {
    type: Number,
    required: function () {
      return ["INDEPENDENT_CONTRACTOR", "WORKER_UNDER_CONTRACTOR"].includes(
        this.nature
      );
    },
  },
  tdsRate: {
    type: Number,
    required: function () {
      return ["INDEPENDENT_CONTRACTOR", "WORKER_UNDER_CONTRACTOR"].includes(
        this.nature
      );
    },
  },
  businessName: String,
  GSTIN: String,
  gstRate: Number,
  pan: {
    type: String,
    required: function () {
      return this.nature !== "REFERRAL_PARTNER";
    },
  },
  bankAccountNumber: String,
  ifscCode: String,
  paymentChannel: {
    type: String,
    enum: [
      "Domestic Bank Transfer",
      "International Bank Transfer",
      "Via Third Party",
    ],
    required: false,
  },
  paymentMode: {
    type: String,
    enum: ["International Wire", "Wise", "NEFT", "Cheque", "Cash"],
    required: false,
  },
  panUrl: String,
  aadhaarFrontUrl: String,
  aadhaarBackUrl: String,
  passportUrl: String,
  agreementUrl: String,
  tncUrl: String,
  gstCertificateUrl: String,
  businessNameProofUrl: String,
  bankStatementFolderUrl: String,
  invoiceFolderUrl: String,
  form16FolderUrl: String,
},
{ timestamps: true }
);

const People = model("People", peopleSchema);

export default People;
