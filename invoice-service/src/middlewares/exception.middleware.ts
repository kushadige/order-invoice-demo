import { logger } from "@/lib/logger";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { type Request, type Response, type NextFunction } from "express";

export const exceptionMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error:", err);

  // Zod Error Handling
  if (err instanceof z.ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation Error",
      details: err.errors.map((error) => error.message),
    });
  }

  // Prisma Error Handling
  if (isPrismaError(err)) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Prisma Error",
      details: err.message,
    });
  }

  // Syntax Error Handling
  if (err instanceof SyntaxError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid JSON payload",
      details: err.message,
    });
  }

  // Default Error Handling
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    details: err.message,
  });
};

const isPrismaError = (error: Error) => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  );
};
