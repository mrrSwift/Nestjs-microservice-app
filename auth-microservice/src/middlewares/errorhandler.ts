import { Request, Response, NextFunction } from 'express';
import { constants } from '../constants';

interface CustomError extends Error {
  stack?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Failed",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.METHOD_NOT_ALLOWED:
      res.status(statusCode).json({
        title: "Method Not Allowed",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SITE_UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Site Unauthorized",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.TOO_MANY:
      res.status(statusCode).json({
        title: "Too Many Requests",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log(err);
      res.status(500).json({
        title: "Unhandled Error",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

export default errorHandler;