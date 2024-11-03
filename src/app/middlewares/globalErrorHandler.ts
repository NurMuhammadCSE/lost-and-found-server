import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let errorDetails = err;

  // Zod validation errorDetails handling
  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
    errorDetails = {
      issues: err.errors.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }
  // Prisma validation errorDetails handling
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
    errorDetails = err.message;
  }
  // Prisma known request errorDetails handling
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.CONFLICT;
      message = "Duplicate Key Error";
      errorDetails = err.meta;
    }
  }

  res.status(statusCode).json({
    success,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
