-- CreateTable
CREATE TABLE "request_log" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "request_log_pkey" PRIMARY KEY ("id")
);
