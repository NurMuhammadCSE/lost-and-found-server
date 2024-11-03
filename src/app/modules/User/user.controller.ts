import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  // res.status(201).json({
  //   success: true,
  //   statusCode: httpStatus.OK,
  //   message: "User registered successfully",
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success:true,
    message:"User Create Successfully",
    data: result
  })
});

export const userController = {
  createUser,
};
