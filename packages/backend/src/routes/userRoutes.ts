import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { UserProvider } from "../UserProvider";

const MIN_DISPLAY_LEN = 1;

function isAlphanumeric(str: string): boolean {
  // The regex literal /^[a-zA-Z0-9]*$/ is perfectly valid in TypeScript.
  return /^[a-zA-Z0-9]*$/.test(str);
}

export function registerUserRoutes(app: express.Application, userProvider: UserProvider) {

  // Get a user's favorite songs
  // endpoint will eventually be /api/favorites after adding authentication
  app.get("/api/:username/favorites", async (req: Request, res: Response): Promise<any> => {
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
  // endpoint will eventually be /api/favorites after adding authentication
  app.put("/api/:username/favorites", async (req: Request, res: Response): Promise<any> => {
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
  // endpoint will eventually be /api/favorites/:songId after adding authentication
  app.delete("/api/:username/favorites/:songId", async (req: Request, res: Response): Promise<any> => {
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

  // Get a user's genre preferences
  // endpoint will eventually be /api/genre-preferences after adding authentication
  app.get("/api/:username/genre-preferences", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    userProvider.getGenrePrefs(username)
      .then(genres => {
        if (!genres) {
          return res.status(404).send({
            error: "Not Found",
            message: "User doesn't exist"
          });
        }

        waitDuration(2000)
          .then(() => {
            res.json(genres);
          });
      })
      .catch(error => {
        console.error("Error! Failed to get user's genre preferences:", error);
        return res.status(500).send();
      });
  });

  // Add a song to a user's genre preferences
  // endpoint will eventually be /api/genre-preferences after adding authentication
  app.put("/api/:username/genre-preferences", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;
    const genre = req.body.genre;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    if (!genre) {
      return res.status(400).send({
        error: "Bad Request",
        message: "Missing genre"
      });
    }

    userProvider.addToGenrePrefs(username, genre)
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
        console.error("Failed to add to user's genre preferences:", error);
        return res.status(500).send();
      });
  });

  // Add a song to a user's genre preferences
  // endpoint will eventually be /api/genre-preferences after adding authentication
   app.delete("/api/:username/genre-preferences/:genre", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;
    const genre = req.params.genre;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    if (!genre) {
      return res.status(400).send({
        error: "Bad Request",
        message: "Missing genre"
      });
    }

    userProvider.removeFromGenrePrefs(username, genre)
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
        console.error("Failed to remove from user's genre preferences:", error);
        return res.status(500).send();
      });
  });

  // Get a user's display name
  // endpoint will eventually be /api/profile/display-name after adding authentication
  app.get("/api/:username/profile/display-name", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    userProvider.getDisplayName(username)
      .then(displayName => {
        if (!displayName) {
          return res.status(404).send({
            error: "Not Found",
            message: "User doesn't exist"
          });
        }

        waitDuration(2000)
          .then(() => {
            res.json(displayName);
          });
      })
      .catch(error => {
        console.error("Error! Failed to get user's display name:", error);
        return res.status(500).send();
      });
  });

  // Update a user's display name
  // endpoint will eventually be /api/profile/display-name after adding authentication
  app.put("/api/:username/profile/display-name", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;
    const newName = req.body.newName;

    if (!username) {
      return res.status(400).send({
        error: "Bad Request",
        message: "User not logged in"
      });
    }

    if (!newName) {
      return res.status(400).send({
        error: "Bad Request",
        message: "Missing display name"
      });
    }

    if (newName.length <= 0) {
      return res.status(422).send({
        error: "Unprocessable Entity",
        message: `New display name must be at least ${MIN_DISPLAY_LEN} characters`
      });
    }

    if (!isAlphanumeric(newName)) {
      return res.status(422).send({
        error: "Unprocessable Entity",
        message: `New display name must contain only alphanumerical characters`
      });
    }

    userProvider.updateDisplayName(username, newName)
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
        console.error("Failed to update display name:", error);
        return res.status(500).send();
      });
  });


}

function waitDuration(numMs: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, numMs));
}