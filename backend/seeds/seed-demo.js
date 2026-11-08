const pool = require("../config/db");

const areas = [
  ["Dhaka", "Savar", "Dhamrai"],
  ["Gazipur", "Sadar", "Kaliakair"],
  ["Narayanganj", "Sadar", "Sonargaon"],
  ["Mymensingh", "Sadar", "Trishal"],
  ["Rajshahi", "Paba", "Godagari"],
  ["Rangpur", "Sadar", "Mithapukur"],
  ["Sylhet", "Sadar", "Golapganj"],
  ["Cumilla", "Sadar", "Laksam"],
  ["Chattogram", "Sadar", "Hathazari"],
  ["Bogura", "Sadar", "Shibganj"]
];

const owners = [
  "Rahim Uddin", "Karim Ahmed", "Abdul Hamid",
  "Hasan Ali", "Mohammad Salim", "Abdul Karim",
  "Jamal Hossain", "Nur Islam", "Aminul Haque",
  "Mizanur Rahman"
];

const landTypes = [
  "Agricultural",
  "Residential",
  "Commercial",
  "Pond",
  "Homestead"
];

const statuses = [
  "Active",
  "Pending Verification",
  "Under Review",
  "Demo Information"
];

async function seedDemoData() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Remove previous demo records only
    await client.query("DELETE FROM case_records WHERE is_demo = TRUE");
    await client.query("DELETE FROM mutation_records WHERE is_demo = TRUE");
    await client.query("DELETE FROM document_records WHERE is_demo = TRUE");
    await client.query("DELETE FROM ownership_records WHERE is_demo = TRUE");
    await client.query("DELETE FROM land_records WHERE is_demo = TRUE");

    let count = 0;

    for (let i = 0; i < areas.length; i++) {
      const [district, upazila1, upazila2] = areas[i];

      for (let u = 0; u < 2; u++) {
        const upazila = u === 0 ? upazila1 : upazila2;

        for (let m = 1; m <= 2; m++) {
          const mouza = `Demo Mouza ${String(m).padStart(2, "0")}`;

          for (let r = 1; r <= 10; r++) {
            const number = count + 1;
            const owner = owners[(number - 1) % owners.length];
            const khatian = `DEMO-K-${String(number).padStart(4, "0")}`;
            const dag = `DEMO-D-${String(number).padStart(4, "0")}`;

            const landResult = await client.query(
              `INSERT INTO land_records
              (district, upazila, mouza, khatian_no, dag_no,
               land_area_decimal, land_type, land_status, is_demo)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,TRUE)
               RETURNING id`,
              [
                district,
                upazila,
                mouza,
                khatian,
                dag,
                5 + (number % 95),
                landTypes[number % landTypes.length],
                statuses[number % statuses.length]
              ]
            );

            const landId = landResult.rows[0].id;

            await client.query(
              `INSERT INTO ownership_records
              (land_id, owner_name, is_demo)
              VALUES ($1,$2,TRUE)`,
              [landId, owner]
            );

            await client.query(
              `INSERT INTO document_records
              (land_id, document_type, document_no,
               verification_status, is_demo)
              VALUES ($1,$2,$3,'Demo Only',TRUE)`,
              [landId, "Demo Deed", `DEMO-DEED-${number}`]
            );

            await client.query(
              `INSERT INTO mutation_records
              (land_id, application_no, application_status, is_demo)
              VALUES ($1,$2,'Demo Pending',TRUE)`,
              [landId, `DEMO-MUT-${number}`]
            );

            await client.query(
              `INSERT INTO case_records
              (land_id, case_no, court_name, case_status, is_demo)
              VALUES ($1,$2,'Demo Court','Demo Information',TRUE)`,
              [landId, `DEMO-CASE-${number}`]
            );

            count++;
          }
        }
      }
    }

    await client.query("COMMIT");

    console.log("DEMO DATA CREATED SUCCESSFULLY!");
    console.log("Total Land Records:", count);
    console.log("All records are fictional demo data.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("SEED ERROR:", error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDemoData();
