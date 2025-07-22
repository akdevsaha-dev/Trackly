import cron from "node-cron"
import { checkAllSites } from "./checkSites"

cron.schedule("0 3 * * * *", () => {
    checkAllSites();
})