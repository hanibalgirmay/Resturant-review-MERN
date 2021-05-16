import Http from "../http-common";

class ResturantDataService {
  getAll(page = 0) {
    return Http.get(`?page=${page}`);
  }

  get(id) {
    return Http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return Http.get(`?${by}=${query}&page=${page}`);
  }
  createReview(data) {
    return Http.post("/review", data);
  }

  updateReview(data) {
    return Http.put(`/review`, data);
  }

  deleteReview(id, user) {
    return Http.delete(`review?id=${id}`, { data: { user_id: user } });
  }

  getCuisines() {
    return Http.get(`/cuisnes`);
  }
}

export default new ResturantDataService();
