import { check } from "express-validator";

export const balanceValidations = [
  check("id_user", "El usuario es obligatorio").notEmpty(),
  check("balance", "El monto es obligatorio").notEmpty(),
];
