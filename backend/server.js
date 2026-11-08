const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pool = require("./config/db");

require("dotenv").config();

const app = express();
const documentRoutes = require("./routes/document.routes");
const landRoutes = require("./routes/land.routes");
const reportRoutes = require("./routes/report.routes");
const lawRoutes = require("./routes/law.routes");
const inheritanceRoutes = require("./routes/inheritance.routes");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/documents", documentRoutes);
app.use("/api/lands", landRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/law", lawRoutes);
app.use("/api/inheritance", inheritanceRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "VumiShondhan Backend is Running!",
    status: "success"
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        current_database() AS database,
        PostGIS_Full_Version() AS postgis
    `);

    res.json({
      status: "success",
      database: result.rows[0].database,
      postgis: "Connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`VumiShondhan Backend running on port ${PORT}`);
});



