import React from "react";
import StarRatings from "react-star-ratings";
import Moment from "react-moment";
import auth from "../services/authService";
import { Link } from "react-router-dom";

const Reviews = ({ data, onDelete, onModify }) => {
  const user = auth.getCurrentUser();

  return (
    <div className="col-12">
      <hr />
      {data.Beer && (
        <div className="row">
          <div className="col-12">
            Review for:{" "}
            <Link to={`/beers/${data.Beer.id}`}>{data.Beer.name}</Link>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-4">{data.User.name}</div>
        <div className="col-md-4 font-weight-bold">
          <StarRatings
            rating={data.rating}
            starRatedColor="red"
            starDimension="20px"
            numberOfStars={5}
            starSpacing="1px"
          />
        </div>

        <div className="col-md-4">
          <Moment format="YYYY-MM-DD hh:mm A">{data.updated_at}</Moment>
        </div>
      </div>
      <div className="row">
        <div className="col-12 font-weight-bold">{data.title}</div>
        <div className="col-12">{data.comment}</div>
      </div>
      {user && user.id === data.User.id && (
        <div className="col-12">
          <button
            onClick={() => onModify(data.id)}
            className="btn btn-primary m-2"
          >
            Edit
          </button>

          <button onClick={() => onDelete(data)} className="btn btn-danger m-2">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
