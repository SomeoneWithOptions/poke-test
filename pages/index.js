import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useReducer, useRef, useEffect } from "react";
import { Bonheur_Royale, Nanum_Brush_Script, Nunito } from "@next/font/google";

const nunito = Nunito();

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
    buttonRef.current.focus()
    setQuery(search);
  };

  const handlebutton = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 500) + 1;
    setSearch(random);
    setQuery(random);
  };

  return (
    <div className ={nunito.className + ' main' }>
      <form onSubmit={handleSubmit}>
        <h1 className={nunito.className}>Type a Pokemon Number:</h1>
        <input
          className={nunito.className + " pokeInput"}
          type="number"
          min={0}
          max={905}
          placeholder="Pokemon"
          step={1}
          pattern={"[0-9]"}
          inputMode={"numeric"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className={nunito.className} onClick={handlebutton} ref={buttonRef}>Random Pokemon!</button>
      </div>
      <div className=".pokeResult">
        {loading ? (
          <div style={{ textAlign: "center", fontSize: "3rem" }}>
            Loading...
          </div>
        ) : (
          Object.keys(results).length > 0 && (
            <>
              <h2>{results.name}</h2>
              <div className="pokeImages">
                <img
                  src={results.sprites?.front_default}
                  width={200}
                  height={200}
                />

                <img
                  src={results.sprites?.front_shiny}
                  width={200}
                  height={200}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
