import mongoose from "mongoose";

const { Schema, model } = mongoose;
// Schema for Services
const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fromDate: Date,
  toDate: Date,
  mileStone: {
    type: String,
    required: function() {
      return !this.fromDate || !this.toDate;
    }
  },
  hours: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  discountPercent: Number,
  discountAmount: {
    type: Number,
    required: function() {
      return this.discountPercent == null;
    }
  },
  SAC: {
    type: String,
    enum: [
      '998311',
      '998312',
      '998313',
      '998314',
      '9983'
    ],
    required: true
  },
  timeTrackerReportUrl: {
    type: String,
    required: function() {
      return this.SAC === 'XX13' || this.SAC === 'XX14';
    }
  },
  taxableAmount: {
    type: Number,
    required: true
  },
  sgstRate: {
    type: String,
    enum: ['Nil', '9'],
    required: true
  },
  sgstAmount: {
    type: Number,
    required: true
  },
  cgstRate: {
    type: String,
    enum: ['Nil', '9'],
    required: true
  },
  cgstAmount: {
    type: Number,
    required: true
  },
  igstRate: {
    type: String,
    enum: ['Nil', '18'],
    required: true
  },
  igstAmount: {
    type: Number,
    required: true
  }
});

// Schema for Adjustments
const adjustmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

// Main Schema
const invoiceSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', 
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  serialNumber: {
    type: Number,
    required: true,
    unique: true,
    default: async function() {
      const lastInvoice = await this.constructor.findOne().sort({ serialNumber: -1 });
      return lastInvoice ? lastInvoice.serialNumber + 1 : 1;
    }
  },
  number: {
    type: String,
    required: true
  },
  poNumber: String,
  date: {
    type: Date,
    required: true
  },
  serviceFromDate: Date,
  serviceToDate: Date,
  mileStones: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length > 0 || (this.serviceFromDate && this.serviceToDate);
      },
      message: 'Either mileStones or serviceFromDate & serviceToDate is required'
    }
  },
  serviceDays: {
    type: Number,
    required: true,
    default: function() {
      if (this.serviceFromDate && this.serviceToDate) {
        const diffTime = Math.abs(this.serviceToDate - this.serviceFromDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      return 0;
    }
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentLink: String,
  preparedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'People',
    required: true
  },
  reviewedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'People'
  }],
  services: {
    type: [serviceSchema],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Services array cannot be empty'
    }
  },
  adjustments: {
    type: [adjustmentSchema],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Adjustments array cannot be empty'
    }
  },
  status: {
    type: String,
    enum: [
      'DRAFT',
      'FINALIZED',
      'DUE',
      'PAID',
      'PART_PAID_PART_DUE',
      'PART_PAID_PART_FORGIVEN',
      'FORGIVEN',
      'CANCELLED_OR_VOID'
    ],
    required: true
  },
  paidAmount: Number,
  forgivenAmount: Number,
  paidAmountINR: Number,
  forgivenReason: String,
  cancellationReason: String,
  paymentChannel: {
    type: String,
    enum: [
      'WISE', 'WISE_ACH', 'XE', 'UPWORK', 'AIRWALLEX', 'PAYPAL', 
      'INTERNATIONAL_WIRE', 'NEFT/UPI', 'CHEQUE_INR', 'CASH_INR', 'CASH_USD'
    ]
  },
  lostAmountINR: Number
});

const Invoice = model('Invoice', invoiceSchema);

export default Invoice;