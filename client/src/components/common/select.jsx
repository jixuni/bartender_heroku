import React from "react";

const Select = ({ name, label, options, error, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <select
        id={name}
        name={name}
        onChange={e => onChange(e.currentTarget.value)}
        {...rest}
        className="form-control"
      >
        <option // empty option
          value=""
        />
        {options.map(option => (
          <option //map the rest of the options from the array of options passed by the form.state.genres
            key={option.id}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
