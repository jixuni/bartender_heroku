import React, { Component } from "react";
import Filter from "./filter";
import paginate from "../utils/paginate";
import Pagination from "./common/pagination";
import Beer from "./beer";
import _ from "lodash";
import {
  getAllBeer,
  searchBeer,
  searchBeerByCategory
} from "./../services/beerService";
import { getAllCategory } from "./../services/categoryService";

class Beers extends Component {
  state = {
    beers: [],
    searchBeers: [],
    categories: [],
    pageSize: 8,
    startId: 1,
    endId: 40,
    currentPage: 1,
    searchQuery: "",
    catQuery: ""
  };

  async componentDidMount() {
    const beerList = await getAllBeer(this.state.startId, this.state.endId);
    const beers = [].concat.apply([], beerList.data);
    const categoryList = await getAllCategory();
    const categories = [].concat.apply([], categoryList.data);
    this.setState({ beers, categories });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handlePageNext = async () => {
    const newPage = this.state.currentPage + 1;
    const newStartId = this.state.endId + 1;
    const newEndId = this.state.endId + this.state.pageSize * 2;
    const existingBeerList = [...this.state.beers];
    const beerList = await getAllBeer(newStartId, newEndId);
    const newBeers = [].concat.apply([], beerList.data);
    const beers = [...existingBeerList, ...newBeers];
    console.log(beers);
    this.setState({
      beers,
      currentPage: newPage,
      startId: newStartId,
      endId: newEndId
    });
  };

  handlePagePrevious = () => {
    const newPage = this.state.currentPage - 1;
    this.setState({ currentPage: newPage });
  };

  // handleSort = sortColumn => {
  //   this.setState({ sortColumn });
  // };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      searchBeers,
      beers: allBeers,
      searchQuery,
      catQuery
    } = this.state;

    let filteredBeer = [];
    if (searchQuery || catQuery) {
      filteredBeer = searchBeers;
    } else {
      filteredBeer = allBeers;
    }

    // paginate the list of movies based on the sorted list
    const beers = paginate(filteredBeer, currentPage, pageSize);
    return { totalCount: filteredBeer.length, data: beers };
  };

  handleSearch = async (key, query) => {
    if (key === "Enter") {
      const beerList = await searchBeer(query);
      const searchBeers = [].concat.apply([], beerList.data);
      this.setState({
        searchBeers,
        searchQuery: query,
        catQuery: "",
        currentPage: 1
      });
    }
  };

  handleFilter = async query => {
    const beerList = await searchBeerByCategory(query);
    const searchBeers = [].concat.apply([], beerList.data);
    this.setState({
      searchBeers,
      catQuery: query,
      searchQuery: "",
      currentPage: 1
    });
  };

  render() {
    const { pageSize, currentPage, searchQuery, categories } = this.state;
    const { totalCount, data: beers } = this.getPageData();
    return (
      <React.Fragment>
        <Filter
          searchQuery={searchQuery}
          handleSearch={this.handleSearch}
          cat={categories}
          handleFilter={this.handleFilter}
        />

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageNext={this.handlePageNext}
          onPagePrevious={this.handlePagePrevious}
        />
        <div className="row">
          {beers.map(beer => (
            <Beer key={beer.id} data={beer} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Beers;
