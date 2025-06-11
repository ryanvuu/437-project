import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { IUserDocument } from "./UserProvider";

interface ICredentialsDocument {
    _id: string;
    username: string;
    password: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;
    private readonly usersCollection: Collection<IUserDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        const USERS_COLLECTION_NAME = process.env.USERS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        if (!USERS_COLLECTION_NAME) {
            throw new Error("Missing USERS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
        this.usersCollection = mongoClient.db().collection<IUserDocument>(USERS_COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string) {
        const userCreds = await this.collection.findOne({username: username});
        if (userCreds) {
            console.error("Error: user already exists");
            return false;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

        const userCredsRes = await this.collection.insertOne({
          _id: username,
          username: username,
          password: hashedPassword
        });

        if (!userCredsRes.acknowledged) {
          console.error("Error: failed to insert into user credentials");
          return false;
        }

        const userProfileRes = await this.usersCollection.insertOne({
          username: username,
          displayName: username,
          genrePrefs: [],
          favorites: []
        });

        if (!userCredsRes.acknowledged) {
          console.error("Error: failed to insert into users");
          return false;
        }

        return true;
    }

    async verifyPassword(username: string, plaintextPassword: string) {
        const user = await this.collection.findOne(
          { _id: username }
        );

        if (!user) {
            console.error("Error: user doesn't exist");
            return false;
        }
        
        return await bcrypt.compare(plaintextPassword, user.password)
    }
}
