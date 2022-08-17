import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error.model";
import ForbiddenError from "../models/errors/forbidden.error.model";
import UnauthorizedError from "../models/errors/unathorized.error.model";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DatabaseError) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  } else if (error instanceof ForbiddenError) {
    res.status(StatusCodes.FORBIDDEN).json(error);
  } else if (error instanceof UnauthorizedError) {
    res.status(StatusCodes.UNAUTHORIZED).json(error);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

export default errorHandler;
