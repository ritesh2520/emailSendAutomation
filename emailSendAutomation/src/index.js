require("dotenv").config();

const cron = require("node-cron");

const { runDailyJob } = require("./jobs/dailyLogisticsJob");

console.log(" Logistics Email Service Started ");

console.log("Cron scheduled for 9:30 PM IST daily");

cron.schedule(
  "* * * * *",
  async () => {
    console.log("\nRunning Daily Logistics Job...");

    await runDailyJob();
  },
  {
    timezone: "Asia/Kolkata",
  },
);
