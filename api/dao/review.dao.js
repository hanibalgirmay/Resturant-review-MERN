import mongodb from "mongodb";

const ObjectId = mongodb.ObjectID;

let reviews;

export default class ReviewDAO {
  static async injectDB(conn) {
    if (reviews) {
      console.log("load..");
      return;
    }
    try {
      reviews = await conn.db(process.env.REVIEW_NS).collection("reviews");
    } catch (error) {
      console.error(
        `unable to establsih collection handle in reviewDAO:  ${error}`
      );
    }
  }

  static async addReview(resturantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        text: review,
        resturant_id: ObjectId(resturantId),
        date: date,
      };

      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      console.error(`unable to post rerview: ${error}`);
      return { error };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } }
      );

      return updateResponse;
    } catch (error) {
      console.error(`Unable to update review: ${error}`);
      return error;
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (error) {
      console.error(`Unable to remove or delete review: ${error}`);
      return { error };
    }
  }
}
