import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { ValidRoutes } from "./common/ValidRoutes";
import { connectMongo } from "./connectMongo";
import { SongProvider } from "./SongProvider";
import { UserProvider } from "./UserProvider";
import { CredentialsProvider } from "./CredentialsProvider";
import { registerSongRoutes } from "./routes/songRoutes";
import { registerUserRoutes } from "./routes/userRoutes";
import { registerAuthRoutes } from "./routes/authRoutes";
import { verifyAuthToken } from "./verifyAuthToken";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const SONG_COVERS_DIR = process.env.SONG_COVERS_DIR || "covers";

const app = express();

app.locals.JWT_SECRET = process.env.JWT_SECRET

app.use(express.json());

app.use(express.static(STATIC_DIR));
app.use("/covers", express.static(SONG_COVERS_DIR));
app.use("/api/*", verifyAuthToken);

app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
    const options = {
        root: path.join(__dirname, "../../frontend/dist")
    }
    res.sendFile("index.html", options);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

connectMongo().connect()
    .then(client => {
        const songProvider = new SongProvider(client);
        const userProvider = new UserProvider(client);
        const credsProvider = new CredentialsProvider(client);
        registerSongRoutes(app, songProvider);
        registerUserRoutes(app, userProvider);
        registerAuthRoutes(app, credsProvider);
    })
    .catch(error => {
        console.error("MongoDB connection failed:", error);
    });
