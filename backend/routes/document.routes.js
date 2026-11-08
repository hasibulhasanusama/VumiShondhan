const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/verify", async (req, res) => {
  try {
    const { document_no, district, khatian, dag } = req.query;

    const conditions = ["d.is_demo = TRUE", "l.is_demo = TRUE"];
    const values = [];

    const filters = {
      document_no,
      district,
      khatian,
      dag
    };

    const columns = {
      document_no: "d.document_no",
      district: "l.district",
      khatian: "l.khatian_no",
      dag: "l.dag_no"
    };

    for (const [key, value] of Object.entries(filters)) {
      if (value && value.trim()) {
        values.push(`%${value.trim()}%`);
        conditions.push(
          `${columns[key]} ILIKE $${values.length}`
        );
      }
    }

    const query = `
      SELECT
        d.id AS document_id,
        d.document_type,
        d.document_no,
        d.issue_date,
        d.verification_status,
        l.id AS land_id,
        l.district,
        l.upazila,
        l.mouza,
        l.khatian_no,
        l.dag_no,
        o.owner_name,
        TRUE AS is_demo
      FROM document_records d
      INNER JOIN land_records l ON l.id = d.land_id
      LEFT JOIN ownership_records o
        ON o.land_id = l.id AND o.is_demo = TRUE
      WHERE ${conditions.join(" AND ")}
      ORDER BY d.id
      LIMIT 100
    `;

    const result = await pool.query(query, values);

    res.json({
      status: "success",
      demo: true,
      total: result.rowCount,
      message: "Fictional demo documents only. Not official verification.",
      data: result.rows
    });

  } catch (error) {
    console.error("Document verification error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Document verification failed"
    });
  }
});

module.exports = router;
