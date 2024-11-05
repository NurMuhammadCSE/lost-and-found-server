// claim.service.ts
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";

interface ClaimPayload {
  userId: string;
  foundItemId: string;
  distinguishedFeatures: string;
  lostDate: string;
}

const createClaim = async (payload: ClaimPayload) => {
  const { userId, foundItemId, distinguishedFeatures, lostDate } = payload;

  // Check if the found item exists
  const foundItemExists = await prisma.foundItem.findUnique({
    where: { id: foundItemId },
  });
  if (!foundItemExists) {
    throw new Error("Found item does not exist");
  }

  // Create the claim
  const claim = await prisma.claim.create({
    data: {
      userId,
      foundItemId,
      distinguishedFeatures,
      lostDate: new Date(lostDate),
      status: "PENDING",
    },
  });

  return claim;
};

export const claimService = {
  createClaim,
};
