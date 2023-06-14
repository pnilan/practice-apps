import React, { useState } from 'react';

const Search = ({search}) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      search('');
    }
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchTerm.toLowerCase().trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input type="search" className="form-control" placeholder="Find a term..." onChange={handleChange}/>
        <button type="submit" className="btn btn-primary">Go</button>
      </div>
    </form>
  );
};

export default Search;