-- Rename legacy category values (run only if you migrated from knife/leather)
ALTER TYPE "ProductCategory" RENAME VALUE 'knife' TO 'bag';
ALTER TYPE "ProductCategory" RENAME VALUE 'leather' TO 'traditional';
