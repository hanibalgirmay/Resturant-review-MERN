import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ResturantDAO from "./api/dao/resturant.dao.js";
import ReviewDAO from "./api/dao/review.dao.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8009;

// console.log(process.env.MONGODB);
MongoClient.connect(process.env.MONGODB, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err.stack);
    // process.exit(1);
  })
  .then(async (client) => {
    await ResturantDAO.injectDB(client);
    await ReviewDAO.injectDB(client);
    app.listen(port, () => console.log(`server is running on ${port}`));
  });
