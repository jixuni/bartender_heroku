import React from "react";
import { Link } from "react-router-dom";
import getPlaceholder from "./../utils/getPlaceholder";

const Beer = ({ data }) => {
  const img = require.context("../img", true);
  return (
    <div className="col-md-4 col-lg-3" align="center">
      <Link to={`/beers/${data.id}`}>
        <img
          className="img-responsive beerImg"
          src={img(getPlaceholder(data.category_id))}
          alt=""
        />
      </Link>
      <div className="col-12">{data.name}</div>
    </div>
  );
};

export default Beer;
