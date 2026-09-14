-- CreateTable
CREATE TABLE "task_log" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tarea_id" UUID NOT NULL,
    "fecha" DATE NOT NULL,
    "descripcion" TEXT,
    "horas" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "task_log_user_id_fecha_idx" ON "task_log"("user_id", "fecha");

-- CreateIndex
CREATE INDEX "task_log_tarea_id_idx" ON "task_log"("tarea_id");

-- AddForeignKey
ALTER TABLE "task_log" ADD CONSTRAINT "task_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_log" ADD CONSTRAINT "task_log_tarea_id_fkey" FOREIGN KEY ("tarea_id") REFERENCES "tareas_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
