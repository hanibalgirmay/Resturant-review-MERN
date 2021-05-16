import express from "express";
import ResturantController from "../controllers/resturants.controller.js";
import ReviewController from "../controllers/review.controller.js";

const router = express.Router();

router.route("/network").get(ResturantController.checkNetwork);
router.route("/").get(ResturantController.apiGetResturants);
router.route("/id/:id").get(ResturantController.apiGetResturantById);
router.route("/cuisnes").get(ResturantController.apiGetResturantCuisines);

router
  .route("/review")
  .post(ReviewController.apiPostReview)
  .put(ReviewController.apiUpdateReview)
  .delete(ReviewController.apiDeleteReview);

export default router;
