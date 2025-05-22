import { type ISong } from './songs';
import placeHolder from './images/logo.png';
import "./styles/index.css";

interface ISongCard {
  song: ISong;
}

function SongCard(props: ISongCard) {
  return (
    <div className="suggestions-item">
      <p>{props.song.title}</p>
      <img src={placeHolder} alt="" height="200" width="200"/>
    </div>
  );
}

export default SongCard;