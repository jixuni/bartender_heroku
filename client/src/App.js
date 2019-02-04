import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar";
import Modal from "./components/modal";
import Beers from "./components/beers";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import ReviewForm from "./components/reviewForm";
import EditReviewForm from "./components/editReviewForm";
import BeerDetail from "./components/beerDetail";
import NotFound from "./components/notFound";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/common/logout";
import Profile from "./components/profile";
import "moment-timezone";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    showModal: false,
    underTwentyOne: ""
  };

  componentDidMount() {
    // if user is logged in or localStorage has the ageKey, no need to show modal
    const ageVerify = auth.verifyAge();
    const user = auth.getCurrentUser();
    if (!ageVerify) this.setState({ showModal: true });
    this.setState({ user });
  }

  handleClose = () => {
    // set a key in localStorage indicating over21 dis clicked
    auth.over21();
    this.setState({ showModal: false });
  };

  handleUnderAge = () => {
    const underTwentyOne = "You are not permitted to enter the site.";
    this.setState({ underTwentyOne });
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <Modal
          show={this.state.showModal}
          message={this.state.underTwentyOne}
          onClose={this.handleClose}
          onUnderAge={this.handleUnderAge}
        />
        <main className="container mt-4">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute
              path="/review/edit/:id"
              component={EditReviewForm}
            />
            <ProtectedRoute path="/review/:id" component={ReviewForm} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/beers/:id" component={BeerDetail} />
            <Route path="/beers" component={Beers} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/beers" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
