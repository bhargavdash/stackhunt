-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "github_username" TEXT,
    "github_token_encrypted" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."user_preferences" (
    "user_id" TEXT NOT NULL,
    "notification_frequency" TEXT NOT NULL DEFAULT 'daily',
    "email_enabled" BOOLEAN NOT NULL DEFAULT true,
    "theme_preference" TEXT NOT NULL DEFAULT 'system',
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "public"."users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
