import Navbar from "../Navbar";
import "../styles/profile.css";
import logo from "../images/logo.png";
import { ModalDisplayName } from "../ModalDisplayName";
import { useState } from "react";

export function Profile() {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [displayName, setDisplayName] = useState("User12345");

  function openModal() {
    setIsDisplayOpen(true);
  }

  function closeModal() {
    setIsDisplayOpen(false);
  }

  return (
    <div>
      <div className="pic-name">
        <img className="profile-pic" src={logo} alt="" height="200" width="200"></img>

        <div className="desktop-prof">
          <h1 className="h1-profile">{displayName}</h1>

          <div className="profile-container">

            <div className="profile-item genre-favs">
              Genre Favorites
            </div>

            <div className="edit-display-genre-btns">

              <button
                className="open-prof-modal-btn"
                onClick={openModal}>
                  Edit Display Name
              </button>

              <button
                className="open-prof-modal-btn">
                Edit Favorite Genres
              </button>

            </div>

          </div>

        </div>
      </div>
      
      


      <ModalDisplayName 
        headerLabel="Edit Display Name"
        currentName={displayName}
        isOpen={isDisplayOpen}
        onCloseRequested={closeModal}
        onDisplayNameSet={setDisplayName}
      />
      <Navbar />
    </div>
  )
}