import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SongDetails } from './pages/SongDetails';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { useEffect, useState } from 'react';
import { Favorites } from './pages/Favorites';
import { ValidRoutes } from "../../backend/src/common/ValidRoutes.ts";
import type { IApiSongData } from '../../backend/src/common/ApiSongData.ts';

const genres = ["pop", "rock", "hip-hop", "indie", "r&b", "jazz", "classical", "disco", "edm", "country"];

function App() {
  const [songData, _setSongData] = useState<IApiSongData[]>([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [hasErrOccurred, setHasErrOccurred] = useState(false);
  const [displayName, setDisplayName] = useState("User12345");
  const [favSongs, setFavSongs] = useState<IApiSongData[]>([]);
  const [favGenres, setFavGenres] = useState<string[]>(["pop", "edm", "indie"]);
  // filterGenres is an array of strings
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const [currentSongPage, setCurrentSongPage] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "";
  }, [isDark]);

  function toggleDarkMode() {
    setIsDark(!isDark);
  }

  function toggleFavSong(song: IApiSongData) {
    if (favSongs.some(fav => fav.id === song.id)) {
      removeFromFavorites(song)
        .then(() => getFavorites());
    } else {
      addToFavorites(song)
        .then(() => getFavorites());
    }
  }

  function toggleFavGenre(targetGenre: string) {
    if (favGenres.includes(targetGenre)) {
      setFavGenres(favGenres.filter(genre => genre !== targetGenre));
    } else {
      setFavGenres([...favGenres, targetGenre]);
    }
  }

  function updateDisplayName(newName: string) {
    setDisplayName(newName);
  }

  async function getFavorites() {
    setIsFetchingData(true);

    fetch("/api/users/dummy/favorites", {
      method: "GET"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        setHasErrOccurred(true);
        throw new Error(`Failed to get /api/favorites: ${res.status}`);
      })
      .then(favorites => {
        setFavSongs(favorites);
      })
      .catch(error => {
        console.error(error);
        setHasErrOccurred(true);
      })
      .finally(() => {
        setIsFetchingData(false);
      });
  }

  async function addToFavorites(song: IApiSongData) {
    setIsFetchingData(true);

    fetch("/api/users/dummy/favorites", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ songId: song.id })
    })
      .then(res => {
        if (res.ok) {
          return res.status === 204 ? {} : res.json();
        }
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      })
      .catch(error => {
        setHasErrOccurred(true);
        console.error("Failed to add to favorites:", error);
      })
      .finally(() => {
        setIsFetchingData(false);
      })
  }

  async function removeFromFavorites(song: IApiSongData) {
    setIsFetchingData(true);

    fetch(`/api/users/dummy/favorites/${song.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.status === 204 ? {} : res.json();
        }
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      })
      .catch(error => {
        setHasErrOccurred(true);
        console.error("Failed to add to favorites:", error);
      })
      .finally(() => {
        setIsFetchingData(false);
      })
  }

  useEffect(() => {
    fetch("/api/songs")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        setHasErrOccurred(true);
        throw new Error(`Failed to get /api/songs: ${res.status}`);
      })
      .then(songs => {
        _setSongData(songs);
      })
      .catch(error => {
        console.error(error);
        setHasErrOccurred(true);
      })
      .finally(() => {
        setIsFetchingData(false);
      });

    getFavorites();
  }, []);

  return (
    <Routes>
        <Route path={ValidRoutes.HOME} element={<Home displayName={displayName} songList={songData} favSongs={favSongs} favGenres={favGenres} toggleFavSong={toggleFavSong} isDark={isDark} isFetchingData={isFetchingData} hasErrOccurred={hasErrOccurred} />} />
        <Route path={ValidRoutes.DISCOVER} element={<Discover songList={songData} genres={genres} favSongs={favSongs} toggleFavSong={toggleFavSong} filterGenres={filterGenres} setFilterGenres={setFilterGenres} currentSongPage={currentSongPage} setCurrentSongPage={setCurrentSongPage} isFetchingData={isFetchingData} hasErrOccurred={hasErrOccurred} />} />
        <Route path={ValidRoutes.ABOUT} element={<About />} />
        <Route path={ValidRoutes.PROFILE} element={<Profile displayName={displayName} genres={genres} favGenres={favGenres} setDisplayName={updateDisplayName} toggleFavGenre={toggleFavGenre} isDark={isDark} toggleIsDark={toggleDarkMode} />} />
        <Route path={ValidRoutes.FAVORITES} element={<Favorites favSongs={favSongs} toggleFavSong={toggleFavSong}/>} />

        <Route path={ValidRoutes.SONG_DETAILS} element={<SongDetails songList={songData} />} />
    </Routes>
  );
}

export default App;
