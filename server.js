import serverless from 'serverless-http';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/database.js";
import cookieParser from "cookie-parser";
import peopleRoutes from "./routes/peopleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import purchaseItemRoutes from "./routes/purchaseItemRoutes.js";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes.js";
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Instead of bodyParser.urlencoded
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/auth", userRoutes);
app.use("/profile", profileRoutes);
app.use("/people", peopleRoutes);
app.use("/client", clientRoutes);
app.use("/project", projectRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/purchaseItems', purchaseItemRoutes);
app.use('/purchaseOrder', purchaseOrderRoutes);


export const handler = serverless(app);