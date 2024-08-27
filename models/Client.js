import mongoose from "mongoose";

const { Schema, model } = mongoose;

const sowSchema = new Schema({
  startDate: {
    type: Schema.Types.Date,
    required: true,
  },
  endDate: {
    type: Schema.Types.Date,
    required: false,
  },
  folderUrl: {
    type: String,
    required: false,
  },
});

const clientSchema = new Schema({
  acquisitionPersonId: {
    type: Schema.Types.ObjectId,
    ref: "People",
    required: true,
  },
  primaryContactPerson: {
    type: String,
    required: true,
  },
  l2ContactPerson: String,
  billingContactPerson: {
    type: String,
    required: true,
  },
  billingToEmail: {
    type: String,
    required: true,
  },
  billingCcEmail: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  displayName: String,
  email: {
    type: String,
    required: true,
  },
  primaryContactNumber: {
    type: String,
    required: true,
  },
  secondaryContactNumber: String,
  gstTreatment: {
    type: String,
    enum: [
      "REGISTERED",
      "REGISTERED_COMPOSITION",
      "UNREGISTERED",
      "CONSUMER",
      "OVERSEAS",
      "SEZ",
    ],
    required: true,
  },
  gstin: String,
  placeOfSupply: {
    type: String,
    required: true,
    enum: [
      "OT", "AP", "AR", "AS", "BR", "CT", "GA", "GJ", "HR", "HP", "JH", "KA", "KL", "MP", "MH", "MN", "ML", "MZ", "NL", "OR", "PB", "RJ", "SK", "TN", "TG", "TR", "UP", "UK", "WB", 
      "AN", "CH", "DH", "DL", "JK", "LA", "LD", "PY"
    ],
  },
  taxPreference: {
    type: String,
    enum: ["TAXABLE", "TAX_EXEMPT"],
    required: true,
  },
  currency: {
    type: String,
    enum: ["USD"],
    required: true,
  },
  openingBalance: {
    type: Number,
    default: 0,
    required: true,
  },
  serviceAgreementsFolderUrl: {
    type: String,
    required: true,
  },
  ndaFolderUrl: String,
  serviceStartDate: {
    type: Schema.Types.Date,
    required: true,
  },
  serviceEndDate: {
    type: Schema.Types.Date,
    required: false,
  },
  sows: [sowSchema],
  paymentTerms: {
    type: String,
    enum: ["DUE_ON_RECEIPT", "NET30"],
    required: true,
  },
  source: {
    type: String,
    enum: [
      "UPWORK",
      "LINKEDIN",
      "EXTERNAL_LEAD",
      "SUBSIDIARY",
      "REFERRENCE",
      "ZOOMINFO",
      "PERSONAL_NETWORK",
    ],
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "People",
    required: true,
  },
  address: String,
  country: String,
  paymentChannel: {
    type: String,
    enum: [
      "WISE",
      "WISE_ACH",
      "XE",
      "UPWORK",
      "AIRWALLEX",
      "PAYPAL",
      "INTERNATIONAL_WIRE",
      "NEFT/UPI",
      "CHEQUE_INR",
      "CASH_INR",
      "CASH_USD",
    ],
    required: true,
  },
  receivingAccount: {
    type: String,
    enum: ["IOB_1173", "IDFC_3481", "ICIC_XXX"],
    required: true,
  },
  receivingCurrency: {
    type: String,
    enum: ["INR", "OTH"],
    required: true,
  },
  invoicePrefix: String,
  invoiceFrequency: {
    type: String,
    enum: [
      "WEEKLY_EVERY_MONDAY",
      "MONTHLY_DAY_AFTER_LAST_SUNDAY",
      "MONTHLY_DAY_AFTER_FIRST_SUNDAY",
      "MONTHLY_DAY_AFTER_THIRD_SUNDAY",
      "MONTHLY_DAY_AFTER_FOURTH_SUNDAY",
      "MONTHLY_DAY_AFTER_SECOND_SUNDAY",
      "FORTNIGHTLY_FIRST_AND_THIRD_MONDAY",
      "FORTNIGHTLY_SECOND_AND_FOURTH_MONDAY",
      "FORTNIGHTLY_MONDAY_EVEN_WEEKS",
      "FORTNIGHTLY_MONDAY_ODD_WEEKS",
    ],
  },
  invoiceDelivery: {
    type: String,
    enum: ["AUTOMATIC_TO_EMAIL", "AUTOMATIC_VIA_ASANA", "MANUAL"],
  },
  invoiceFollowupPlan: {
    type: String,
    enum: ["7_15", "15_20", "25_30"],
  },
  invoiceDisplayCurrencies: {
    type: [String],
    enum: ["AUD", "NZD", "INR"],
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Client = model("Client", clientSchema);

export default Client;
