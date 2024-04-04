import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceAgreementSchema = new Schema({
  serviceAgreementsFolderUrl: String,
  SOWFolderUrl: String,
  NDAFolderUrl: String,
  serviceStartDate: Date,
  serviceEndDate: Date,
  sowStartDate: Date,
  sowEndDate: Date,
  paymentTerms: {
    type: String,
    enum: ["Due of Receipt", "NET30"],
    required: true,
  },
});

const ServiceAgreement = model("ServiceAgreement", serviceAgreementSchema);

export default ServiceAgreement;
