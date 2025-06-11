import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import type { IApiSongData } from "../../../backend/src/common/ApiSongData.ts";
import SongItem from "../SongItem";

interface IFavorites {
  favSongs: IApiSongData[];
  isLoading: boolean;
  isError: boolean;
  authToken: string;
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
      {props.isLoading ? <p style={{fontSize: "2rem", margin: "2rem"}}>Loading favorites...</p> : null}
      {props.isError ? <p style={{fontSize: "2rem", color: "#F9EE45", margin: "2rem"}}>Failed to load favorites.</p> : null}
      {!props.isLoading && !props.isError ?
        <div className="song-info-container">
          {props.favSongs?.map((song: IApiSongData) => (
            <SongItem key={song.id} song={song} layout="horizontal" favSongs={props.favSongs} authToken={props.authToken} />
          ))}
        </div> : null}
      
    </div>
  )
}
