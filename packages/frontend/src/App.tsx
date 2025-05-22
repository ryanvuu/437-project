import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SongDetails } from './pages/SongDetails';
import { About } from './pages/About';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/songs/:songId" element={<SongDetails />} />
    </Routes>
  );
}

export default App;
