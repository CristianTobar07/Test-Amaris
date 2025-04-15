import { routerFunds } from "../routes/funds";
import express from "express";
import cors from "cors";
import routerBalance from "../routes/balance";
import routerUser from "../routes/user";

export const globalUseApp = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());

  app.use(routerBalance);
  app.use(routerUser);
  app.use(routerFunds);

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Listen port: ${PORT}`);
  });
};
