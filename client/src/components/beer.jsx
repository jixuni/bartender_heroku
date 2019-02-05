import React from "react";
import { Link } from "react-router-dom";
import getPlaceholder from "./../utils/getPlaceholder";

const Beer = ({ data }) => {
  const img = require.context("../img", true);
  return (
    <div key={data.id} className="col-md-6 col-lg-3" align="center">
      <Link to={`/beers/${data.id}`}>
        <img
          className="img-responsive beerImg"
          src={img(getPlaceholder(data.category_id))}
          alt=""
        />
      </Link>
      <p>{data.name}</p>
    </div>
  );
};

export default Beer;
