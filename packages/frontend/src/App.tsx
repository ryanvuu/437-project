import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SongDetails } from './pages/SongDetails';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { useState } from 'react';

function App() {
  const [displayName, setDisplayName] = useState("User12345");

  return (
    <Routes>
        <Route path="/" element={<Home displayName={displayName}/>} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile displayName={displayName} setDisplayName={setDisplayName}/>} />

        <Route path="/songs/:songId" element={<SongDetails />} />
    </Routes>
  );
}

export default App;
