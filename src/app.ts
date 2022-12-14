import "reflect-metadata";

import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";
import categoriesRoute from "./routes/categories.route";
import productsRoute from "./routes/products.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(statusRoute);
app.use(authorizationRoute);
app.use(usersRoute);
app.use(categoriesRoute);
app.use(productsRoute);

app.use(errorHandler);

export { app };
