// claim.controller.ts
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import { claimService } from "./claim.service";

const createClaim = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const decoded = jwtHelpers.verifyToken(
    accessToken as string,
    config.jwt.jwt_secret as Secret
  );
  const userId = decoded.userId;

  const result = await claimService.createClaim({
    ...req.body,
    userId,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Claim created successfully",
    data: result,
  });
});

const getAllClaims = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const decoded = jwtHelpers.verifyToken(
    accessToken as string,
    config.jwt.jwt_secret as Secret
  );
  const userId = decoded.userId;

  const result = await claimService.getAllClaims(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Claims retrieved successfully",
    data: result,
  });
});


const updateClaimStatus = catchAsync(async (req, res) => {
    const { claimId } = req.params;
    const { status } = req.body;
  
    // Validate user authorization
    const accessToken = req.headers.authorization;
    jwtHelpers.verifyToken(accessToken as string, config.jwt.jwt_secret as Secret);
  
    const updatedClaim = await claimService.updateClaimStatus(claimId, status);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Claim updated successfully",
      data: updatedClaim,
    });
  });
  

export const ClaimController = {
  createClaim,
  getAllClaims,
  updateClaimStatus
};
