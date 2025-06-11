import Navbar from "../Navbar";
import { Link } from "react-router";
import "../styles/profile.css";
import logo from "../images/logo.png";
import { ModalDisplayName, ModalGenrePrefs } from "../ProfileModals";
import { useState } from "react";

interface IProfile {
  displayName: string;
  genres: string[];
  genrePrefs: string[];
  isDark: boolean;
  toggleIsDark: (isDark: boolean) => void;
  isGenrePrefsLoading: boolean;
  isGenrePrefsError: boolean;
  isNameLoading: boolean;
  isNameError: boolean;
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
          {props.isNameError && <h1 className="h1-profile">Failed to load display name</h1>}
          <h1 className="h1-profile">{props.isNameLoading ? "Loading..." : props.displayName}</h1>

          <div className="profile-container">
            <div className="profile-item genre-favs">
              {props.isGenrePrefsLoading ? <p style={{fontSize: "2rem", margin: "2rem"}}>Loading genres...</p> : null}
              {props.isGenrePrefsError ? <p style={{fontSize: "2rem", color: "#F9EE45", margin: "2rem"}}>Failed to load genres.</p> : null}
              {!props.isGenrePrefsLoading && !props.isGenrePrefsError
                ? <ul className="fav-genres-list">
                    {props.genrePrefs?.map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                : null}
              
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
      />

      <ModalGenrePrefs
        headerLabel="Edit Favorite Genres"
        genres={props.genres}
        genrePrefs={props.genrePrefs}
        isOpen={isFavGenresOpen}
        onCloseRequested={closeGenresModal}
      />
      <Navbar />
    </div>
  )
}