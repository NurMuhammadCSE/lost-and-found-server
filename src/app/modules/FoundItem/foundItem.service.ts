import prisma from "../../../shared/prisma";

interface FoundItemPayload {
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
}

const createFoundItemCategory = async (
  payload: FoundItemPayload,
  userId: string
) => {
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

export const foundItemsService = {
  createFoundItemCategory,
};
