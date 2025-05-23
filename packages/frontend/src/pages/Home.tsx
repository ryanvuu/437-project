import Navbar from "../Navbar";
import SongItem from "../SongItem";
import logo from "../images/logo.png";
import { SONG_RECS } from "../songs";
import "../styles/index.css"

interface IHome {
  displayName: string;
  favoritesList: string[];
  toggleFavorite: (songId: string) => void;
}

export function Home(props: IHome) {
  return (
    <div>

      <img src={logo} alt="" height="200" width="200" />
      <h1>Hello, {props.displayName}</h1>
      <div className="suggestions-section">
        
        <h2 className="h2-home">Suggested for you</h2>
        
        <div className="suggestions-container">
          {SONG_RECS?.map((song) => (
            <SongItem 
              song={song}
              layout="vertical"
              favoritesList={props.favoritesList}
              onToggleFavorite={props.toggleFavorite}
            />
          ))}
        </div>

      </div>

      <Navbar />

    </div>
  );
}
