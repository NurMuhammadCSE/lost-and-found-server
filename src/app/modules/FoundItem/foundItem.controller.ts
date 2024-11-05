import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { foundItemsService } from "./foundItem.service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const createFoundItems = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  // console.log(accessToken);
  const decoded = jwtHelpers.verifyToken(
    accessToken as string,
    config.jwt.jwt_secret as Secret
  );
  // console.log(decoded);
  const userId = decoded.userId; // Assuming your JWT payload contains userId

  // console.log(userId);

  const result = await foundItemsService.createFoundItems(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Found Items Created Successfully",
    data: result,
  });
});


const getAllFoundItems = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["searchTerm", "foundItemName"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await foundItemsService.getAllFoundItems(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Found items retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const FoundItemsController = {
  createFoundItems,
  getAllFoundItems,
};
