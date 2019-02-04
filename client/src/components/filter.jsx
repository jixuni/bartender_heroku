import React from "react";
import SearchBox from "./common/searchBox";
import Select from "./common/select";

const Filter = ({ cat, searchQuery, handleSearch, handleFilter }) => {
  return (
    <div className="row">
      <div className="col-md-3 mr-auto">
        <Select
          name={"category"}
          label={"Category"}
          options={cat}
          onChange={handleFilter}
        />
      </div>
      <div className="col-md-3 ml-auto">
        <SearchBox searchQuery={searchQuery} handleSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Filter;
