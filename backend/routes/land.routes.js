const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { district, upazila, mouza, khatian, dag } = req.query;

    const conditions = ["l.is_demo = TRUE"];
    const values = [];

    const filters = {
      district,
      upazila,
      mouza,
      khatian,
      dag
    };

    const columns = {
      district: "l.district",
      upazila: "l.upazila",
      mouza: "l.mouza",
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
        l.id,
        l.district,
        l.upazila,
        l.mouza,
        l.khatian_no,
        l.dag_no,
        l.land_area_decimal,
        l.land_type,
        l.land_status,
        l.is_demo,
        o.owner_name
      FROM land_records l
      LEFT JOIN ownership_records o
        ON o.land_id = l.id AND o.is_demo = TRUE
      WHERE ${conditions.join(" AND ")}
      ORDER BY l.id
      LIMIT 100
    `;

    const result = await pool.query(query, values);

    res.json({
      status: "success",
      demo: true,
      total: result.rowCount,
      message: "Fictional demo records only. Not official land records.",
      data: result.rows
    });

  } catch (error) {
    console.error("Land search error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Land search failed"
    });
  }
});

module.exports = router;
