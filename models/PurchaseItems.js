import mongoose from "mongoose";
import People from "./People.js";

const { Schema, model } = mongoose;

const purchaseItemSchema = new Schema({
  imageFolderUrl: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  isService: {
    type: Boolean,
    required: true,
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: "People",
    required: true,
  },
  unit: {
    type: String,
    enum: [
      "Hours",
      "Kilos",
      "Grams",
      "Meters",
      "Feets",
      "Bags",
      "Rolls",
      "Sheets",
      "Visits",
      "Sessions",
      "Deliveries",
    ],
  },
  rate: {
    type: Number,
  },
  description: {
    type: String,
  },
  account: {
    type: String,
    required: true,
  },
  tax: {
    type: String,
    enum: [
      "None",
      "Exempt-IGST-0",
      "IGST-0",
      "IGST-0.25",
      "IGST-3",
      "IGST-5",
      "IGST-6",
      "IGST-12",
      "IGST-18",
      "IGST-28",
      "Exempt-GST-0",
      "GST-0",
      "GST-0.25",
      "GST-3",
      "GST-5",
      "GST-6",
      "GST-12",
      "GST-18",
      "GST-28",
    ],
  },
  HSN: {
    type: String,
  },
  SAC: {
    type: String,
  },
});

const PurchaseItem = model("PurchaseItem", purchaseItemSchema);

export default PurchaseItem;
