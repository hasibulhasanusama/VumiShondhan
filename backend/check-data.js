const pool = require("./config/db");

async function check() {
  try {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM land_records) AS lands,
        (SELECT COUNT(*) FROM ownership_records) AS owners,
        (SELECT COUNT(*) FROM document_records) AS documents,
        (SELECT COUNT(*) FROM mutation_records) AS mutations,
        (SELECT COUNT(*) FROM case_records) AS cases
    `);

    console.table(result.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

check();
