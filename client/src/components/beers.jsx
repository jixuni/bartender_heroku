import React, { Component } from "react";
import Filter from "./filter";
import paginate from "../utils/paginate";
import Pagination from "./common/pagination";
import Beer from "./beer";
import _ from "lodash";
import { getAllBeer } from "./../services/beerService";
import { getAllCategory } from "./../services/categoryService";

class Beers extends Component {
  state = {
    beers: [],
    categories: [],
    pageSize: 8,
    currentPage: 1,
    searchQuery: "",
    catQuery: ""
  };

  async componentDidMount() {
    const beerList = await getAllBeer();
    const beers = [].concat.apply([], beerList.data);
    const categoryList = await getAllCategory();
    const categories = [].concat.apply([], categoryList.data);
    this.setState({ beers, categories });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handlePageNext = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({ currentPage: newPage });
  };

  handlePagePrevious = () => {
    const newPage = this.state.currentPage - 1;
    this.setState({ currentPage: newPage });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      beers: allBeers,
      searchQuery,
      catQuery
    } = this.state;

    // set the filteredMovie to allMovies, and change the filteredMovie array based on the conditions below, (searchQuery or Selected Genre)
    let filteredBeer = allBeers;

    if (searchQuery) {
      filteredBeer = allBeers.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (catQuery) {
      filteredBeer = allBeers.filter(
        m => m.category_id.toString() === catQuery
      );
    }

    // paginate the list of movies based on the sorted list
    const beers = paginate(filteredBeer, currentPage, pageSize);
    return { totalCount: filteredBeer.length, data: beers };
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      catQuery: "",
      currentPage: 1
    });
  };

  handleFilter = query => {
    this.setState({ catQuery: query, searchQuery: "", currentPage: 1 });
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
