import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from "jsonwebtoken";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas", { message: "Credenciais não informadas" });
    }
    const [authenticationType, token] = authorizationHeader.split(" ");
    if (authenticationType != "Bearer" || !token)
      throw new ForbiddenError("Tipo de autenticação inválido", { message: "Tipo de autenticação inválido" });

    try {
      const tokenPayload = JWT.verify(token, "my_secret_key");
      if (typeof tokenPayload !== "object" || !tokenPayload.sub)
        throw new ForbiddenError("Token inválido", { message: "Token inválido" });

      const user = {
        id: tokenPayload.sub,
        email: tokenPayload.email,
      };
      req.user = user;

      next();
    } catch (error: any) {
      console.error(error);
      if (error.message == "jwt expired") throw new ForbiddenError("Token expirado", { message: "Token expirado" });
      else throw new ForbiddenError("Token Inválido", { message: "Token Inválido" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
