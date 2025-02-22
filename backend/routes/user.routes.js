import express from "express";
import {
  uploadPhotos,
  userLogin,
  userLogout,
  userProfile,
  userRegistration,
} from "../controller/user.controller.js";
import { upload } from "../utils/multer.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/register")
  .post(upload.single("profilePicture"), userRegistration);
router.route("/login").post(userLogin);

router.use(isAuthenticated);
router.route("/logout").post(userLogout);
router.route("/profile").get(userProfile);
router.route("/my-photos").post(upload.array("photos", 5), uploadPhotos);

export default router;
