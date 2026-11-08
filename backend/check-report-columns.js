const pool = require("./config/db");

async function checkTables() {
  try {
    const result = await pool.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name IN (
        'land_records',
        'ownership_records',
        'document_records',
        'mutation_records',
        'case_records'
      )
      ORDER BY table_name, ordinal_position
    `);

    console.table(result.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

checkTables();
