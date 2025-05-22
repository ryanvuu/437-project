import Navbar from "../Navbar";
import SongCard from "../SongCard";
import logo from "../images/logo.png";
import { SONG_RECS } from "../songs";
import "../styles/index.css"

export function Home() {
  return (
    <div>

      <img src={logo} alt="" height="200" width="200" />
      <h1>Hello, Ryan</h1>
      <div className="suggestions-section">
        
        <h2 className="h2-home">Suggested for you</h2>
        <div className="suggestions-container">
          {SONG_RECS?.map((song) => (
            <SongCard 
              song={song}
            />
          ))}
        </div>

      </div>

      <Navbar />

    </div>
  );
}
