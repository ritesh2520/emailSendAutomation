const pool = require("../config/database");

async function getTodaysRecords() {
  try {
    const [rows] = await pool.execute(`
            SELECT
                id,
                order_id,
                awb_number,
                awb_url,
                fedex_invoice_url,
                created_at
            FROM logistics_records
            WHERE created_at >= CURDATE()
            AND created_at < CURDATE() + INTERVAL 1 DAY
            ORDER BY id ASC
        `);

    console.log(`Found ${rows.length} records`);

    return rows;
  } catch (error) {
    console.error("Failed to fetch records");
    console.error(error.message);
    throw error;
  }
}

module.exports = {
  getTodaysRecords,
};
