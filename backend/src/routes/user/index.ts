import { Router } from "express";
import { validateEmptyFileds } from "../../middlewares/validate-fields";
import { AddUser, getUser } from "../../controllers/user";
import { userValidations } from "../../validations/user-validation";
import { validateEmail } from "../../middlewares/user-validation";

const routerUser = Router();

routerUser.get("/user", getUser);
routerUser.post(
  "/user",
  [...userValidations, validateEmptyFileds, validateEmail],
  AddUser
);

export default routerUser;
