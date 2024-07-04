-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT[],
    "value" TEXT[],

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);
