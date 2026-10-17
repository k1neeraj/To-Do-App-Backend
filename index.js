const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/todoRoute");

const app = express();
const PORT = Number(process.env.PORT) || 5500;

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server and local tools that do not send an Origin header.
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);

let connectionPromise;

async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  await connectionPromise;
  return mongoose.connection;
}

app.get("/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "not_ready",
    database: connected ? "connected" : "disconnected",
  });
});

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }

  if (error.message === "Origin not allowed by CORS") {
    return res.status(403).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal server error" });
});

// Vercel imports this handler; local Node deployments start a listener.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`To-Do API listening on port ${PORT}`);
  });
}

module.exports = app;
