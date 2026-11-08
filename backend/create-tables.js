const fs = require("fs");
const path = require("path");
const pool = require("./config/db");

async function createTables() {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, "database", "schema.sql"),
      "utf8"
    );

    const statements = sql
      .replace(/^\uFEFF/, "")
      .split(";")
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    for (let i = 0; i < statements.length; i++) {
      try {
        await pool.query(statements[i]);
        console.log(`Command ${i + 1} completed`);
      } catch (error) {
        console.error(`Error in command ${i + 1}:`, error.message);
        throw error;
      }
    }

    console.log("ALL DATABASE TABLES CREATED SUCCESSFULLY!");
  } catch (error) {
    console.error("SCHEMA ERROR:", error.message);
  } finally {
    await pool.end();
  }
}

createTables();
