import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createUser = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      profile: {
        create: {
          bio: data.profile.bio,
          age: data.profile.age,
        },
      },
    },
    include: {
      profile: true, 
    },
  });

  return userData;
};

const createUserApproachTwo = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    name: data.user.name,
    email: data.user.email,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.userProfile.create({
      data: data.profile,
    });

    return createdAdminData;
  });

  return result;
};

const getProfile = async (userId: string) => {
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    include: {
      user: true,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};

const updateProfile = async (userId: string, profileData: { bio?: string; age?: number }) => {
  const updatedProfile = await prisma.userProfile.update({
    where: { userId },
    data: profileData,
    include: {
      user: true, // Include user data in the response
    },
  });

  if (!updatedProfile) {
    throw new Error("Profile not found or could not be updated");
  }

  return updatedProfile;
};


export const userService = {
  createUser,
  createUserApproachTwo,
  getProfile,
  updateProfile
};
