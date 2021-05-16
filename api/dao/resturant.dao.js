import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let resturants;

export default class ResturantDAO {
  static async injectDB(conn) {
    if (resturants) {
      console.log("error");
      return;
    }
    try {
      console.log("connected instance");
      resturants = await conn
        .db(process.env.REVIEW_NS)
        .collection("restaurants");
    } catch (error) {
      console.error(
        `unable to establsh a collection handlein resturantDAO: ${error}`
      );
    }
  }

  static async getResturants({
    filters = null,
    page = 0,
    resturantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
    let cursor;
    try {
      cursor = await resturants.find(query);
    } catch (e) {
      console.error(`unable to issue find command: ${e}`);
      return { resturantsList: [], totalNumberRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(resturantsPerPage)
      .skip(resturantsPerPage * page);

    try {
      const resturantsList = await displayCursor.toArray();
      const totalNumberRestaurants = await resturants.countDocuments(query);

      return { resturantsList, totalNumberRestaurants };
    } catch (error) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${error}`
      );
      return { resturantsList: [], totalNumberRestaurants: 0 };
    }
  }

  static async findResturantById(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$resturant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];

      return await resturants.aggregate(pipeline).next();
    } catch (error) {
      console.error(`Something went wrong in getResturantById: ${error}`);
      throw error;
    }
  }

  static async getCuisines() {
    let cuisines = [];

    try {
      cuisines = await resturants.distinct("cuisine");
      return cuisines;
    } catch (error) {
      console.error(`Unable to get Cuisines, ${error}`);
      return cuisines;
    }
  }
}
