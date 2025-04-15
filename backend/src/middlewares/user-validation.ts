import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { userModel } from "../models/users";


export const validateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (email.length < 6 || email.length > 50) {
    return res.status(400).json({
      ok: false,
      msg: "El Correo debe tener mínimo 6 a 50 caracteres",
    });
  }

  const regexCorreo = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  if (!regexCorreo.test(email)) {
    return res.status(400).json({
      ok: false,
      msg: "Formato de Correo inválido",
    });
  }

  next();
};

export const existUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id_user = req.body.id_user;
  const user = await userModel.findById(id_user);
  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: "Usuario no existe",
    });
  }

  next();
};
