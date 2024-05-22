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
export const getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    // .populate({
    //   path: 'client',
    //   model: Client,
    //   select: 'businessName billingContactPerson address email gstin placeOfSupply country'
    // })
    // .populate({
    //   path: 'project',
    //   model: Project,
    //   select: 'name'
    // })
    // .populate('services');
    console.log(invoice);
    if (!invoice) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invoice not found" });
    }

    // const invoiceData = generateInvoiceData(invoice);
    res.status(200).json({
      status: "success",
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

// export const getInvoiceByName = async (req, res, next) => {
//   try {
//     // Fetch the invoice by name
//     const invoice = await Invoice.findOne({ name: req.params.name });

//     if (!invoice) {
//       return res
//         .status(404)
//         .json({ status: "fail", message: "Invoice not found" });
//     }

//     // Extract client and project IDs from the invoice
//     const clientId = invoice.client;
//     const projectId = invoice.project;

//     // Fetch client and project details using their respective models
//     const client = await Client.findById(clientId).select(
//       "businessName billingContactPerson address email gstin placeOfSupply country"
//     );
//     const project = await Project.findById(projectId).select("name");

//     // Fetch preparedBy and reviewedBy details
//     const preparedBy = await User.findById(invoice.preparedBy).select("name"); // Adjust the fields as per the User model
//     const reviewedBy = await User.find({
//       _id: { $in: invoice.reviewedBy },
//     }).select("name"); // Adjust the fields as per the User model

//     // Structure the data as per requirements
//     const invoiceData = generateInvoiceData({
//       invoice,
//       client,
//       project,
//       preparedBy,
//       reviewedBy,
//     });

//     // Send the response
//     res.status(200).json({
//       status: "success",
//       data: invoiceData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export default getInvoiceByName;
