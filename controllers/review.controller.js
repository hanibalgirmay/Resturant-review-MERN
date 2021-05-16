import ReviewDAO from "../api/dao/review.dao.js";

export default class ReviewController {
  static async apiPostReview(req, res, next) {
    try {
      const resturantId = req.body.resturant_id;
      const review = req.body.text;
      const user = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const ReviewResponse = await ReviewDAO.addReview(
        resturantId,
        user,
        review,
        date
      );
      console.log(ReviewResponse);
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const userId = req.body.user_id;
      const date = new Date();

      const reviewResponse = await ReviewDAO.updateReview(
        reviewId,
        userId,
        text,
        date
      );

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      console.log(reviewResponse);
      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update review - user may not be orginal poster"
        );
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;

      const reviewResponse = await ReviewDAO.deleteReview(reviewId, userId);

      // if(reviewResponse)

      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
