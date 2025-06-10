import { useRef } from 'react';
import { useState } from 'react';
import { useToggleGenrePrefs } from '../hooks/queryGenrePrefs';

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
  isSubmitting: boolean;
  hasSubmitErr: boolean;
}

interface IEditGenrePrefs {
  genres: string[];
  genrePrefs: string[];
}

interface IModalGenrePrefs {
  headerLabel: string;
  genres: string[];
  genrePrefs: string[];
  isOpen: boolean;
  onCloseRequested: () => void;
}

export function ModalDisplayName(props: IModalDisplayName) {
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [displayInputText, setDisplayInputText] = useState(props.currentName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitErr, setHasSubmitErr] = useState(false);


  function handleModalClicked(e: React.MouseEvent<HTMLElement>) {
    // check if the inner div refernce isn't null and then check which part the user clicked
    if (innerDivRef.current && !innerDivRef.current?.contains(e.target as Node)) {
      props.onCloseRequested();
    }
  }

  async function handleSaveClicked() {
    setDisplayInputText(displayInputText);
    setIsSubmitting(true);
    fetch("/api/songs")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        setHasSubmitErr(true);
        throw new Error(`Failed to update display name ${res.status}`);
      })
      .then(() => {
        props.onDisplayNameSet(displayInputText);
        props.onCloseRequested();
        setHasSubmitErr(false);
      })
      .catch(() => {
        setHasSubmitErr(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      })
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
          isSubmitting={isSubmitting}
          hasSubmitErr={hasSubmitErr}
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
      {props.isSubmitting && <p style={{fontWeight: "bold", color: "black"}}>Setting new display name...</p>}
      {props.hasSubmitErr && <p style={{fontWeight: "bold", color: "red"}}>Error updating display name</p>}
    </div>
  )
}

export function ModalGenrePrefs(props: IModalGenrePrefs) {
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
        <EditGenrePrefs
          genres={props.genres}
          genrePrefs={props.genrePrefs}
        />
      </div>
    </div>
  );
}

function EditGenrePrefs(props: IEditGenrePrefs) {
  const { mutate: onToggleFavGenre } = useToggleGenrePrefs();

  return (
    <div className="edit-genres-btns">
      {props.genres?.map((genre) => (
        <button
          key={genre}
          className={props.genrePrefs.includes(genre) ? "genre-active" : "genre-button"}
          onClick={() => onToggleFavGenre(genre)}
        >
          {genre} 
        </button>
      ))}
    </div>
  )
}