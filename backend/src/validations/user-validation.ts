import { check } from "express-validator";

export const userValidations = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("email", "El correo es obligatorio").notEmpty(),
  check("balance", "El saldo es obligatorio").notEmpty(),
];
