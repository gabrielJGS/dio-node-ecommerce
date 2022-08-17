import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import UnathorizedError from "../models/errors/unathorized.error.model";

import JWT from "jsonwebtoken";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas");
    }
    const [authenticationType, token] = authorizationHeader.split(" ");
    if (authenticationType != "Bearer" || !token) throw new ForbiddenError("Tipo de autenticação inválido");

    const tokenPayload = JWT.verify(token, "my_secret_key");
    if (typeof tokenPayload !== "object" || !tokenPayload.sub) throw new ForbiddenError("Token inválido");
    if (!tokenPayload.isAdmin) throw new UnathorizedError("Não autorizado");
    const user = {
      id: tokenPayload.sub,
      email: tokenPayload.email,
    };
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
