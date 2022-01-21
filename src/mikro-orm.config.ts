import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "/migrations"), // path to folder with migration files
    // pattern: /^[\w-]+\d+\.[tj]$/, // how to match migration files
  },
  entities: [Post, User],
  dbName: "lireddit",
  type: "postgresql",
  user: "izaak.chater",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
