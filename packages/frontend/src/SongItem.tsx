import { Link } from "react-router";
import type { IApiSongData } from "../../backend/src/common/ApiSongData.ts"
import "./styles/discover.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'

interface ISongItem {
  song: IApiSongData;
  layout: string;
  favSongs: string[];
  onToggleFavorite: (songId: string) => void;
}

function SongItem( props: ISongItem ) {
  return (
    <div>
      {props.layout === "vertical" ? (
        <Link
          to={`/songs/${props.song.id}`}
          className="song-item"
        >
          <div className="suggestions-item">
            <p>{props.song.title}</p>
            <img src={props.song.image} className="album-cover" />
          </div>
        </Link>
      ) : (
        <div className="song-row">
          <Link
            to={`/songs/${props.song.id}`}
            className="song-item"
          >
            {props.song.title}
          </Link>

          <button
            className={props.favSongs.includes(props.song.id) ? "active-fav-btn": "fav-btn"}
            onClick={() => props.onToggleFavorite(props.song.id)}>
            <FontAwesomeIcon icon={faHeart} title="Favorite song"/>
          </button>
        </div>
      )}
    </div>

  )
}

export default SongItem;