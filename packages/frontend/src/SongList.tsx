import SongItem from "./SongItem";
import { type IApiSongData } from "../../backend/src/common/ApiSongData.ts";
import "./styles/discover.css";

interface ISongList {
  songs: IApiSongData[];
  favSongs: IApiSongData[];
  onRightClicked: () => void;
  onPrevClicked: () => void;
  setCurrentSongPage: (pageIndex: number) => void;
}

function SongList(props: ISongList) {
  return (
    <div id="song-container">
      <ul className="song-list">
        {props.songs?.map((song) => (
          <SongItem
            key={song.id} 
            song={song}
            layout="horizontal"
            favSongs={props.favSongs}
          />
        ))}
      </ul>

      <div id="view-buttons-container">
        <button 
          className="view-button"
          onClick={props.onPrevClicked}
        >Prev
        </button>
        <button
          className="view-button"
          onClick={props.onRightClicked}
        >Next
        </button>
      </div>
    </div>
  )

}

export default SongList;