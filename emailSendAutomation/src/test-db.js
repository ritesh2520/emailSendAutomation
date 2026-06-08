require("dotenv").config();

const pool = require("./config/database");

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");

    console.log(" Database Connected");
    console.log(rows);
  } catch (error) {
    console.error(" Connection Failed");
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

testConnection();