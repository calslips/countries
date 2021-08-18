import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Matches = ({ results }) => {
  // if (results.length === 0) {
  //   return <></>;
  // }
  return results.map((result) => <Match key={result.name} result={result} /> );
};

const Match = ({ result }) => (
  <p>
    {result.name}
  </p>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    let query = event.target.value;
    console.log(query);
    setSearch(query);
    let result = countries.filter((country) =>
      country.name.toUpperCase().includes(query.toUpperCase())
    );
    if (query.length === 0) {
      setResults([]);
    } else {
      setResults(result);
    }
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Matches results={results} />
    </div>
  );
}

export default App;
