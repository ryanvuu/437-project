import SongItem from "./SongItem";
import { type ISong } from "./songs";
import "./styles/discover.css";


interface ISongList {
  songs: ISong[];
}

function SongList(props: ISongList) {

  return (
    <div id="song-container">
      <ul className="song-list">
        {props.songs?.map((song) => (
          <SongItem
            key={song.id} 
            song={song}
          />
        ))}
      </ul>

      <div id="view-buttons-container">
        <button className="view-button">Back</button>
        <button className="view-button">Next</button>
      </div>
    </div>
  )

}

export default SongList;