import cron from "node-cron"
import { checkAllSites } from "./checkSites"
console.log("Starting cron job...");

cron.schedule("*/3 * * * *", () => {
    console.log("Running scheduled check...");
    checkAllSites();
    console.log("Check complete.");
})