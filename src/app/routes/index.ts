import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { foundItemCategoryRoutes } from "../modules/FoundItemCategory/foundItemCategory.routes";
import { foundItemsRoutes } from "../modules/FoundItem/foundItem.routes";
import { claimRoutes } from "../modules/Claim/calim.routes";

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
  {
    path: "/found-items",
    route: foundItemsRoutes,
  },
  {
    path: "/claims",
    route: claimRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
