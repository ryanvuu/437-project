import Navbar from "../Navbar";
import SongItem from "../SongItem";
import logo from "../images/logo.png";
import { SONG_LIST } from "../songs";
import "../styles/index.css"

interface IHome {
  displayName: string;
  favSongs: string[];
  favGenres: string[];
  toggleFavSong: (songId: string) => void;
  isDark: boolean;
}

export function Home(props: IHome) {
  return (
    <div>

      <img src={logo} alt="" height="200" width="200" />
      <h1>Hello, {props.displayName}</h1>
      <div className="suggestions-section">
        
        <h2 className="h2-home">Suggested for you</h2>
        
        <div className="suggestions-container">
          {SONG_LIST?.map((song) => (
            props.favGenres.includes(song.genre.toLowerCase()) ? (
              <SongItem
                key={song.id} 
                song={song}
                layout="vertical"
                favSongs={props.favSongs}
                onToggleFavorite={props.toggleFavSong}
              />
            ) : (
              null
            )))}
        </div>

      </div>

      <Navbar />

    </div>
  );
}
