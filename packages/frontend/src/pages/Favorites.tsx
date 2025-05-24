import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { SONG_LIST } from "../songs";
import SongItem from "../SongItem";

interface IFavorites {
  favSongs: string[];
  toggleFavSong: (songId: string) => void;
}

export function Favorites(props: IFavorites) {
  const navigate = useNavigate();

  function getFavSongNames() {
    const favSongNames = [];
    for (const song of SONG_LIST) {
      if (props.favSongs.includes(song.id)) {
        favSongNames.push(song);
      }
    }
    return favSongNames;
  }

  const favSongNames = getFavSongNames();
  
  return (
    <div>
      <button
        className="song-details-back"
        onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faBackward} title="Back"/>
      </button>
      
      <h1 className="h1-song-details">Your Favorites</h1>
      <div className="song-info-container">
        {favSongNames?.map(song => (
          <SongItem song={song} layout="horizontal" favSongs={props.favSongs} onToggleFavorite={props.toggleFavSong}/>
        ))}
      </div>
    </div>
  )
}
