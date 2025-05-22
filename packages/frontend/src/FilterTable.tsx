import "./styles/discover.css";

const genres = ["all", "pop", "rock", "hip-hop", "r&b", "jazz", "classical", "disco", "edm", "country"];

function FilterTable() {
  return (
    <div className="genre-filters">
      {genres?.map((genre) => (
        <button
          key={genre}
          className="genre-button"
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default FilterTable;