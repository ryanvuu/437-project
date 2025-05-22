import { Link } from "react-router";
import type { ISong } from "./songs";
import "./styles/discover.css";

interface ISongItem {
  song: ISong;
}

function SongItem( props: ISongItem ) {
  return (
    <Link
      to={`/songs/${props.song.id}`}
      className="song-item"
    >
      {props.song.title}
    </Link>
  )
}

export default SongItem;