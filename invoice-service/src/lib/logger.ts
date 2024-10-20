import {
  createLogger,
  format,
  transports,
  type LoggerOptions,
  type Logger,
} from "winston";

const loggerOptions: LoggerOptions = {
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${level}: ${message} - ${timestamp}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
};

export const logger: Logger = createLogger(loggerOptions);
