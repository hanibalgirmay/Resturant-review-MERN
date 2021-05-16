import React, { useState } from "react";
import ResturantDataService from '../services/resturant.api';
import { Link } from 'react-router-dom';

const AddReview = (props) => {
  let intaialValue = "";
  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    intaialValue = props.location.state.currentReview.text
  }
  const [review, setReview] = useState(intaialValue);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChnage = e => {
    setReview(e.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      resturant_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview.review_id
      ResturantDataService.updateReview(data)
        .then(res => {
          setSubmitted(true);
          console.log(res.data)
        }).catch(err => {
          console.error(err)
        })
    } else {
      ResturantDataService.createReview(data)
        .then(res => {
          setSubmitted(true);
        }).catch(e => console.error(e))
    }
  }
  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link tp={"/resturants/" + props.match.params.id} className="btn btn-secondary">
                Back to Resturant
              </Link>
            </div>
          ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="description">{editing ? 'Edit' : 'Create'} Review</label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    name="text"
                    onChange={handleInputChnage}
                    value={review} required />
                </div>
                <button className="btn btn-primary" onClick={saveReview}>Submit</button>
              </div>
            )}

        </div>
      ) : (
          <div>
            <h4>Login to review</h4>
          </div>
        )}
    </div>
  );
};

export default AddReview;
