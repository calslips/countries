import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);
  console.log(countries);

  const handleSearch = (event) => {
    let query = event.target.value;
    console.log(query);
    setSearch(query);
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
    </div>
  );
}

export default App;
