import "reflect-metadata";

import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";
import categoriesRoute from "./routes/categories.route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(statusRoute);
app.use(authorizationRoute);
app.use(usersRoute);
app.use(categoriesRoute);

// app.use(jwtAuthenticationMiddleware, usersRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`);
});
