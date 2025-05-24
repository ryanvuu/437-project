import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SongDetails } from './pages/SongDetails';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { useEffect, useState } from 'react';
import { Favorites } from './pages/Favorites';

const genres = ["pop", "rock", "hip-hop", "indie", "r&b", "jazz", "classical", "disco", "edm", "country"];

function App() {
  const [displayName, setDisplayName] = useState("User12345");
  const [favSongs, setFavSongs] = useState<string[]>(["song-12", "song-5", "song-2", "song-10", "song-15"]);
  const [favGenres, setFavGenres] = useState<string[]>(["pop", "edm", "indie"]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "";
  }, [isDark]);

  function toggleDarkMode() {
    setIsDark(!isDark);
  }

  function toggleFavSong(songId: string) {
    if (favSongs.includes(songId)) {
      setFavSongs(favSongs.filter(id => id !== songId));
    } else {
      setFavSongs([...favSongs, songId]);
    }
  }

  function toggleFavGenre(targetGenre: string) {
    if (favGenres.includes(targetGenre)) {
      setFavGenres(favGenres.filter(genre => genre !== targetGenre));
    } else {
      setFavGenres([...favGenres, targetGenre]);
    }
  }

  return (
    <Routes>
        <Route path="/" element={<Home displayName={displayName} favSongs={favSongs} favGenres={favGenres} toggleFavSong={toggleFavSong} isDark={isDark}/>} />
        <Route path="/discover" element={<Discover genres={genres} favSongs={favSongs} toggleFavSong={toggleFavSong}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile displayName={displayName} genres={genres} favGenres={favGenres} setDisplayName={setDisplayName} toggleFavGenre={toggleFavGenre} isDark={isDark} toggleIsDark={toggleDarkMode} />} />
        <Route path="/favorites" element={<Favorites favSongs={favSongs} toggleFavSong={toggleFavSong}/>} />

        <Route path="/songs/:songId" element={<SongDetails />} />
    </Routes>
  );
}

export default App;
