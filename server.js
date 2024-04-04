import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/database.js";
import cookieParser from "cookie-parser";
import peopleRoutes from "./routes/peopleRoutes.js";

// import database from "./config/database.js";
// import router from "./routes.js";

// app.set('trust proxy', true);

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
connect();
// database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use('/webhook', webhookRouter); // before bodyParser.json [MUST]
app.use(express.json());
// app.use(clientMiddleware());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);

// app.use("/", router);
app.use("/people", peopleRoutes);

const port = 3300;

const server = app.listen(process.env.PORT || port, () => {
  console.log(`Server now up and running on port ${port}`);
});

// module.exports = server;
export default server;
