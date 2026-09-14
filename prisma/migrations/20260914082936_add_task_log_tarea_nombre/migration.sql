/*
  Warnings:

  - Added the required column `tarea_nombre` to the `task_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_log" ADD COLUMN     "tarea_nombre" VARCHAR(255) NOT NULL;
