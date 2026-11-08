const pool = require("./config/db");

pool.query(
  "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'ownership_records' ORDER BY ordinal_position"
)
.then(result => {
  console.table(result.rows);
  return pool.end();
})
.catch(error => {
  console.error(error.message);
  return pool.end();
});
