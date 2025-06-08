import Navbar from "../Navbar";
import SongList from "../SongList";
import { FilterTable } from "../FilterTable";
import type { IApiSongData } from "../../../backend/src/common/ApiSongData.ts";
import "../styles/discover.css";

interface IDiscover {
  songList: IApiSongData[];
  genres: string[];
  favSongs: IApiSongData[];
  filterGenres: string[];
  setFilterGenres: (genreList: string[]) => void;
  currentSongPage: number;
  setCurrentSongPage: (page: number) => void;
  isFetchingData: boolean;
  hasErrOccurred: boolean;
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

  const filteredSongs = props.filterGenres.length === 0 ? props.songList : props.songList.filter(song => props.filterGenres.includes(song.genre.toLowerCase()));
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
        {props.isFetchingData ? <p style={{fontSize: "2rem", margin: "2rem"}}>Loading songs...</p> : null}
        {props.hasErrOccurred ? <p style={{fontSize: "2rem", color: "#F9EE45", margin: "2rem"}}>Failed to load songs.</p> : null}
        {!props.isFetchingData && !props.hasErrOccurred ?
        <SongList
          songs={currentSongs}
          favSongs={props.favSongs}
          onRightClicked={goNextSongPage}
          onPrevClicked={goPrevSongPage}
          setCurrentSongPage={props.setCurrentSongPage}
          /> : null}
       
      </div>
    </div>
    
    <Navbar />
  </div>
  
  )
}
