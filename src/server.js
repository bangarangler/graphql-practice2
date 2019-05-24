import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db.js";
import { resolvers, fragmentReplacements } from "./resolvers/index.js";
import prisma from "./prisma";

const pubsub = new PubSub();

//RESOLVERS
const server = new GraphQLServer({
  typeDefs: `./src/schema.graphql`,
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    };
  },
  fragmentReplacements
});

export default server;
