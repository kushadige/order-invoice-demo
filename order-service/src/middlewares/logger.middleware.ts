import { logger } from "@/lib/logger";

import { type Request, type Response, type NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  // Log request details
  logger.info(`Incoming request: ${req.method} ${req.url}`);

  // Response event listener
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(
      `Response: ${res.statusCode} ${req.method} ${req.url} - ${duration}ms`
    );
  });

  next();
};
