-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_key" ON "roles"("nombre");

-- AlterTable
ALTER TABLE "users" ADD COLUMN "role_id" UUID;

-- Insert default roles
INSERT INTO "roles" ("id", "nombre", "created_at") VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Administrador', CURRENT_TIMESTAMP),
    ('a0000000-0000-0000-0000-000000000002', 'Manager', CURRENT_TIMESTAMP),
    ('a0000000-0000-0000-0000-000000000003', 'Técnico', CURRENT_TIMESTAMP);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
