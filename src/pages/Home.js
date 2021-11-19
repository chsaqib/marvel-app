import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Characters from '../components/Characters';
import Pagination from '../components/Pagination';
var md5 = require('md5');
function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(8);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // fetching data from Marvel Api
  useEffect(() => {
    const getCharcters = async () => {
      setLoading(true);
      let key = md5(
        Date.now +
          process.env.REACT_APP_PRIVATE_KEY +
          process.env.REACT_APP_PUBLIC_KEY
      );
      const response = await axios.get(
        `${process.env.REACT_APP_URL}?&apikey=${process.env.REACT_APP_PUBLIC_KEY}`
      );
      setCharacters(response.data.data.results);
      setLoading(false);
    };
    getCharcters();
  }, []);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = characters.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(characters);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              autoFocus
              placeholder="Search..."
              onChange={(e) => searchItems(e.target.value)}
            />
            {searchInput.length > 1 ? (
              <Characters characters={filteredResults} loading={loading} />
            ) : (
              <Characters characters={currentCharacters} loading={loading} />
            )}

            <Pagination
              className="pagination"
              charactersPerPage={charactersPerPage}
              totalCharacters={characters.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
