import React from "react";
import StarRatings from "react-star-ratings";
import Moment from "react-moment";
import auth from "../services/authService";
import { Link } from "react-router-dom";

const Reviews = ({ data, onDelete, onModify }) => {
  const user = auth.getCurrentUser();

  return (
    <div className="row border border-primary mt-2 mb-2 p-2">
      {data.Beer && (
        <div className="col-12">
          Review for:{" "}
          <Link to={`/beers/${data.Beer.id}`}>{data.Beer.name}</Link>
        </div>
      )}
      <div className="col-12">{data.title}</div>
      <div className="col-md-4">
        <p>{data.User.name}</p>
      </div>
      <div className="col-md-4">
        <StarRatings
          rating={data.rating}
          starRatedColor="red"
          starDimension="15px"
          numberOfStars={5}
          starSpacing="1px"
        />
      </div>
      <div className="col-md-4">
        <Moment format="YYYY-MM-DD hh:mm A">{data.updated_at}</Moment>
      </div>
      <div className="col-12">{data.comment}</div>
      {user && user.id === data.User.id && (
        <React.Fragment>
          <button
            onClick={() => onModify(data.id)}
            className="btn btn-primary m-2"
          >
            Edit
          </button>
          <button onClick={() => onDelete(data)} className="btn btn-danger m-2">
            Delete
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Reviews;
