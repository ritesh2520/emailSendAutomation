require("dotenv").config();

const {
  runDailyJob,
} = require("./jobs/dailyLogisticsJob");

runDailyJob();