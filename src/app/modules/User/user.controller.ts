import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

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

const getProfile = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;

  const decoded = jwtHelpers.verifyToken(
    accessToken as string,
    config.jwt.jwt_secret as Secret
  );
  const userId = decoded.userId;

  const profile = await userService.getProfile(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile retrieved successfully",
    data: profile,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const decoded = jwtHelpers.verifyToken(accessToken as string, config.jwt.jwt_secret as Secret);
  const userId = decoded.userId;

  const profileData = req.body; // Extract bio and age from the request body

  const updatedProfile = await userService.updateProfile(userId, profileData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: updatedProfile,
  });
});

export const userController = {
  createUser,
  getProfile,
  updateProfile
};
