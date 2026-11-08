const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// GET /api/inheritance/:landId
router.get("/:landId", async (req, res) => {
  try {
    const { landId } = req.params;

    if (!/^\d+$/.test(landId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid land ID"
      });
    }

    const result = await pool.query(
      `SELECT
        l.id AS land_id,
        l.district,
        l.upazila,
        l.mouza,
        l.khatian_no,
        l.dag_no,
        l.land_area_decimal,
        o.owner_name,
        o.share_numerator,
        o.share_denominator,
        o.is_demo
      FROM land_records l
      JOIN ownership_records o ON o.land_id = l.id
      WHERE l.id = $1
        AND l.is_demo = TRUE
        AND o.is_demo = TRUE
      ORDER BY o.id`,
      [landId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No demo ownership records found"
      });
    }

    const owners = result.rows.map(row => {
      const numerator = Number(row.share_numerator);
      const denominator = Number(row.share_denominator);

      return {
        owner_name: row.owner_name,
        share: `${numerator}/${denominator}`,
        percentage: denominator > 0
          ? Number(((numerator / denominator) * 100).toFixed(2))
          : null
      };
    });

    res.json({
      status: "success",
      demo: true,
      message: "Fictional ownership data only. Not an official inheritance or legal calculation.",
      land: {
        land_id: result.rows[0].land_id,
        district: result.rows[0].district,
        upazila: result.rows[0].upazila,
        mouza: result.rows[0].mouza,
        khatian_no: result.rows[0].khatian_no,
        dag_no: result.rows[0].dag_no,
        land_area_decimal: result.rows[0].land_area_decimal
      },
      total_owners: owners.length,
      owners
    });

  } catch (error) {
    console.error("Inheritance API Error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to retrieve ownership information"
    });
  }
});

module.exports = router;
