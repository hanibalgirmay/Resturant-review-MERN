import ResturantDAO from "../api/dao/resturant.dao.js";

export default class ResturantsController {
  static async apiGetResturants(req, res, next) {
    const resturantsPerPage = req.query.resturantsPerPage
      ? parseInt(req.query.resturantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const {
      resturantsList,
      totalNumberRestaurants,
    } = await ResturantDAO.getResturants({
      filters,
      page,
      resturantsPerPage,
    });

    let response = {
      resturants: resturantsList,
      page: page,
      filters: filters,
      entries_per_page: resturantsPerPage,
      total_results: totalNumberRestaurants,
    };

    res.json(response);
  }

  static async apiGetResturantById(req, res, next) {
    try {
      let id = req.params.id || {};
      let resturant = await ResturantDAO.findResturantById(id);
      if (!resturant) {
        res.status(404).json({ error: "Not Found" });
        return;
      }

      res.json(resturant);
    } catch (error) {
      console.error(`api, ${error}`);
      res.status(500).json({ error });
    }
  }

  static async apiGetResturantCuisines(req, res, next) {
    try {
      let cuisines = await ResturantDAO.getCuisines();
      res.json(cuisines);
    } catch (error) {
      console.error(`api, ${error}`);
      res.status(500).json({ error });
    }
  }

  static async checkNetwork(req, res) {
    console.log(req);
    res.json(req);
  }
}
