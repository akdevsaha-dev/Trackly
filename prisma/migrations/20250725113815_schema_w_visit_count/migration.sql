-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('MOBILE', 'TABLET', 'DESKTOP', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "provider" TEXT,
ADD COLUMN     "warmUpEnabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceType" "DeviceType" NOT NULL,
    "userAgent" TEXT,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visit_siteId_idx" ON "Visit"("siteId");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
