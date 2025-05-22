export interface ISong {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  releaseYear: number;
}

export const SONG_RECS: ISong[] = [
  { id: "rec-0", title: "World Jam", artist: "Joe", genre: "Pop", duration: "02:42", releaseYear: 2017 },
  { id: "rec-1", title: "Rose Collar", artist: "Joe", genre: "Pop", duration: "02:42", releaseYear: 2017 },
  { id: "rec-2", title: "Bones", artist: "Joe", genre: "Pop", duration: "02:42", releaseYear: 2017 },
  { id: "rec-3", title: "Grenade", artist: "Bruno Mars", genre: "Pop", duration: "03:42", releaseYear: 2010 },
  { id: "rec-4", title: "Spiderhead", artist: "Cage The Elephant", genre: "Indie Rock", duration: "03:43", releaseYear: 2013 },
  { id: "rec-5", title: "Light Heist", artist: "Chief Keef", genre: "Hip-hop", duration: "04:01", releaseYear: 2016 },
  { id: "rec-6", title: "Bags", artist: "Clairo", genre: "Indie", duration: "04:21", releaseYear: 2019 },
  { id: "rec-7", title: "Out of Touch", artist: "Daryl Hall & John Oates", genre: "Rock", duration: "04:10", releaseYear: 1984 },
  { id: "rec-8", title: "Fever", artist: "ENHYPEN", genre: "K-Pop", duration: "02:52", releaseYear: 2021 },
  { id: "rec-9", title: "North Face", artist: "Odie", genre: "R&B", duration: "03:17", releaseYear: 2018 }
]

export const SONG_LIST: ISong[] = [
  { id: "song-0", title: "Last Friday Night (T.G.I.F)", artist: "Katy Perry", genre: "Pop", duration: "03:50", releaseYear: 2011 },
  { id: "song-1", title: "Grenade", artist: "Bruno Mars", genre: "Pop", duration: "03:42", releaseYear: 2010 },
  { id: "song-2", title: "Light Heist", artist: "Chief Keef", genre: "Hip-hop", duration: "04:01", releaseYear: 2016 },
  { id: "song-4", title: "Tree Among Shrubs", artist: "Men I Trust", genre: "Indie", duration: "03:08", releaseYear: 2021 },
  { id: "song-5", title: "Spiderhead", artist: "Cage The Elephant", genre: "Indie Rock", duration: "03:43", releaseYear: 2013 }
]