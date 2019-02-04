import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import Rating from "react-rating";
import reviewService from "../services/reviewService";
import { toast } from "react-toastify";

class ReviewForm extends Form {
  state = {
    data: { user_id: "", beer_id: "", title: "", rating: "", comment: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .max(100)
      .required()
      .label("Title"),
    comment: Joi.string()
      .max(1000)
      .required()
      .label("Description"),
    rating: Joi.number()
      .required()
      .label("Rating"),
    beer_id: Joi.number().integer(),
    user_id: Joi.number().integer()
  };

  componentDidMount() {
    const data = { ...this.state.data };
    const user_id = auth.getCurrentUser().id;
    const beer_id = this.props.match.params.id;
    data.user_id = user_id;
    data.beer_id = beer_id;

    this.setState({ data });
  }

  handleRating(rating) {
    const data = { ...this.state.data };
    data.rating = rating;
    this.setState({ data });
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await reviewService.submitReview(data);
      const { beer_id } = data;
      // reload back to the initial beer details page
      window.location = `/beers/${beer_id}`;
    } catch (ex) {
      if ((ex.response && ex.response.status === 404) || 401) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    const { rating } = this.state.data;
    let initialRating = 0;
    rating === "" ? (initialRating = 0) : (initialRating = rating);

    return (
      <div>
        <h1>Review</h1>
        <form onSubmit={this.handleSubmit}>
          <h5>How would you rate this beer:</h5>
          <Rating
            initialRating={initialRating}
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            onClick={rating => this.handleRating(rating)}
          />
          {this.renderInput("title", "Title", "title")}
          {this.renderTextArea("comment", "Comment")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default ReviewForm;
