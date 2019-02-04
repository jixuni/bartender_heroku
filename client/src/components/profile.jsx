import React, { Component } from "react";
import Reviews from "./review";
import reviewService from "../services/reviewService";
import userService from "../services/userService";
import auth from "../services/authService";
import { toast } from "react-toastify";

class Profile extends Component {
  state = {
    reviews: [],
    user: []
  };

  async componentDidMount() {
    const currentUser = auth.getCurrentUser();
    const reviews = await reviewService.getReviewByUser(currentUser.id);
    const user = await userService.getUser(currentUser.id);
    this.setState({ reviews: reviews.data, user: user.data });
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
    const { reviews, user } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3" align="center">
            <img
              className="img-responsive"
              src="https://via.placeholder.com/200x250"
              alt=""
            />
          </div>
          <div className="col-md-9">
            <div className="row">Name: {user.name}</div>
            <div className="row">Email: {user.email}</div>
          </div>
        </div>
        <hr />
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

export default Profile;
