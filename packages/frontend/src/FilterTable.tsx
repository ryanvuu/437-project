import "./styles/discover.css";

interface IFilterTable {
  genres: string[];
  activeGenres: string[];
  onGenreToggle:  (targetGenre: string) => void;
  onGenreClear: () => void;
}

export function FilterTable(props: IFilterTable) {
  return (
    <div className="genre-filters">
      {props.genres?.map((genre) => (
        <button
          key={genre}
          className={props.activeGenres.includes(genre) ? "genre-active" : "genre-button"}
          onClick={() => props.onGenreToggle(genre)}
        >
          {genre}
        </button>
      ))}

      <button
        className="genre-button"
        onClick={props.onGenreClear}
      >
        clear
      </button>
    </div>
  )
}
