import React from "react";
import { Link } from "react-router-dom";

const Beer = ({ data }) => {
  return (
    <div key={data.id} className="col-md-6 col-lg-3" align="center">
      <Link to={`/beers/${data.id}`}>
        <img
          className="img-responsive"
          src="https://via.placeholder.com/200x250"
          alt=""
        />
      </Link>
      <p>{data.name}</p>
    </div>
  );
};

export default Beer;
