import { Link } from "react-router";
import type { ISong } from "./songs";
import "./styles/discover.css";
import image from "./images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'

interface ISongItem {
  song: ISong;
  layout: string;
  favoritesList: string[];
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
            <img src={image} alt={`${props.song.title} album cover`} className="album-cover" />
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
            className={props.favoritesList.includes(props.song.id) ? "active-fav-btn": "fav-btn"}
            onClick={() => props.onToggleFavorite(props.song.id)}>
            <FontAwesomeIcon icon={faHeart} title="Favorite song"/>
          </button>
        </div>
      )}
    </div>

  )
}

export default SongItem;