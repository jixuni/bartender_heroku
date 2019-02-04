import React from "react";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <textarea
        //this value is determined by the state, so whenever user types in something, it will call the onChange
        // event handler to set the state to whatever user changes
        // you can see this in action by going to the login form and see the state

        // only name, label and error in this are used in different places, and their name and value are the same, so we can use the spread operator

        id={name}
        name={name}
        rows="3"
        {...rest}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
