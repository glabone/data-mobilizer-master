import React from 'react';

const searchBar = (props) => {
  return (
    <input
      style={{
        width: '200px',
        height: '40px',
        border: 'solid rgb(11, 180, 95)',
      }}
      type='search'
      placeholder='Search by ID or Name'
      onChange={props.handleInput}
    />
  );
};

export default searchBar;
