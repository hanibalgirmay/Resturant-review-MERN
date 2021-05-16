import Axios from "axios";

export default Axios.create({
  baseURL: "http://localhost:4500/api/v1/resturant",
  headers: {
    "Content-type": "application/json",
  },
});
