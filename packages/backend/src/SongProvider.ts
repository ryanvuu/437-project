import { MongoClient, ObjectId, Collection } from "mongodb";

interface ISongDocument {
  _id: ObjectId;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  releaseYear: number;
  image: string;
}

export class SongProvider {
    private collection: Collection<ISongDocument>

    constructor(private readonly mongoClient: MongoClient) {
        const collectionName = process.env.SONGS_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing SONGS_COLLECTION_NAME from environment variables");
        }
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    async getAllSongs() {
      return this.collection.aggregate().toArray()
        .then(results => {
          return results.map(song => ({
            id: song._id,
            title: song.title,
            artist: song.artist,
            genre: song.genre,
            duration: song.duration,
            releaseYear: song.releaseYear,
            image: song.image
          }));
        });
    }

}