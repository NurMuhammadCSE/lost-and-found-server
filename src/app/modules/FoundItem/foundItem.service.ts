import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { foundItemsSearchAbleFields } from "./foundItem.constants";
import { paginationHelper } from "../../../helpars/paginationHelper";

interface FoundItemPayload {
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
}

// Service to create a found item
const createFoundItems = async (payload: FoundItemPayload, userId: string) => {
  const { categoryId, foundItemName, description, location } = payload;

  // Check if the category exists
  const categoryExists = await prisma.foundItemCategory.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new Error("Category does not exist");
  }

  const foundItem = await prisma.foundItem.create({
    data: {
      userId,
      categoryId,
      foundItemName,
      description,
      location,
    },
    include: {
      user: true,
      category: true,
    },
  });

  return foundItem;
};

// Service to get all found items with pagination, filtering, and sorting
const getAllFoundItems = async (filters: any, options: any) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.FoundItemWhereInput[] = [];

  // Apply search term across specified fields
  if (searchTerm) {
    andConditions.push({
      OR: foundItemsSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Apply specific filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.FoundItemWhereInput = { AND: andConditions };

  const foundItems = await prisma.foundItem.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      user: true,
      category: true,
    },
  });

  const total = await prisma.foundItem.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: foundItems,
  };
};

export const foundItemsService = {
  createFoundItems,
  getAllFoundItems,
};
