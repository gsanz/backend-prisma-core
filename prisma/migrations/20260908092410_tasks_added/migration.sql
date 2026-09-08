-- CreateTable
CREATE TABLE "tareas_usuario" (
    "id" UUID NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "horas_estimadas" DECIMAL(5,2) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tareas_usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tareas_usuario" ADD CONSTRAINT "tareas_usuario_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
