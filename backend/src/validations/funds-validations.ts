import { check } from "express-validator";

export const fundsValidations = [
  check("id_user", "El id del usuario es obligatorio").notEmpty(),
  check("category", "La categoría de la tarea es obligatorio").notEmpty(),
  check("category_name", "El nombre de la categoría es obligatorio").notEmpty(),
  check("amont", "El monto de la tarea es obligatorio").notEmpty(),
  check("state", "El estado de la tarea es obligatorio").notEmpty(),
];

export const fundsUpdateValidations = [
  check("id_fund", "El id del fondo es obligatorio").notEmpty(),
  check("state", "El estado del fondo es obligatorio").notEmpty(),
];
