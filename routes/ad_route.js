import {Router} from "express";
import {
  createAdvert,
  getAllAdverts,
  getAdvertById,
  updateAdvert,
  deleteAdvert
} from "../controllers/ad_controller.js";

import { authenticate } from "../middleware/authenticate.js"
import { hasPermission } from "../middleware/authenticate.js";

export const adRouter = Router();

adRouter.post("/adverts", authenticate, hasPermission("create_advert"), createAdvert);
adRouter.get("/adverts", getAllAdverts);
adRouter.get("/adverts/:id", getAdvertById);
adRouter.patch("/adverts/:id", authenticate, hasPermission("update_advert"), updateAdvert);
adRouter.delete("/adverts/:id", authenticate, hasPermission("delete_advert"), deleteAdvert);

