import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="bare-recharche">
        <input
          type="text"
          id="search_field"
          placeholder="Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
