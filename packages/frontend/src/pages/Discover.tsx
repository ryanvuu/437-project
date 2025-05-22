import Navbar from "../Navbar";
import SongList from "../SongList";
import FilterTable from "../FilterTable";
import { SONG_LIST } from "../songs";
import { useState } from "react";
import "../styles/discover.css";

const genres = ["pop", "rock", "hip-hop", "indie", "r&b", "jazz", "classical", "disco", "edm", "country"];

export function Discover() {
  // filterGenres is an array of strings
  const [filterGenres, setFilterGenres] = useState<string[]>([]);

  function toggleGenre(targetGenre: string) {
    if (filterGenres.includes(targetGenre)) {
      setFilterGenres(filterGenres.filter(genre => genre !== targetGenre));
    } else {
      setFilterGenres([...filterGenres, targetGenre]);
    }
  }

  function clearGenres() {
    setFilterGenres([]);
  }

  const filteredSongs = filterGenres.length === 0 ? SONG_LIST : SONG_LIST.filter(song => filterGenres.includes(song.genre.toLowerCase()));

  console.log(genres);
  console.log(filteredSongs);

  return (
  <div>
    <h1 className="discover-h1">Discover</h1>
    <div className="filters-songs">
      <FilterTable
        genres={genres}
        activeGenres={filterGenres}
        onGenreToggle={toggleGenre}
        onGenreClear={clearGenres}/>
      <div className="song-container">
        <SongList songs={filteredSongs} />
      </div>
    </div>
    
    <Navbar />
  </div>
  
  )
}
