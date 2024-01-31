import React from 'react';
import './SearchBar.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, searchResults }) => {
  return (
    <div className="search-bar">
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search users by email..."
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <div className="search-results-dropdown">
          <ul>
            {searchResults.map((user) => (
            <Row>
                <Col>
                <li key={user.Email}>{user.Email}</li>
                </Col>
                <Col>
                <img src="/poring.ico" alt="Icon" className="result-icon" />
                </Col>
            </Row>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

