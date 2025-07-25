import cron from "node-cron"
import { checkAllSites, checkWarmupSite } from "./checkSites"
console.log("Starting cron job...");

cron.schedule("*/3 * * * *", () => {
    checkAllSites();
})

cron.schedule("*/10 * * * *", () => {
    checkWarmupSite();
})