import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import categoryRepository from "../repositories/category.repository";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import admAuthenticationMiddleware from "../middlewares/adm-authentication.middleware";

import DatabaseError from "../models/errors/database.error.model";

const categoriesRoute = Router();

categoriesRoute.get(
  "/categories",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryRepository.findAllCategories();
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }
);

categoriesRoute.get(
  "/categories/:id",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const categories = await categoryRepository.findById(Number(id));
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }
);

categoriesRoute.post(
  "/categories",
  admAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = req.body;
      if (!newCategory || !newCategory.name) {
        throw new DatabaseError("Campos inválidos", { message: "Campos inválidos" });
      }
      const id = await categoryRepository.create(newCategory);

      res.status(StatusCodes.CREATED).json(id);
    } catch (error) {
      next(error);
    }
  }
);

categoriesRoute.put(
  "/categories/:id",
  admAuthenticationMiddleware,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const modifiedCategory = req.body;
      modifiedCategory.id = id;

      await categoryRepository.update(modifiedCategory);

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

categoriesRoute.delete(
  "/categories/:id",
  admAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await categoryRepository.remove(Number(id));
      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

export default categoriesRoute;
