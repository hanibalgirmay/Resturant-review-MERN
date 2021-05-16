import React, { useState, useEffect } from "react";
import ResturantDataService from "../services/resturant.api";
import { Link } from "react-router-dom";

const Resturant = (props) => {
  const intialState = {
    id: null,
    name: "",
    address: "",
    cuisine: "",
    reviews: [],
  };
  const [resturant, setResturant] = useState(intialState);

  const getResturant = (id) => {
    ResturantDataService.get(id)
      .then((res) => {
        setResturant(res.data);
        console.log("resturant byId__:", res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getResturant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    ResturantDataService.deleteReview(reviewId, props.user.id)
      .then((res) => {
        setResturant((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {resturant ? (
        <div>
          <h5>{resturant.name}</h5>
          <p>
            <strong>Cuisine: </strong> {resturant.cuisine} <br />
            <strong>Address: </strong> {resturant.address.building}{" "}
            {resturant.address.street}, {resturant.address.zipcode}
          </p>
          <Link
            to={"/resturants/" + props.match.params.id + "/review"}
            className="btn btn-primary"
          >
            Add Review
          </Link>
          <h4>Reviews</h4>
          <div className="row">
            {resturant.reviews.length > 0 ? (
              resturant.reviews.map((review, index) => {
                return (
                  <div key={index} className="col-lg-4 pb-1">
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text} <br />
                          <strong>User: </strong>
                          {review.name} <br />
                          <strong>Date: </strong>
                          {review.date}
                        </p>
                        {props.user && props.user.id === review.user_id && (
                          <div className="row">
                            <a
                              onClick={() => deleteReview(review._id, index)}
                              className="btn btn-danger col-lg-5 mx-1 mb-1"
                            >
                              Delete
                            </a>
                            <Link
                              to={{
                                pathname:
                                  "/resturants/" +
                                  props.match.params.id +
                                  "/review",
                                state: {
                                  currentReview: review,
                                },
                              }}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No resturant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Resturant;
