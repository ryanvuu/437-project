import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { UserProvider } from "../UserProvider";

export function registerUserRoutes(app: express.Application, userProvider: UserProvider) {

  // Get a user's favorite songs
  app.get("/api/users/:username/favorites", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    userProvider.getFavorites(username)
      .then(favorites => {
        if (!favorites) {
          return res.status(404).send({
            error: "Not Found",
            message: "User doesn't exist"
          });
        }

        waitDuration(2000)
          .then(() => {
            res.json(favorites);
          });
      })
      .catch(error => {
        console.error("Error! Failed to get user's favorites:", error);
        return res.status(500).send();
      });
  });

  // Add a song to a user's favorite songs
  app.put("/api/users/:username/favorites", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;
    const songId = req.body.songId;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    if (!songId) {
      return res.status(400).send({
        error: "Bad Request",
        message: "Missing song id"
      });
    }

    if (!ObjectId.isValid(songId)) {
      return res.status(404).send({
        error: "Not Found",
        message: "Song does not exist"
      });
    }

    const songIdObj = ObjectId.createFromHexString(songId);

    userProvider.addToFavorites(username, songIdObj)
      .then(numDocsUpdated => {
        if (numDocsUpdated > 0) {
          return res.status(204).send();
        }
        else {
          return res.status(404).send({
            error: "Not Found",
            message: "User does not exist"
          });
        }
      })
      .catch(error => {
        console.error("Failed to update user's favorites:", error);
        return res.status(500).send();
      });
  });

  // Remove a song from a user's favorite songs
  app.delete("/api/users/:username/favorites/:songId", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;
    const songId = req.params.songId;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    if (!songId) {
      return res.status(400).send({
        error: "Bad Request",
        message: "Missing song id"
      });
    }

    if (!ObjectId.isValid(songId)) {
      return res.status(404).send({
        error: "Not Found",
        message: "Song does not exist"
      });
    }

    const songIdObj = ObjectId.createFromHexString(songId);

    userProvider.removeFromFavorites(username, songIdObj)
      .then(numDocsUpdated => {
        if (numDocsUpdated > 0) {
          return res.status(204).send();
        }
        else {
          return res.status(404).send({
            error: "Not Found",
            message: "User does not exist"
          });
        }
      })
      .catch(error => {
        console.error("Failed to update user's favorites:", error);
        return res.status(500).send();
      });
  });


}

function waitDuration(numMs: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, numMs));
}