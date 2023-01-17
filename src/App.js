import { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=c645831f";

const App = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const resp = await fetch(`${API_URL}&s=${title}`);
    const data = await resp.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Movie App</h1>

      <div className="search">
        <input
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(SearchTerm)}
        />
      </div>

      {Movies?.length > 0 ? (
        <div className="container">
          {Movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
