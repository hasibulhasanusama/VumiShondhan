const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// GET /api/reports/:landId
router.get("/:landId", async (req, res) => {
  try {
    const { landId } = req.params;

    if (!/^\d+$/.test(landId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid land ID"
      });
    }

    const landResult = await pool.query(
      `SELECT
        id, district, upazila, mouza,
        khatian_no, dag_no, land_area_decimal,
        land_type, land_status
       FROM land_records
       WHERE id = $1 AND is_demo = TRUE`,
      [landId]
    );

    if (landResult.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Demo land record not found"
      });
    }

    const [owners, documents, mutations, cases] = await Promise.all([
      pool.query(
        `SELECT owner_name, share_numerator, share_denominator
         FROM ownership_records
         WHERE land_id = $1 AND is_demo = TRUE`,
        [landId]
      ),

      pool.query(
        `SELECT document_type, document_no, issue_date, verification_status
         FROM document_records
         WHERE land_id = $1 AND is_demo = TRUE`,
        [landId]
      ),

      pool.query(
        `SELECT application_no, application_status, applied_at, completed_at
         FROM mutation_records
         WHERE land_id = $1 AND is_demo = TRUE`,
        [landId]
      ),

      pool.query(
        `SELECT case_no, court_name, case_status, filed_at
         FROM case_records
         WHERE land_id = $1 AND is_demo = TRUE`,
        [landId]
      )
    ]);

    res.json({
      status: "success",
      demo: true,
      message: "Fictional demo report only. Not an official land verification report.",
      report: {
        land: landResult.rows[0],

        ownership: {
          total_owners: owners.rows.length,
          records: owners.rows
        },

        documents: {
          total: documents.rows.length,
          records: documents.rows
        },

        mutations: {
          total: mutations.rows.length,
          records: mutations.rows
        },

        cases: {
          total: cases.rows.length,
          records: cases.rows
        }
      }
    });

  } catch (error) {
    console.error("Report API Error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to generate verification report"
    });
  }
});

module.exports = router;
