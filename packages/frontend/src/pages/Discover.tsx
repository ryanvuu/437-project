import Navbar from "../Navbar";
import SongList from "../SongList";
import { FilterTable } from "../FilterTable";
import { SONG_LIST } from "../songs";
import { useState } from "react";
import "../styles/discover.css";

interface IDiscover {
  genres: string[];
  favSongs: string[];
  toggleFavSong: (songId: string) => void;
}

export function Discover(props: IDiscover) {
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

  return (
  <div>
    <h1 className="discover-h1">Discover</h1>
    <div className="filters-songs">
      <FilterTable
        genres={props.genres}
        activeGenres={filterGenres}
        onGenreToggle={toggleGenre}
        onGenreClear={clearGenres}/>
      <div className="song-container">
        <SongList
          songs={filteredSongs}
          favSongs={props.favSongs}
          toggleFavorite={props.toggleFavSong}/>
      </div>
    </div>
    
    <Navbar />
  </div>
  
  )
}
