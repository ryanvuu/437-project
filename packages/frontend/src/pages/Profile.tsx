import Navbar from "../Navbar";
import { Link } from "react-router";
import "../styles/profile.css";
import logo from "../images/logo.png";
import { ModalDisplayName, ModalFavoriteGenres } from "../ProfileModals";
import { useState } from "react";

interface IProfile {
  displayName: string;
  genres: string[];
  favGenres: string[];
  setDisplayName: (newDisplayName: string) => void;
  toggleFavGenre: (targetGenre: string) => void;
  isDark: boolean;
  toggleIsDark: (isDark: boolean) => void;
}

export function Profile(props: IProfile) {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isFavGenresOpen, setIsFavGenresOpen] = useState(false);

  function openDisplayModal() {
    setIsDisplayOpen(true);
  }

  function closeDisplayModal() {
    setIsDisplayOpen(false);
  }

  function openGenresModal() {
    setIsFavGenresOpen(true);
  }

  function closeGenresModal() {
    setIsFavGenresOpen(false);
  }

  return (
    <div>
      <div className="pic-name">
        <img className="profile-pic" src={logo} alt="" height="200" width="200"></img>

        <div className="desktop-prof">
          <h1 className="h1-profile">{props.displayName}</h1>

          <div className="profile-container">
            <div className="profile-item genre-favs">
              <ul className="fav-genres-list">
                {props.favGenres?.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
              
            </div>

            <div className="edit-display-genre-btns">

              <button
                className="open-prof-modal-btn"
                onClick={openDisplayModal}>
                  Edit Display Name
              </button>

              <button
                className="open-prof-modal-btn"
                onClick={openGenresModal}>
                Edit Favorite Genres
              </button>

              <Link
                to="/favorites"
                className="open-prof-modal-btn">
                View Favorite Songs
              </Link>

              <label htmlFor="dark-mode-box">
                <input
                  type="checkbox"
                  id="dark-mode-box"
                  checked={props.isDark}
                  onChange={() => props.toggleIsDark(!props.isDark)}/> Dark mode
              </label>

            </div>

          </div>

        </div>
      </div>
      
      <ModalDisplayName 
        headerLabel="Edit Display Name"
        currentName={props.displayName}
        isOpen={isDisplayOpen}
        onCloseRequested={closeDisplayModal}
        onDisplayNameSet={props.setDisplayName}
      />

      <ModalFavoriteGenres
        headerLabel="Edit Favorite Genres"
        genres={props.genres}
        favGenres={props.favGenres}
        isOpen={isFavGenresOpen}
        onToggleFavGenre={props.toggleFavGenre}
        onCloseRequested={closeGenresModal}
      />
      <Navbar />
    </div>
  )
}