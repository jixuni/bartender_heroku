import React from "react";
import Input from "./input";

const SearchBox = ({ value, handleSearch }) => {
  return (
    <Input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onKeyPress={e => handleSearch(e.key, e.currentTarget.value)}
    />
  );
};

export default SearchBox;
