import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import type { IApiSongData } from "../../../backend/src/common/ApiSongData.ts";
import SongItem from "../SongItem";

interface IFavorites {
  favSongs: IApiSongData[];
  isLoading: boolean;
  isError: boolean;
}

export function Favorites(props: IFavorites) {
  const { favSongs, isLoading, isError } = props;
  const navigate = useNavigate();
  
  return (
    <div>
      <button
        className="song-details-back"
        onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faBackward} title="Back"/>
      </button>
      
      <h1 className="h1-song-details">Your Favorites</h1>
      {isLoading ? <p style={{fontSize: "2rem", margin: "2rem"}}>Loading favorites...</p> : null}
      {isError ? <p style={{fontSize: "2rem", color: "#F9EE45", margin: "2rem"}}>Failed to load favorites.</p> : null}
      {!isLoading && !isError ?
        <div className="song-info-container">
          {favSongs?.map((song: IApiSongData) => (
            <SongItem key={song.id} song={song} layout="horizontal" favSongs={favSongs} />
          ))}
        </div> : null}
      
    </div>
  )
}
