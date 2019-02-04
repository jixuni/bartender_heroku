import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import reviewService from "../services/reviewService";
import auth from "../services/authService";
import Rating from "react-rating";
import { toast } from "react-toastify";

class EditReviewForm extends Form {
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

  async componentDidMount() {
    const review = await reviewService.getReview(this.props.match.params.id);
    const data = { ...this.state.data };
    data.user_id = review.data.user_id;
    data.beer_id = review.data.beer_id;
    data.title = review.data.title;
    data.rating = review.data.rating;
    data.comment = review.data.comment;
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
      await reviewService.editReview(this.props.match.params.id, data);
      const { beer_id } = data;
      // reload back to the initial beer details page
      window.location = `/beers/${beer_id}`;
    } catch (ex) {
      if ((ex.response && ex.response.status === 401) || 404) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    const currentUser = auth.getCurrentUser();
    const { rating, user_id } = this.state.data;
    let initialRating = 0;
    const authorized = currentUser.id === user_id;
    rating === "" ? (initialRating = 0) : (initialRating = rating);

    return (
      authorized && (
        <div>
          <h1>Edit Review</h1>
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
      )
    );
  }
}

export default EditReviewForm;
