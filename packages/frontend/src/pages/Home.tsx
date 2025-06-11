import Navbar from "../Navbar";
import SongItem from "../SongItem";
import logo from "../images/logo.png";
import type { IApiSongData } from "../../../backend/src/common/ApiSongData.ts";
import "../styles/index.css"

interface IHome {
  displayName: string;
  songList: IApiSongData[];
  favSongs: IApiSongData[];
  genrePrefs: string[];
  isDark: boolean;
  isFetchingData: boolean;
  hasErrOccurred: boolean;
  isNameLoading: boolean;
  isNameError: boolean;
  authToken: string;
}

export function Home(props: IHome) {
  return (
    <div>

      <img src={logo} alt="" height="200" width="200" />
      {props.isNameError && <h1>Failed to load display name</h1>}
      {!props.isNameError && <h1>Hello, {props.isNameLoading ? "loading..." : props.displayName}</h1>}
      <div className="suggestions-section">
        
        <h2 className="h2-home">Suggested for you</h2>
        
        {props.isFetchingData ? <p style={{fontSize: "2rem", margin: "2rem"}}>Loading songs...</p> : null}
        {props.hasErrOccurred ? <p style={{fontSize: "2rem", color: "#F9EE45", margin: "2rem"}}>Failed to load songs.</p> : null}
        {!props.isFetchingData && !props.hasErrOccurred ?
          <div className="suggestions-container">
            {props.songList?.map((song) => (
              props.genrePrefs?.includes(song.genre.toLowerCase()) ? (
                <SongItem
                  key={song.id} 
                  song={song}
                  layout="vertical"
                  favSongs={props.favSongs}
                  authToken={props.authToken}
                />
              ) : (
                null
              )))}
          </div> : null}
        

      </div>

      <Navbar />

    </div>
  );
}
