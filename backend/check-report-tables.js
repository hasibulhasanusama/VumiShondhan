const pool = require("./config/db");

async function check() {
  try {
    const result = await pool.query(`
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name IN (
        'document_records',
        'mutation_records',
        'case_records'
      )
      ORDER BY table_name, ordinal_position
    `);

    console.table(result.rows);

    const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN (
        'document_records',
        'mutation_records',
        'case_records'
      )
      ORDER BY table_name
    `);

    console.log("AVAILABLE TABLES:");
    console.table(tables.rows);

  } catch (error) {
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

check();
