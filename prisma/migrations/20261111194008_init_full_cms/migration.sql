-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "caption" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaCoverage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "outletName" TEXT NOT NULL,
    "articleUrl" TEXT,
    "coverImage" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "excerpt" TEXT NOT NULL,
    "badge" TEXT NOT NULL DEFAULT 'Print',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaCoverage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'The Law Emporium',
    "fileUrl" TEXT,
    "content" TEXT NOT NULL,
    "readTime" TEXT NOT NULL DEFAULT '5 min read',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResourceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvocateProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "credentials" TEXT NOT NULL DEFAULT 'LL.B. (Hons.), LL.M.',
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT,
    "barCouncilId" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdvocateProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryItem_category_idx" ON "GalleryItem"("category");

-- CreateIndex
CREATE INDEX "MediaCoverage_badge_idx" ON "MediaCoverage"("badge");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceItem_slug_key" ON "ResourceItem"("slug");

-- CreateIndex
CREATE INDEX "ResourceItem_category_idx" ON "ResourceItem"("category");

-- CreateIndex
CREATE INDEX "AdvocateProfile_order_idx" ON "AdvocateProfile"("order");
