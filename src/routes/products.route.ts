import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import productRepository from "../repositories/product.repository";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import admAuthenticationMiddleware from "../middlewares/adm-authentication.middleware";

import DatabaseError from "../models/errors/database.error.model";

const productsRoute = Router();

productsRoute.get(
  "/products",
  admAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productRepository.findAllProducts();
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productsRoute.get(
  "/categories/:category/products",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = req.params.category;
      const products = await productRepository.findByCategory(Number(category));
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productsRoute.get(
  "/categories/:category/products/:id",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = req.params.category;
      const id = req.params.id;
      const products = await productRepository.findById(Number(id));
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productsRoute.post(
  "/products",
  admAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = req.body;
      if (!newCategory || !newCategory.name) {
        throw new DatabaseError("Campos inválidos", { message: "Campos inválidos" });
      }
      const id = await productRepository.create(newCategory);

      res.status(StatusCodes.CREATED).json(id);
    } catch (error) {
      next(error);
    }
  }
);

productsRoute.put(
  "/products/:id",
  admAuthenticationMiddleware,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const modifiedCategory = req.body;
      modifiedCategory.id = id;

      await productRepository.update(modifiedCategory);

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

productsRoute.delete(
  "/products/:id",
  admAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await productRepository.remove(Number(id));
      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

export default productsRoute;
