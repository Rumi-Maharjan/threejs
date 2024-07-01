/*
  Warnings:

  - You are about to drop the column `colors` on the `Store_Item` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Store_Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "category_id" INTEGER;

-- AlterTable
ALTER TABLE "Store_Item" DROP COLUMN "colors",
DROP COLUMN "sizes",
ADD COLUMN     "color" "Color"[],
ADD COLUMN     "size" "Sizes"[];

-- CreateTable
CREATE TABLE "GCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT,
    "description" TEXT,

    CONSTRAINT "GCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "GCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
