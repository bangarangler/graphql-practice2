import "@babel/polyfill";
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

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log(`Server is up!`);
});
