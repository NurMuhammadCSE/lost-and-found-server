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
      profile: true, // Include the profile in the response
    },
  });

  return userData;
};

export const userService = {
  createUser, // Ensure this matches the function name
};
