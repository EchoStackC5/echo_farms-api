import { Router } from "express";
import {
  createAdvert,
  getAllAdverts,
  getAdvertById,
  updateAdvert,
  deleteAdvert,
  getAdvertsByVendor,
} from "../controllers/ad_controller.js";

import { authenticate } from "../middleware/authenticate.js"
import { hasPermission } from "../middleware/authenticate.js";
import { multipleImages } from "../middleware/mutler.js";

export const adRouter = Router();


// console.log('jikjo',multipleImages.array('images', 5))
adRouter.post("/adverts", authenticate, hasPermission("create_advert"), multipleImages.array('images', 5), createAdvert);
adRouter.get("/adverts", getAllAdverts);
adRouter.get("/adverts/:id", getAdvertById);
adRouter.get("/adverts/vendor/dashboard", authenticate, hasPermission("view_vendor_ads"), getAdvertsByVendor);
adRouter.patch("/adverts/:id", authenticate, hasPermission("update_advert"), multipleImages.array('images', 5), updateAdvert);
adRouter.delete("/adverts/:id", authenticate, hasPermission("delete_advert"), deleteAdvert);

