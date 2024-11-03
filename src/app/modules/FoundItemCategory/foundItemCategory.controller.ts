import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { foundItemCategoryService } from "./foundItemCategory.service";
import httpStatus from "http-status";

const createFoundItemCategory = catchAsync(async (req, res) => {
  const result = await foundItemCategoryService.createFoundItemCategory(
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Create Found Item Category is Created Successfully",
    data: result,
  });
});

export const createFoundItemCategoryController = {
  createFoundItemCategory,
};
