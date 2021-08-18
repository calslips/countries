import React, { useState, useEffect } from "react";
import axios from "axios";

const Matches = ({ results, onClick }) => {
  if (results.length > 10) {
    return <MultiMatch result={"Too many matches, specify another filter"} />;
  } else if (results.length > 1 && results.length <= 10) {
    return results.map((result) => (
      <MultiMatch
        key={result.name}
        result={result.name}
        button={<ShowButton onClick={onClick} country={result.name} />}
      />
    ));
  }
  return results.map((result) => (
    <Match
      key={result.name}
      name={result.name}
      capital={result.capital}
      population={result.population}
      languages={result.languages}
      flag={result.flag}
    />
  ));
};

const MultiMatch = ({ result, button }) => (
  <p>
    {result} {button}
  </p>
);

const ShowButton = ({ onClick, country }) => (
  <button onClick={onClick} value={country}>
    show
  </button>
);

const Match = ({ name, capital, population, languages, flag }) => (
  <div>
    <Name name={name} />
    <Capital capital={capital} />
    <Population population={population} />
    <Languages languages={languages} />
    <Flag flag={flag} name={name} />
  </div>
);

const Name = ({ name }) => <h1>{name}</h1>;

const Capital = ({ capital }) => <p>capital {capital}</p>;

const Population = ({ population }) => <p>population {population}</p>;

const Languages = ({ languages }) => {
  return (
    <>
      <h2>languages</h2>
      <ul>
        {languages.map((language) => (
          <Language key={language.name} language={language.name} />
        ))}
      </ul>
    </>
  );
};

const Language = ({ language }) => <li>{language}</li>;

const Flag = ({ flag, name }) => (
  <img src={flag} alt={`Flag of ${name}`} width="150" height="100" />
);

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

  const handleClick = (event) => {
    let value = event.target.value;
    console.log(value);
    let result = countries.filter((country) =>
      country.name.toUpperCase().includes(value.toUpperCase())
    );
    setSearch(value);
    setResults(result);
  };

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Matches results={results} onClick={handleClick} />
    </div>
  );
};

export default App;
