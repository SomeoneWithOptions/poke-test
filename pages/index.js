import { useState, useReducer, useRef, useEffect } from "react";
import { PokeImage } from "./PokeImage";

export default function Home() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon/" + query)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    buttonRef.current.focus();
    setQuery(search);
  };

  const handlebutton = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 500) + 1;
    setSearch(random);
    setQuery(random);
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h1>Type a Pokemon Number:</h1>
        <input
          className="pokeInput"
          type="number"
          min={0}
          max={905}
          placeholder="# P"
          step={1}
          pattern={"[0-9]"}
          inputMode={"numeric"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div>
        <button onClick={handlebutton} ref={buttonRef}>Random Pokemon!</button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        Object.keys(results).length > 0 && (
          <div className="pokeResult">
            <h2>{results.name}</h2>
            <div className="pokeImages">
              <PokeImage number={query} shiny={false} />
              <PokeImage number={query} shiny={true} />
            </div>
          </div>
        )
      )}
    </div>
  );
}
