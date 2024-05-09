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
});

const Client = model("Client", clientSchema);

export default Client;
