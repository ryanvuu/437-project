import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import type { IApiSongData } from "../../../backend/src/common/ApiSongData.ts";
import SongItem from "../SongItem";

interface IFavorites {
  favSongs: IApiSongData[];
  toggleFavSong: (song: IApiSongData) => void;
}

export function Favorites(props: IFavorites) {
  const navigate = useNavigate();
  
  return (
    <div>
      <button
        className="song-details-back"
        onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faBackward} title="Back"/>
      </button>
      
      <h1 className="h1-song-details">Your Favorites</h1>
      <div className="song-info-container">
        {props.favSongs?.map(song => (
          <SongItem key={song.id} song={song} layout="horizontal" favSongs={props.favSongs} onToggleFavorite={props.toggleFavSong}/>
        ))}
      </div>
    </div>
  )
}
