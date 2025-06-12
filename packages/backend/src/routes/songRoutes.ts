import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { SongProvider } from "../SongProvider";

export function registerSongRoutes(app: express.Application, songProvider: SongProvider) {
  // GET all songs
  app.get("/api/songs", (req: Request, res: Response) => {
    songProvider.getAllSongs()
      .then(songs => {
        res.json(songs);
      })
      .catch(error => {
        console.error("Failed to retrieve songs:", error)
      });
  });

}
