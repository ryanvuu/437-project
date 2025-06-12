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
  function getSuggestedSongs(songList: IApiSongData[], genrePrefs: string[], n: number): IApiSongData[] {
    const normalizedPrefs = genrePrefs.map(g => g.toLowerCase());

    const preferredSongs = songList.filter(song =>
      normalizedPrefs.includes(song.genre.toLowerCase())
    );

    let selectedSongs: IApiSongData[] = [];

    if (preferredSongs.length >= n) {
      selectedSongs = getRandomElements(preferredSongs, n);
    } else {
      selectedSongs = [...preferredSongs];

      const preferredIds = new Set(preferredSongs.map(song => song.id));
      const remainingSongs = songList.filter(song => !preferredIds.has(song.id));
      const additionalSongs = getRandomElements(remainingSongs, n - selectedSongs.length);

      selectedSongs.push(...additionalSongs);
    }

    return selectedSongs;
  }


  function getRandomElements(arr: IApiSongData[], count: number): IApiSongData[] {
    const result: IApiSongData[] = [];
    const usedIndices = new Set<number>();

    while (result.length < count && arr.length > 0) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        result.push(arr[randomIndex]);
      }
    }

    return result;
  }

  const suggestedSongs = props.songList && props.genrePrefs
    ? getSuggestedSongs(props.songList, props.genrePrefs, 5)
    : [];


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
            {suggestedSongs.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                layout="vertical"
                favSongs={props.favSongs}
                authToken={props.authToken}
              />
            ))}
          </div> : null}
      </div>

      <Navbar />

    </div>
  );
}
