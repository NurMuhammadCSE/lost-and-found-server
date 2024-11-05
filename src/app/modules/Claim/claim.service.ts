// claim.service.ts
import prisma from "../../../shared/prisma";
import { ClaimStatus, Prisma } from "@prisma/client";

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

const getAllClaims = async (userId: string) => {
  const claims = await prisma.claim.findMany({
    where: {
      userId,
    },
    include: {
      foundItem: {
        include: {
          user: true,
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return claims;
};

const updateClaimStatus = async (claimId: string, status: ClaimStatus) => {
  // Check if the claim exists
  const claim = await prisma.claim.findUnique({
    where: { id: claimId },
  });

  if (!claim) {
    throw new Error("Claim not found");
  }

  // Update the claim's status
  const updatedClaim = await prisma.claim.update({
    where: { id: claimId },
    data: { status },
  });

  return updatedClaim;
};

export const claimService = {
  createClaim,
  getAllClaims,
  updateClaimStatus,
};
