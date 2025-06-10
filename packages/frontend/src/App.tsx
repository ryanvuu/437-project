import { Routes, Route, Navigate } from 'react-router';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SongDetails } from './pages/SongDetails';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { useEffect, useState } from 'react';
import { Favorites } from './pages/Favorites';
import { ValidRoutes } from "../../backend/src/common/ValidRoutes.ts";
import { useFavorites } from '../hooks/queryFavorites.ts';
import { useSongs } from "../hooks/querySongs.ts";
import { useGenrePrefs } from "../hooks/queryGenrePrefs.ts";

const genres = ["pop", "rock", "hip-hop", "indie", "r&b", "jazz", "classical", "disco", "edm", "country"];

function App() {
  const [displayName, setDisplayName] = useState("User12345");
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const [currentSongPage, setCurrentSongPage] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const { data: favSongs, isLoading: isFavoritesLoading, isError: isFavoritesError } = useFavorites();
  const { data: songData, isLoading: isSongsLoading, isError: isSongsError } = useSongs();
  const { data: genrePrefs, isLoading: isGenrePrefsLoading, isError: isGenrePrefsError } = useGenrePrefs();

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "";
  }, [isDark]);

  function toggleDarkMode() {
    setIsDark(!isDark);
  }

  function updateDisplayName(newName: string) {
    setDisplayName(newName);
  }

  return (
    <Routes>
        <Route path={ValidRoutes.HOME} element={<Home displayName={displayName} songList={songData} favSongs={favSongs} genrePrefs={genrePrefs} isDark={isDark} isFetchingData={isSongsLoading} hasErrOccurred={isSongsError} />} />
        <Route path="/home" element={<Navigate to={ValidRoutes.HOME}/>} />
        <Route path={ValidRoutes.DISCOVER} element={<Discover songList={songData} genres={genres} favSongs={favSongs} filterGenres={filterGenres} setFilterGenres={setFilterGenres} currentSongPage={currentSongPage} setCurrentSongPage={setCurrentSongPage} isFetchingData={isSongsLoading} hasErrOccurred={isSongsError} />} />
        <Route path={ValidRoutes.ABOUT} element={<About />} />
        <Route path={ValidRoutes.PROFILE} element={<Profile displayName={displayName} genres={genres} genrePrefs={genrePrefs} setDisplayName={updateDisplayName} isDark={isDark} toggleIsDark={toggleDarkMode} isGenrePrefsLoading={isGenrePrefsLoading} isGenrePrefsError={isGenrePrefsError} />} />
        <Route path={ValidRoutes.FAVORITES} element={<Favorites favSongs={favSongs} isLoading={isFavoritesLoading} isError={isFavoritesError} />} />

        <Route path={ValidRoutes.SONG_DETAILS} element={<SongDetails songList={songData} />} />
    </Routes>
  );
}

export default App;
