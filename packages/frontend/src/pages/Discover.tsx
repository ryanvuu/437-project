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
  const [currentSongPage, setCurrentSongPage] = useState(0);
  const songsPerPage = 5;

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
  const firstSongIdx = currentSongPage * songsPerPage;
  const currentSongs = filteredSongs.slice(firstSongIdx, firstSongIdx + songsPerPage);

  function goNextSongPage() {
    if (currentSongPage < Math.floor(filteredSongs.length / songsPerPage)) {
      setCurrentSongPage(currentSongPage + 1);
    }
  }

  function goPrevSongPage() {
    if (currentSongPage > 0) {
      setCurrentSongPage(currentSongPage - 1);
    }
  }

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
          songs={currentSongs}
          favSongs={props.favSongs}
          onRightClicked={goNextSongPage}
          onPrevClicked={goPrevSongPage}
          toggleFavorite={props.toggleFavSong}
          setCurrentSongPage={setCurrentSongPage}/>
      </div>
    </div>
    
    <Navbar />
  </div>
  
  )
}
