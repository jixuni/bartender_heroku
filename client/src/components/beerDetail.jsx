import React, { Component } from "react";
import Reviews from "./review";
import StarRatings from "react-star-ratings";
import beerService from "../services/beerService";
import reviewService from "../services/reviewService";
import { toast } from "react-toastify";
import getPlaceholder from "./../utils/getPlaceholder";
import { Link } from "react-router-dom";
import { bac } from "./../utils/bloodAlcohol";

class BeerDetail extends Component {
  state = {
    beer: [],
    reviews: [],
    averageRating: 0
  };

  async componentDidMount() {
    const beer = await beerService.getBeer(this.props.match.params.id);
    const reviews = await reviewService.getReviewByBeer(
      this.props.match.params.id
    );
    const averageRating = this.getAverageRating(reviews.data);
    this.setState({ beer: beer.data, reviews: reviews.data, averageRating });
  }

  getAverageRating(reviews) {
    if (reviews.length === 0) return null;
    const ratings = reviews.map(r => r.rating);
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return averageRating;
  }

  handleReview(id) {
    this.props.history.push(`/review/${id}`);
  }

  handleDelete = async review => {
    const originalReviews = this.state.reviews;
    const reviews = originalReviews.filter(r => r.id !== review.id);
    this.setState({ reviews });

    try {
      await reviewService.deleteReview(review.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This review has already been deleted");
      }
      this.setState({ reviews: originalReviews });
    }
  };

  handleEdit = id => {
    this.props.history.push(`/review/edit/${id}`);
  };

  render() {
    const { beer, reviews, averageRating } = this.state;
    const brewery = { ...beer.Brewery };
    const flavor = { ...beer.Flavor };
    const img = require.context("../img", true);
    return (
      <React.Fragment key={beer.id}>
        <div className="row">
          <div className="col-md-3" align="center">
            <img
              className="img-responsive beerImg"
              src={img(getPlaceholder(beer.category_id))}
              alt=""
            />
          </div>
          <div className="col-md-9">
            <div className="col-12">Name: {beer.name}</div>
            <div className="col-12">ABV: {beer.abv}</div>
            <div className="col-12">Flavor: {flavor.name}</div>
            <div className="col-12">Brewery:</div>
            <div className="col-12">
              <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
            </div>
            {averageRating && (
              <React.Fragment>
                <div className="col-12">Average Rating:</div>
                <div className="col-12">
                  <StarRatings
                    rating={averageRating}
                    starRatedColor="red"
                    starDimension="20px"
                    numberOfStars={5}
                    starSpacing="1px"
                  />
                </div>
              </React.Fragment>
            )}
            <hr />
            <div className="col-12">{beer.description}</div>
            <hr />
            {beer.abv && parseInt(beer.abv) !== 0 && (
              <div className="col-12">
                <p>
                  After one drink of this beer within 1 hour, your Blood Alcohol
                  Level will be *:
                </p>
                <div className="row">
                  <div className="col-6">{`Male: ${bac(beer.abv, "m")}%`}</div>
                  <div className="col-6">{`Female: ${bac(
                    beer.abv,
                    "f"
                  )}%`}</div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 disclaimer">
                    * based on a 12oz serving, average American male and female
                    weight and tolerance.{" "}
                  </div>
                  <div className="col-12 disclaimer">
                    * Legal Blood Alcohol Limit is 0.08%{" "}
                  </div>
                  <div className="col-12 disclaimer">
                    * PLEASE DON'T DRINK AND DRIVE
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <button
            onClick={() => this.handleReview(beer.id)}
            className="btn btn-primary ml-auto"
          >
            Write a review
          </button>
        </div>
        {reviews.map(r => (
          <Reviews
            key={r.id}
            data={r}
            onDelete={this.handleDelete}
            onModify={this.handleEdit}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default BeerDetail;
