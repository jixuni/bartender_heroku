import React, { Component } from "react";
import Reviews from "./review";
import StarRatings from "react-star-ratings";
import beerService from "../services/beerService";
import reviewService from "../services/reviewService";
import { toast } from "react-toastify";

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

    return (
      <React.Fragment key={beer.id}>
        <div className="row">
          <div className="col-md-3" align="center">
            <img
              className="img-responsive"
              src="https://via.placeholder.com/200x250"
              alt=""
            />
          </div>
          <div className="col-md-9">
            <div className="row">Name: {beer.name}</div>
            <div className="row">ABV: {beer.abv}</div>
            <div className="row">Flavor: {flavor.name}</div>
            <div className="row">Brewery: {brewery.name}</div>
            {averageRating && (
              <div className="row">
                <p>Average Rating:</p>
                <StarRatings
                  rating={averageRating}
                  starRatedColor="gold"
                  starDimension="20px"
                  numberOfStars={5}
                  starSpacing="1px"
                />
              </div>
            )}
            <div className="row">{beer.description}</div>
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
