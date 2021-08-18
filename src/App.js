import React, { useState, useEffect } from "react";
import axios from "axios";

const Matches = ({ results }) => {
  if (results.length > 10) {
    return <MultiMatch result={"Too many matches, specify another filter"} />;
  } else if (results.length > 1 && results.length <= 10) {
    return results.map((result) => (
      <MultiMatch key={result.name} result={result.name} />
    ));
  }
  return results.map((result) => (
    <Match
      key={result.name}
      name={result.name}
      capital={result.capital}
      population={result.population}
      languages={result.languages}
    />
  ));
};

const MultiMatch = ({ result }) => <p>{result}</p>;

const Match = ({ name, capital, population, languages }) => (
  <div>
    <h1>{name}</h1>
    <p>capital {capital}</p>
    <p>population {population}</p>
    <h2>languages</h2>
    <Languages languages={languages} />
  </div>
);

const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language) => (
        <Language key={language.name} language={language.name} />
      ))}
    </ul>
  );
};

const Language = ({ language }) => <li>{language}</li>;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
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
  };

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Matches results={results} />
    </div>
  );
};

export default App;
