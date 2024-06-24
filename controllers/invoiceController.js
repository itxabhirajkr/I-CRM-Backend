import Invoice from "../models/Invoice.js";
import Client from "../models/Client.js";
import People from "../models/People.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import QRCode from "qrcode";
import numberToWords from "number-to-words";
import puppeteer from "puppeteer";
import fs from 'fs';
import path from "path";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

import APIFeatures from "../utils/apiFeatures.js";
import { auth } from "../middleware/Auth.js";

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

export const generateInvoiceData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ error: "Token missing from authorization header" });
    }

    // const userInfo = auth(token);
    const userInfo= token;
    if (!userInfo) {
      return res.status(401).send({ error: "Invalid or expired token" });
    }
    const userEmail = userInfo.email;

    if (!userEmail) {
      return res.status(400).json({
        status: "fail",
        message: "User email not provided in headers",
      });
    }

    console.log(userEmail);

    // Find the invoice by name
    const invoice = await Invoice.findById(id)
      .populate("clientId")
      .populate("projectId")
      .populate("preparedBy")
      .populate("reviewedBy");

    if (!invoice) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invoice not found" });
    }

    // Extract client details
    const client = await Client.findById(invoice.clientId);

    // Extract project details
    const project = await Project.findById(invoice.projectId);

    // Extract people details
    const preparedBy = await People.findById(invoice.preparedBy);
    const reviewedBy = await People.find({ _id: { $in: invoice.reviewedBy } });

    // Calculate previous dues
    const previousInvoices = await Invoice.find({
      clientId: client._id,
      status: { $ne: "PAID" },
      _id: { $ne: invoice._id },
    });
    const previousDues = previousInvoices.reduce(
      (sum, inv) =>
        sum +
        inv.services.reduce(
          (acc, service) =>
            acc +
            service.taxableAmount +
            service.sgstAmount +
            service.cgstAmount +
            service.igstAmount,
          0
        ),
      0
    );

    // Calculate current charges
    const currentCharges = invoice.services.reduce(
      (acc, service) =>
        acc +
        service.taxableAmount +
        service.sgstAmount +
        service.cgstAmount +
        service.igstAmount,
      0
    );

    // Total amount due in USD and INR
    const totalAmountDueUSD = previousDues + currentCharges;
    const totalAmountDueINR = totalAmountDueUSD * 83.5; // Example conversion rate

    // Generate QR Code (Placeholder)
    // Generate QR Code Data
    const qrData = {
      invoiceNumber: invoice.number,
      clientName: client.businessName,
      amountDue: invoice.services.reduce(
        (acc, service) =>
          acc +
          service.taxableAmount +
          service.sgstAmount +
          service.cgstAmount +
          service.igstAmount,
        0
      ),
      dueDate: invoice.dueDate.toISOString().split("T")[0],
    };

    const qrString = JSON.stringify(qrData);

    // Generate QR Code (Base64 encoded PNG)
    const qrCode = await QRCode.toDataURL(qrString);

    // Format invoice data
    const invoiceData = {
      companyName: "Inzint Private Limited",
      companyAddress: "B-111, Sector 65, Noida, India, 201301",
      companyGSTIN: "09AAFCI7567Q1ZK",
      invoiceNumber: invoice.serialNumber,
      invoiceDate: invoice.date.toISOString().split("T")[0], // Format: YYYY-MM-DD
      dueDate: invoice.dueDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
      currency: client.currency,
      reverseChargeApplicable: "No",
      billedTo: {
        businessName: client.businessName,
        billingContactPerson: client.billingContactPerson,
        address: client.address,
        email: client.email,
        gstin: client.GSTIN,
        placeOfSupply: client.placeOfSupply,
        country: client.country,
      },
      qrCode: qrCode,
      projectName: project.name,
      servicePeriod: `${
        invoice.serviceFromDate.toISOString().split("T")[0]
      } - ${invoice.serviceToDate.toISOString().split("T")[0]}`,
      milestones: invoice.mileStones.join(", "),
      docNumber: invoice.serialNumber,
      poNumber: invoice.poNumber,
      services: invoice.services.map((service, index) => ({
        id: index + 1,
        name: service.name,
        description: service.description,
        fromDate: service.fromDate
          ? service.fromDate.toISOString().split("T")[0]
          : null,
        toDate: service.toDate
          ? service.toDate.toISOString().split("T")[0]
          : null,
        milestone: service.mileStone,
        SAC: service.SAC,
        hours: service.hours,
        rate: service.rate,
        discount: service.discountPercent
          ? `${service.discountPercent}%`
          : service.discountAmount,
        taxableValue: service.taxableAmount,
        sgst: service.sgstAmount,
        cgst: service.cgstAmount,
        igst: service.igstAmount,
        amount:
          service.taxableAmount +
          service.sgstAmount +
          service.cgstAmount +
          service.igstAmount,
      })),
      currentCharges: currentCharges,
      preparedBy: preparedBy.displayName,
      preparedByDate: new Date().toISOString(),
      amountReceived: invoice.paidAmount || 0,
      reviewedBy: reviewedBy.map((person) => person.displayName).join(", "),
      currentDue: currentCharges,
      previousDues: previousDues, // This should be fetched or calculated from historical data
      totalAmountDueUSD: totalAmountDueUSD, // This should be calculated
      totalAmountDueINR: totalAmountDueINR, // This should be calculated
      totalAmountDueUSDWords: `${numberToWords.toWords(
        totalAmountDueUSD
      )} USD Only`,
      totalAmountDueINRWords: `${numberToWords.toWords(
        totalAmountDueINR
      )} INR Only`,
      signatureAndSeal: "<signature & seal here>",
    };

    //mail logic
    const templatePath = path.resolve("utils", "mailTemplate.html");
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(templateSource);
    const filledTemplate = template(invoiceData);
    
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(filledTemplate);
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: "priyanshu@inzint.com",
        pass: "Sav44246",
      },
    });

    const mailOptions = {
      from: "priyanshu@inzint.com",
      to: userEmail,
      subject: `Invoice ${invoice.serialNumber}`,
      text: `Please find attached the invoice ${invoice.serialNumber}.`,
      attachments: [
        {
          filename: `Invoice-${invoice.serialNumber}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: "success",
      data: invoiceData,
    });
  } catch (error) {
    next(error);
  }
};
