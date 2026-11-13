-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "locale" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSection" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "badgeNumber" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleBn" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentBn" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleBn" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "excerptBn" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "bodyBn" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCase" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "caseNumber" INTEGER NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleBn" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionBn" TEXT NOT NULL,
    "newsLink" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ServiceCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- CreateIndex
CREATE INDEX "PageSection_pageSlug_idx" ON "PageSection"("pageSlug");

-- CreateIndex
CREATE UNIQUE INDEX "PageSection_pageSlug_sectionKey_key" ON "PageSection"("pageSlug", "sectionKey");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_category_idx" ON "Service"("category");

-- CreateIndex
CREATE INDEX "ServiceCase_serviceId_idx" ON "ServiceCase"("serviceId");

-- AddForeignKey
ALTER TABLE "ServiceCase" ADD CONSTRAINT "ServiceCase_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
