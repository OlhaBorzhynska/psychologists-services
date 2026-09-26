import { getDatabase } from "firebase/database";

import { app } from "./config";

export const database = getDatabase(
  app,
  "https://psychologists-services-9f8bb-default-rtdb.europe-west1.firebasedatabase.app",
);
