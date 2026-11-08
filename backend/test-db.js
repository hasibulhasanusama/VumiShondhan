const pool = require("./config/db");

async function testConnection() {
  try {
    const result = await pool.query(`
      SELECT
        current_database() AS database,
        PostGIS_Full_Version() AS postgis_version
    `);

    console.log("DATABASE CONNECTED SUCCESSFULLY!");
    console.log("Database:", result.rows[0].database);
    console.log("PostGIS:", result.rows[0].postgis_version);

  } catch (error) {
    console.error("DATABASE CONNECTION FAILED!");
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
