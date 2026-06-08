require("dotenv").config();

const {
  getTodaysRecords,
} = require("./services/logisticsService");

async function test() {
  try {
    const records = await getTodaysRecords();

    console.log(records);
  } catch (error) {
    console.error(error);
  }
}

test();