import Client from "../models/Client.js";
import Invoice from "../models/Invoice.js";
import Project from "../models/Project.js";
import APIFeatures from "../utils/apiFeatures.js";
import qrcode from "qrcode";
// import PDFDocument from "pdfkit";
import fs from "fs";

// // Create Invoice
// app.post("/api/invoices", async (req, res) => {
//   try {
//     const { clientId, projectId, invoiceData } = req.body;

//     // Fetch client and project details
//     const client = await Client.findById(clientId);
//     const project = await Project.findById(projectId);

//     // Calculate total amount (including adjustments and overdue amounts)
//     let totalAmount = 0;
//     // Logic to calculate total amount

//     // Create new invoice document in the database
//     const newInvoice = await Invoice.create({
//       ...invoiceData,
//       totalAmount,
//     });

//     // Generate QR code for payment link if provided
//     if (newInvoice.paymentLink) {
//       const qrCodeData = await QRCode.toDataURL(newInvoice.paymentLink);
//       newInvoice.qrCode = qrCodeData;
//       await newInvoice.save();
//     }

//     res.status(201).json(newInvoice);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Read Invoice
// app.get("/api/invoices/:id", async (req, res) => {
//   try {
//     // Retrieve invoice details based on ID
//     const invoice = await Invoice.findById(req.params.id);

//     if (!invoice) {
//       return res.status(404).json({ error: "Invoice not found" });
//     }

//     res.json(invoice);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update Invoice
// app.put("/api/invoices/:id", async (req, res) => {
//   try {
//     // Receive updated invoice data from request body
//     const updatedInvoiceData = req.body;

//     // Update existing invoice document in the database
//     const updatedInvoice = await Invoice.findByIdAndUpdate(
//       req.params.id,
//       updatedInvoiceData,
//       { new: true }
//     );

//     if (!updatedInvoice) {
//       return res.status(404).json({ error: "Invoice not found" });
//     }

//     res.json(updatedInvoice);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete Invoice
// app.delete("/api/invoices/:id", async (req, res) => {
//   try {
//     // Delete invoice document from the database
//     const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);

//     if (!deletedInvoice) {
//       return res.status(404).json({ error: "Invoice not found" });
//     }

//     res.json({ message: "Invoice deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Generate PDF for Invoice
// //   app.get('/api/invoices/:id/pdf', async (req, res) => {
// //     try {
// //       // Retrieve invoice details from the database based on ID
// //       const invoice = await Invoice.findById(req.params.id);

// //       if (!invoice) {
// //         return res.status(404).json({ error: 'Invoice not found' });
// //       }

// //       // Create PDF
// //       const doc = new PDFDocument();
// //       const pdfFilePath = `invoice_${invoice._id}.pdf`;

// //       // Pipe PDF to a file
// //       doc.pipe(fs.createWriteStream(pdfFilePath));

// //       // Populate PDF with invoice details (following the provided format)
// //       doc.fontSize(12).text('Tax Invoice', { align: 'center' });

// //       // More PDF content population here...

// //       // End PDF
// //       doc.end();

// //       // json the PDF file as response
// //       res.setHeader('Content-Type', 'application/pdf');
// //       res.download(pdfFilePath);

// //       // Delete the PDF file after sending
// //       fs.unlinkSync(pdfFilePath);
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });

// // Create a new invoice
// export const createInvoice = async (req, res) => {
//   try {
//     const {
//       clientId,
//       projectId,
//       serialNumber,
//       number,
//       poNumber,
//       date,
//       serviceFromDate,
//       serviceToDate,
//       mileStones,
//       serviceDays,
//       dueDate,
//       paymentLink,
//       prepearedBy,
//       reviewedBy,
//       services,
//       adjustments,
//       status,
//       paidAmount,
//       forgivenAmount,
//       paidAmountINR,
//       forgivenReason,
//       cancellationReason,
//       paymentChannel,
//       lostAmountINR,
//     } = req.body;

//     // Calculate total amount (including adjustments and overdue amounts)
//     let totalAmount = 0;

//     // Logic to calculate total amount
//     services.forEach((service) => {
//       totalAmount +=
//         service.taxableAmount +
//         service.sgstAmount +
//         service.cgstAmount +
//         service.igstAmount;
//     });

//     adjustments.forEach((adjustment) => {
//       totalAmount += adjustment.amount;
//     });

//     // Check for overdue amounts from previous invoices and add to total amount if applicable
//     const previousInvoices = await Invoice.find({
//       clientId: clientId,
//       status: { $in: ["DUE", "PART_PAID_PART_DUE"] },
//     }).sort({ date: -1 });

//     if (previousInvoices.length > 0) {
//       const overdueAmount = previousInvoices.reduce(
//         (acc, curr) => acc + curr.totalAmount - curr.paidAmount,
//         0
//       );
//       totalAmount += overdueAmount;
//     }

//     // Create new invoice document in the database
//     const newInvoice = await Invoice.create({
//       clientId,
//       projectId,
//       serialNumber,
//       number,
//       poNumber,
//       date,
//       serviceFromDate,
//       serviceToDate,
//       mileStones,
//       serviceDays,
//       dueDate,
//       paymentLink,
//       prepearedBy,
//       reviewedBy,
//       services,
//       adjustments,
//       status,
//       totalAmount,
//       paidAmount,
//       forgivenAmount,
//       paidAmountINR,
//       forgivenReason,
//       cancellationReason,
//       paymentChannel,
//       lostAmountINR,
//     });
//     // Generate QR code for payment link if provided
//     if (newInvoice.paymentLink) {
//       const qrCodeData = await QRCode.toDataURL(newInvoice.paymentLink);
//       newInvoice.qrCode = qrCodeData;
//       await newInvoice.save();
//     }

//     // Generate PDF for the newly created invoice
//     generatePDF(newInvoice);

//     res.status(201).json(newInvoice);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all invoices
// export const getAllInvoices = async (req, res) => {
//   try {
//     const invoices = await Invoice.find();
//     res.status(200).json(invoices);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a single invoice
// export const getInvoice = async (req, res) => {
//   try {
//     const invoice = await Invoice.findById(req.params.id);
//     if (!invoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }
//     res.status(200).json(invoice);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an invoice
// export const updateInvoice = async (req, res) => {
//   try {
//     const updatedInvoice = await Invoice.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedInvoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }
//     res.status(200).json(updatedInvoice);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete an invoice
// export const deleteInvoice = async (req, res) => {
//   try {
//     const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
//     if (!deletedInvoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }
//     res.status(200).json({ message: "Invoice deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Generate PDF for an invoice
// const generatePDF = (invoice) => {
//   const pdfDoc = new PDFDocument();
//   const pdfStream = fs.createWriteStream(`invoice_${invoice.serialNumber}.pdf`);
//   pdfDoc.pipe(pdfStream);

//   // Add content to PDF
//   pdfDoc.fontSize(14).text(`Invoice #: ${invoice.number}`, 100, 100);
//   // Add more content as needed

//   pdfDoc.end();
// };

// // Get PDF for an invoice
// // export const getPdf = async (req, res) => {
// //   try {
// //     const invoice = await Invoice.findById(req.params.id);
// //     if (!invoice) {
// //       return res.status(404).json({ message: 'Invoice not found' });
// //     }

// //     const pdfPath = `invoice_${invoice.serialNumber}.pdf`;
// //     res.setHeader('Content-Type', 'application/pdf');
// //     res.setHeader('Content-Disposition', `inline; filename="${pdfPath}"`);

// //     const pdfStream = fs.createReadStream(pdfPath);
// //     pdfStream.pipe(res);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // /invoices/:id/pdf
// // Sample route to get aggregated invoice data and generate PDF
// export const aggregatedInvoice = async (req, res) => {
//   try {
//     const invoiceId = mongoose.Types.ObjectId(req.params.id);

//     // Perform aggregation to get the required data for the invoice
//     const invoiceData = await Invoice.aggregate([
//       {
//         $match: { _id: invoiceId }, // Match the specific invoice
//       },
//       {
//         $lookup: {
//           from: "projects", // Collection to lookup
//           localField: "projectId",
//           foreignField: "_id",
//           as: "project",
//         },
//       },
//       {
//         $lookup: {
//           from: "clients",
//           localField: "clientId",
//           foreignField: "_id",
//           as: "client",
//         },
//       },
//       // Add more $lookup stages if needed for other referenced collections
//       {
//         $project: {
//           _id: 0, // Exclude _id field
//           number: "$number",
//           date: "$date",
//           // Add more fields as needed for the Invoice format
//           "project.name": 1,
//           "client.businessName": 1,
//           // Include other relevant fields from the project and client collections
//         },
//       },
//     ]);

//     // Generate PDF using invoiceData
// const pdfData = generatePDF(invoiceData);

//     // json PDF as response
//     res.setHeader("Content-Type", "application/pdf");
//     res.json(pdfData);
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json();
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update invoice by ID
export const updateInvoice = async (req, res) => {
  try {
    //     // Receive updated invoice data from request body
    const updatedInvoiceData = req.body;

    // Update existing invoice document in the database
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      updatedInvoiceData,
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    // Add overdue amount from previous invoices if applicable
    if (updatedInvoice.status === "DUE") {
      const previousInvoices = await Invoice.find({
        clientId: updatedInvoice.clientId,
        status: "DUE",
        _id: { $ne: invoiceId },
      });
      const totalOverdueAmount = previousInvoices.reduce(
        (acc, invoice) => acc + (invoice.dueAmount || 0),
        0
      );
      updatedInvoice.overdueAmount = totalOverdueAmount;
    }

    // Apply adjustments to invoice total
    if (adjustments && adjustments.length > 0) {
      const totalAdjustmentAmount = adjustments.reduce(
        (acc, adjustment) => acc + adjustment.amount,
        0
      );
      updatedInvoice.totalAmount += totalAdjustmentAmount;
    }

    // Generate QR code and embed in the invoice PDF if payment link is provided
    if (paymentLink) {
      const qrCodeImage = await generateQRCode(paymentLink);
      updatedInvoice.qrCode = qrCodeImage;
    }

    await updatedInvoice.save();
    res.json(updatedInvoice);

    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // const updates = Object.keys(req.body);
  // const allowedUpdates = [
  //   'clientId', 'projectId', 'serialNumber', 'number', 'poNumber', 'date',
  //   'serviceFromDate', 'serviceToDate', 'mileStones', 'serviceDays', 'dueDate',
  //   'paymentLink', 'preparedBy', 'reviewedBy', 'services', 'adjustments', 'status',
  //   'paidAmount', 'forgivenAmount', 'paidAmountINR', 'forgivenReason', 'cancellationReason',
  //   'paymentChannel', 'lostAmountINR'
  // ];

  // const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  // if (!isValidOperation) {
  //   return res.status(400).json({ error: 'Invalid updates!' });
  // }

  // try {
  //   const invoice = await Invoice.findById(req.params.id);

  //   if (!invoice) {
  //     return res.status(404).json();
  //   }

  //   updates.forEach((update) => invoice[update] = req.body[update]);
  //   await invoice.save();

  //   res.status(200).json(invoice);
  // } catch (error) {
  //   res.status(400).json(error);
  // }
};

// Delete invoice by ID
export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json();
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Function to generate QR code
const generateQRCode = async (text) => {
  try {
    const qrCodeImage = await qrcode.toDataURL(text);
    return qrCodeImage;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Error generating QR code");
  }
};
