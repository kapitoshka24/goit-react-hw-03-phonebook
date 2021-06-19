import React from "react";
import PropTypes from "prop-types";
import "./Filter.css";

const Filter = ({ filter, filterContacts }) => (
  <label>
    Find contacts by name
    <input type="text" value={filter} onChange={filterContacts} />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterContacts: PropTypes.func.isRequired,
};

export default Filter;
