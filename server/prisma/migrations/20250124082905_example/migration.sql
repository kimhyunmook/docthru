-- CreateTable
CREATE TABLE "example" (
    "uuid" TEXT NOT NULL,
    "require" TEXT NOT NULL DEFAULT '필수',
    "optional" TEXT DEFAULT '옵션 (없어도 됨)',

    CONSTRAINT "example_pkey" PRIMARY KEY ("uuid")
);
