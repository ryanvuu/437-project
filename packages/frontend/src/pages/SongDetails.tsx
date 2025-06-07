import { useParams } from "react-router"
import type { IApiSongData } from "../../../backend/src/common/ApiSongData.ts";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import "../styles/song-styles.css";

interface ISongDetails {
  songList: IApiSongData[];
}

export function SongDetails(props: ISongDetails) {
  const navigate = useNavigate();
  const { songId } = useParams();
  const song = props.songList.find(song => song.id === songId);

  if (!song) {
    return (
      <p>Song does not exist.</p>
    );
  }

  return (
    <div>
      <button
        className="song-details-back"
        onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faBackward} title="Back"/>
      </button>
      <h1 className="h1-song-details">{song.title}</h1>
      <div className="song-info-container">
        <p><strong>Artist: {song.artist}</strong></p>
        <p><strong>Genre: {song.genre}</strong></p>
        <p><strong>Duration: {song.duration}</strong></p>
        <p><strong>Released: {song.releaseYear}</strong></p>
      </div>
    </div>
  )

}
