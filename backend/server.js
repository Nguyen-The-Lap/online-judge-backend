require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


// Connect to MongoDB
connectDB();

// Custom middleware logger
app.use(logger);

// Handle credentials before CORS
app.use(credentials);

// Enable CORS
app.use(cors(corsOptions));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware to handle JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({ online: "judge" });
});

// Routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));

app.use("/user", require("./routes/api/user"));
app.use("/leaderboard", require("./routes/api/leaderboard"));
app.use("/submissions", require("./routes/api/submissions"));
app.use("/problemset", require("./routes/api/problems"));
app.use("/run", require("./routes/api/run"));
app.use("/submit", require("./routes/api/submit"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Catch-all for unknown routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Error handling
app.use(errorHandler);

// Start the server once MongoDB is connected
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
