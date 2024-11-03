import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { foundItemsService } from "./foundItem.service";
import httpStatus from "http-status";

const createFoundItems = catchAsync(async (req, res) => {

    
  const accessToken = req.headers.authorization;
  console.log(accessToken)
  const decoded = jwtHelpers.verifyToken(accessToken, config.jwt.jwt_secret as Secret); // Adjust as necessary
  console.log(decoded)
  const userId = decoded.userId; // Assuming your JWT payload contains userId

  console.log(userId)

  const result = await foundItemsService.createFoundItemCategory(req.body, userId);


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Found Items Created Successfully",
    data: result,
  });
});

export const FoundItemsController = {
  createFoundItems,
};
