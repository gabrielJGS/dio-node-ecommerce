import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import DatabaseError from "../models/errors/database.error.model";

const usersRoute = Router();

usersRoute.get("/users", jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRoute.get("/users/:id", jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await userRepository.findById(Number(id));
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body;
    const id = await userRepository.create(newUser);

    res.status(StatusCodes.CREATED).json(id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRoute.put(
  "/users/:id",
  jwtAuthenticationMiddleware,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const modifiedUser = req.body;
      if (req.user.id != id)
        throw new DatabaseError("Não é possível atualizar outro usuário", {
          message: "Não é possível atualizar outro usuário",
        });
      modifiedUser.id = id;

      await userRepository.update(modifiedUser);

      res.status(StatusCodes.OK).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

usersRoute.delete(
  "/users/:id",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (req.user.id != id)
        throw new DatabaseError("Não é possível atualizar outro usuário", {
          message: "Não é possível atualizar outro usuário",
        });
      await userRepository.remove(Number(id));
      res.status(StatusCodes.OK).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default usersRoute;
