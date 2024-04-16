import mongoose from "mongoose";

const { Schema, model } = mongoose;

const peopleSchema = new Schema({
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
});

const People = model("People", peopleSchema);

export default People;
