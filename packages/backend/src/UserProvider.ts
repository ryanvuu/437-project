import { MongoClient, ObjectId, Collection } from "mongodb";

export interface IUserDocument {
  _id?: ObjectId;
  username: string;
  displayName: string;
  genrePrefs: string[];
  favorites: ObjectId[];
}

export class UserProvider {
    private collection: Collection<IUserDocument>

    constructor(private readonly mongoClient: MongoClient) {
        const collectionName = process.env.USERS_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing USERS_COLLECTION_NAME from environment variables");
        }
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    async getFavorites(username: string) {
      return this.collection.aggregate([
        {
          $match: { username: username }
        },
        {
          $lookup: {
            from: process.env.SONGS_COLLECTION_NAME,
            localField: "favorites",
            foreignField: "_id",
            as: "denormSongs"
          }
        },
        {
          $project: {
            favorites: {
              $map: {
                input: "$denormSongs",
                as: "song",
                in: {
                  id: "$$song._id",
                  title: "$$song.title",
                  artist: "$$song.artist",
                  genre: "$$song.genre",
                  duration: "$$song.duration",
                  releaseYear: "$$song.releaseYear",
                  image: "$$song.image"
                }
              }
            },
            _id: 0
          }
        }
      ]).toArray()
        .then(results => {
          return results.length > 0 && results[0].favorites ? results[0].favorites : null;
        });
    }

    async addToFavorites(username: string, songId: ObjectId): Promise<number> {
      return this.collection.updateOne(
        { username: username },
        { $addToSet: { favorites: songId } }
      )
        .then(updatedDoc => {
          return updatedDoc.matchedCount;
        });
    }

    async removeFromFavorites(username: string, songId: ObjectId): Promise<number> {
      return this.collection.updateOne(
        { username: username },
        { $pull: { favorites: songId } }
      )
      .then(updatedDoc => {
        return updatedDoc.matchedCount;
      });
    }

    async getGenrePrefs(username: string) {
      return this.collection.findOne({ username: username })
        .then(userDoc => {
          return userDoc?.genrePrefs;
        });
    }

    async addToGenrePrefs(username: string, genre: string): Promise<number> {
      return this.collection.updateOne(
        { username: username },
        { $addToSet: { genrePrefs: genre } }
      )
        .then(updatedDoc => {
          return updatedDoc.matchedCount;
        });
    }

    async removeFromGenrePrefs(username: string, genre: string): Promise<number> {
      return this.collection.updateOne(
        { username: username },
        { $pull: { genrePrefs: genre } }
      )
      .then(updatedDoc => {
        return updatedDoc.matchedCount;
      });
    }

    async getDisplayName(username: string) {
      return this.collection.findOne({ username: username })
        .then(userDoc => {
          return userDoc?.displayName;
        });
    }

    async updateDisplayName(username: string, newName: string): Promise<number> {
      return this.collection.updateOne({ username: username }, { $set: { displayName: newName } })
        .then(updatedDoc => {
          return updatedDoc.matchedCount;
        });
    }

}