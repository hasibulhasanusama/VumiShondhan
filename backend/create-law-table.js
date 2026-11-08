const pool = require("./config/db");

async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS legal_guides (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        content TEXT NOT NULL,
        source_note TEXT,
        is_demo BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("LEGAL GUIDES TABLE CREATED SUCCESSFULLY!");
  } catch (error) {
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

createTable();
