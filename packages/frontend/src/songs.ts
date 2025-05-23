const IMG_TEMP = "../images/logo.png";

export interface ISong {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  releaseYear: number;
  image: string;
}

export const SONG_RECS: ISong[] = [
  { id: "song-6", title: "World Jam", artist: "Joe", genre: "Pop", duration: "02:42", releaseYear: 2017, image: IMG_TEMP},
  { id: "song-7", title: "Rose Collar", artist: "Joe", genre: "Pop", duration: "02:42", releaseYear: 2017, image: IMG_TEMP},
  { id: "song-8", title: "Bones", artist: "Joe", genre: "Pop", duration: "02:42", releaseYear: 2017, image: IMG_TEMP },
  { id: "song-1", title: "Grenade", artist: "Bruno Mars", genre: "Pop", duration: "03:42", releaseYear: 2010, image: IMG_TEMP },
  { id: "song-5", title: "Spiderhead", artist: "Cage The Elephant", genre: "Indie Rock", duration: "03:43", releaseYear: 2013, image: IMG_TEMP },
  { id: "song-2", title: "Light Heist", artist: "Chief Keef", genre: "Hip-hop", duration: "04:01", releaseYear: 2016, image: IMG_TEMP },
  { id: "song-9", title: "Bags", artist: "Clairo", genre: "Indie", duration: "04:21", releaseYear: 2019, image: IMG_TEMP },
  { id: "song-10", title: "Out of Touch", artist: "Daryl Hall & John Oates", genre: "Rock", duration: "04:10", releaseYear: 1984, image: IMG_TEMP },
  { id: "song-11", title: "Fever", artist: "ENHYPEN", genre: "K-Pop", duration: "02:52", releaseYear: 2021, image: IMG_TEMP },
  { id: "rsong-12", title: "North Face", artist: "Odie", genre: "R&B", duration: "03:17", releaseYear: 2018, image: IMG_TEMP }
]

export const SONG_LIST: ISong[] = [
  { id: "song-0", title: "Last Friday Night (T.G.I.F)", artist: "Katy Perry", genre: "Pop", duration: "03:50", releaseYear: 2011, image: IMG_TEMP },
  { id: "song-1", title: "Grenade", artist: "Bruno Mars", genre: "Pop", duration: "03:42", releaseYear: 2010, image: IMG_TEMP },
  { id: "song-2", title: "Light Heist", artist: "Chief Keef", genre: "Hip-hop", duration: "04:01", releaseYear: 2016, image: IMG_TEMP },
  { id: "song-4", title: "Tree Among Shrubs", artist: "Men I Trust", genre: "Indie", duration: "03:08", releaseYear: 2021, image: IMG_TEMP },
  { id: "song-5", title: "Spiderhead", artist: "Cage The Elephant", genre: "Indie Rock", duration: "03:43", releaseYear: 2013, image: IMG_TEMP }
]