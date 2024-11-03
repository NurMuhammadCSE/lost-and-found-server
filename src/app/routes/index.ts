import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { foundItemCategoryRoutes } from "../modules/FoundItemCategory/foundItemCategory.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/found-item-categories",
    route: foundItemCategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
