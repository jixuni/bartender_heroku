import React, { Component } from "react";
import breweryService from "../services/breweryService";

class BreweryDetail extends Component {
  state = {
    brewery: []
  };

  async componentDidMount() {
    const brewery = await breweryService.getBrewery(this.props.match.params.id);
    this.setState({ brewery: brewery.data });
  }

  render() {
    const { brewery } = this.state;
    const country = { ...brewery.Country };
    const img = require.context("../img", true);
    return (
      <React.Fragment key={brewery.id}>
        <div className="row">
          <div className="col-md-3" align="center">
            <img
              className="img-responsive breweryImg"
              src={img("./other.jpeg")}
              alt=""
            />
          </div>
          <div className="col-md-9">
            <div className="row">Name: {brewery.name}</div>
            <div className="row">
              <a href={brewery.website} target="_blank">
                Brewery Website
              </a>
            </div>
            <div className="row">Country: {country.name}</div>
            <div className="row">{brewery.description}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BreweryDetail;
