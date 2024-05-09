import mongoose from "mongoose";
import ServiceAgreement from "./serviceAgreementModel.js";

const { Schema, model } = mongoose;

const clientSchema = new Schema({
  acquisitionPersonId: {
    type: Schema.Types.ObjectId,
    ref: "People",
    required: false,
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
  businessName: String,
  customerDisplayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  primaryContactNumber: {
    type: String,
    required: true,
  },
  secondaryContactNumber: String,
  GSTTreatment: {
    type: String,
    enum: [
      "Registered",
      "Registered – Composition",
      "Unregistered",
      "Consumer",
      "Overseas",
      "SEZ",
    ],
    required: true,
  },
  placeOfSupply: {
    type: String,
    required: true,
  },
  taxPreference: {
    type: String,
    enum: ["Taxable", "Tax Exempt"],
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
  },
  enablePortal: {
    type: String,
    enum: ["YES", "NO"],
    required: true,
  },
  nestedFields: [
    {
      type: Schema.Types.ObjectId,
      ref: "ServiceAgreement",
    },
  ],
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
  },
  receivingAccount: {
    type: String,
    enum: ["IOB_1173", "IDFC_3481", "ICIC_XXX"],
  },
  receivingCurrency: {
    type: String,
    enum: ["INR", "OTH"],
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
});

const Client = model("Client", clientSchema);

export default Client;
