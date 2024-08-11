import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this imports the styles from App.css

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="countries-container">
        {filteredCountries.length === 0 && searchTerm ? (
          <p>No countries match your search.</p>
        ) : (
          filteredCountries.map((country) => (
            <div key={country.alpha3Code} className="countryCard">
              <img src={country.flag} alt={`Flag of ${country.name}`} />
              <p>{country.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
