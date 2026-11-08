const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// GET /api/law
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    const result = await pool.query(
      `SELECT id, title, category, content, source_note, is_demo
       FROM legal_guides
       WHERE is_demo = TRUE
       AND ($1::text IS NULL OR category ILIKE '%' || $1 || '%')
       AND ($2::text IS NULL OR title ILIKE '%' || $2 || '%' OR content ILIKE '%' || $2 || '%')
       ORDER BY id`,
      [category || null, search || null]
    );

    res.json({
      status: "success",
      demo: true,
      message: "Demo educational guides only. Not official legal advice.",
      total: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error("Law API Error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to retrieve law guides"
    });
  }
});

module.exports = router;
