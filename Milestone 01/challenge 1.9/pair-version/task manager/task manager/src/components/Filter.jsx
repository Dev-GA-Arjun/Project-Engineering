import React from 'react';


function Filter({ filter, setFilter }) {
  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <input
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default Filter;  