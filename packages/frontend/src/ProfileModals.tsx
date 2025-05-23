import { useRef } from 'react';
import { useState } from 'react';

interface IModalDisplayName {
  headerLabel: string;
  currentName: string;
  isOpen: boolean;
  onCloseRequested: () => void;
  onDisplayNameSet: (newName: string) => void;
}

interface IEditDisplayName {
  displayInputText: string;
  onInputSave: (inputText: string) => void;
  onSaveClicked: () => void;
}

interface IEditFavoriteGenres {
  genres: string[];
  favGenres: string[];
  onToggleFavGenre: (targetGenre: string) => void;
}

interface IModalFavoriteGenres {
  headerLabel: string;
  genres: string[];
  favGenres: string[];
  isOpen: boolean;
  onToggleFavGenre: (targetGenre: string) => void;
  onCloseRequested: () => void;
}

export function ModalDisplayName(props: IModalDisplayName) {
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [displayInputText, setDisplayInputText] = useState(props.currentName);

  function handleModalClicked(e: React.MouseEvent<HTMLElement>) {
    // check if the inner div refernce isn't null and then check which part the user clicked
    if (innerDivRef.current && !innerDivRef.current?.contains(e.target as Node)) {
      props.onCloseRequested();
    }
  }

  function handleSaveClicked() {
    props.onDisplayNameSet(displayInputText);
    setDisplayInputText(`${displayInputText}`);
    props.onCloseRequested();
  }

  if (!props.isOpen) {
    return null;
  }

  return (
    <div
      className="modal-display-popup"
      onClick={handleModalClicked}>
      <div
        className="modal-display-edit"
        ref={innerDivRef}>
        <header className="modal-display-header">
          <h1 className="modal-display-heading">{props.headerLabel}</h1>
          <button
            className="close-display-edit"
            aria-label="Close"
            onClick={props.onCloseRequested}>X</button>
        </header>
        <EditDisplayName
          displayInputText={displayInputText}
          onInputSave={setDisplayInputText}
          onSaveClicked={handleSaveClicked}
        />
      </div>
    </div>
  );
}

function EditDisplayName(props: IEditDisplayName) {
  return (
    <div>
      <input
        className="edit-display-input"
        placeholder="Edit Display Name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onInputSave(e.target.value)}
        value={props.displayInputText}
      />
      <button
        className="edit-display-set-button"
        onClick={props.onSaveClicked}
      > Save
      </button>
    </div>
  )
}

export function ModalFavoriteGenres(props: IModalFavoriteGenres) {
  const innerDivRef = useRef<HTMLDivElement>(null);

  function handleModalClicked(e: React.MouseEvent<HTMLElement>) {
    // check if the inner div refernce isn't null and then check which part the user clicked
    if (innerDivRef.current && !innerDivRef.current?.contains(e.target as Node)) {
      props.onCloseRequested();
    }
  }

  if (!props.isOpen) {
    return null;
  }

  return (
    <div
      className="modal-display-popup"
      onClick={handleModalClicked}>
      <div
        className="modal-display-edit"
        ref={innerDivRef}>
        <header className="modal-display-header">
          <h1 className="modal-display-heading">{props.headerLabel}</h1>
          <button
            className="close-display-edit"
            aria-label="Close"
            onClick={props.onCloseRequested}>X</button>
        </header>
        <EditFavoriteGenres
          genres={props.genres}
          favGenres={props.favGenres}
          onToggleFavGenre={props.onToggleFavGenre}
        />
      </div>
    </div>
  );
}

function EditFavoriteGenres(props: IEditFavoriteGenres) {
  return (
    <div className="edit-genres-btns">
      {props.genres?.map((genre) => (
        <button
          key={genre}
          className={props.favGenres.includes(genre) ? "genre-active" : "genre-button"}
          onClick={() => props.onToggleFavGenre(genre)}
        >
          {genre} 
        </button>
      ))}
    </div>
  )
}