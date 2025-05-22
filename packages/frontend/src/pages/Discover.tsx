import Navbar from "../Navbar";
import SongList from "../SongList";
import FilterTable from "../FilterTable";
import { SONG_LIST } from "../songs";
import "../styles/discover.css";

export function Discover() {
  return (
  <div>
    <h1 className="discover-h1">Discover</h1>
    <div className="filters-songs">
      <FilterTable />
      <div className="song-container">
        <SongList songs={SONG_LIST} />
      </div>
    </div>
    
    <Navbar />
  </div>
  
  )
}
