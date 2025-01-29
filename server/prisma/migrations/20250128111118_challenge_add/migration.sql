-- CreateTable
CREATE TABLE "challenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "originalLink" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "maximum" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
