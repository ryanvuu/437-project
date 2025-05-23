import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SongDetails } from './pages/SongDetails';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { useState } from 'react';

const genres = ["pop", "rock", "hip-hop", "indie", "r&b", "jazz", "classical", "disco", "edm", "country"];

function App() {
  const [displayName, setDisplayName] = useState("User12345");
  const [favSongs, setFavSongs] = useState<string[]>([]);
  const [favGenres, setFavGenres] = useState<string[]>([]);

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
        <Route path="/" element={<Home displayName={displayName} favSongs={favSongs} favGenres={favGenres} toggleFavSong={toggleFavSong}/>} />
        <Route path="/discover" element={<Discover genres={genres} favSongs={favSongs} toggleFavSong={toggleFavSong}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile displayName={displayName} genres={genres} favGenres={favGenres} setDisplayName={setDisplayName} toggleFavGenre={toggleFavGenre}/>} />

        <Route path="/songs/:songId" element={<SongDetails />} />
    </Routes>
  );
}

export default App;
