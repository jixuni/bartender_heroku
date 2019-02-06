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
      <div key={brewery.id} className="row">
        <div className="col-md-3" align="center">
          <img
            className="img-responsive breweryImg"
            src={img("./brewery_animated.gif")}
            alt=""
          />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-12">Name: {brewery.name}</div>
          </div>
          <div className="row">
            <div className="col-12">
              <a href={brewery.website} target="_blank">
                Brewery Website
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12">Country: {country.name}</div>
          </div>
          <div className="row">
            <div className="col-12">{brewery.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BreweryDetail;
