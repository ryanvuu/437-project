import Navbar from "../Navbar";
import SongList from "../SongList";
import { FilterTable } from "../FilterTable";
import { SONG_LIST } from "../songs";
import "../styles/discover.css";

interface IDiscover {
  genres: string[];
  favSongs: string[];
  toggleFavSong: (songId: string) => void;
  filterGenres: string[];
  setFilterGenres: (genreList: string[]) => void;
  currentSongPage: number;
  setCurrentSongPage: (page: number) => void;
}

export function Discover(props: IDiscover) {
  const songsPerPage = 5;

  function toggleGenre(targetGenre: string) {
    if (props.filterGenres.includes(targetGenre)) {
      props.setFilterGenres(props.filterGenres.filter(genre => genre !== targetGenre));
    } else {
      props.setFilterGenres([...props.filterGenres, targetGenre]);
    }

    props.setCurrentSongPage(0);
  }

  function clearGenres() {
    props.setFilterGenres([]);
  }

  const filteredSongs = props.filterGenres.length === 0 ? SONG_LIST : SONG_LIST.filter(song => props.filterGenres.includes(song.genre.toLowerCase()));
  const firstSongIdx = props.currentSongPage * songsPerPage;
  const currentSongs = filteredSongs.slice(firstSongIdx, firstSongIdx + songsPerPage);

  function goNextSongPage() {
    if ((props.currentSongPage + 1) * songsPerPage < filteredSongs.length) {
      props.setCurrentSongPage(props.currentSongPage + 1);
    }
  }

  function goPrevSongPage() {
    if (props.currentSongPage > 0) {
      props.setCurrentSongPage(props.currentSongPage - 1);
    }
  }

  return (
  <div>
    <h1 className="discover-h1">Discover</h1>
    <div className="filters-songs">
      <FilterTable
        genres={props.genres}
        activeGenres={props.filterGenres}
        onGenreToggle={toggleGenre}
        onGenreClear={clearGenres}/>
      <div className="song-container">
        <SongList
          songs={currentSongs}
          favSongs={props.favSongs}
          onRightClicked={goNextSongPage}
          onPrevClicked={goPrevSongPage}
          toggleFavorite={props.toggleFavSong}
          setCurrentSongPage={props.setCurrentSongPage}/>
      </div>
    </div>
    
    <Navbar />
  </div>
  
  )
}
