import Invoice from "../models/Invoice.js";
import APIFeatures from "../utils/apiFeatures.js";

export const getAllInvoices = async (req, res, next) => {
  try {
    const features = new APIFeatures(Invoice.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const invoices = await features.query;

    res.status(200).json({
      status: "success",
      results: invoices.length,
      data: {
        invoices,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (req, res, next) => {
  try {
    const newInvoice = await Invoice.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        invoice: newInvoice,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
