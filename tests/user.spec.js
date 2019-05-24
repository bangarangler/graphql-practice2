import "@babel/polyfill";
import "cross-fetch/polyfill";
import ApolloBoost, { gql } from "apollo-boost";
import bcrypt from "bcryptjs";
import prisma from "../src/prisma";

const client = new ApolloBoost({
  uri: "http://localhost:4000"
});

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: "Jen",
      email: "jen@test.com",
      password: bcrypt.hashSync("Blue!523wa")
    }
  });
  await prisma.mutation.createPost({
    data: {
      title: "My Published Post",
      body: "",
      published: true,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  });
  await prisma.mutation.createPost({
    data: {
      title: "My draft Post",
      body: "",
      published: false,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  });
});

test("Should create a new user", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: { name: "Jon", email: "jon@example.com", password: "MyPass123" }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser
  });
  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(exists).toBe(true);
});

//import { getFirstName, isValidPassword } from "../src/utils/user.js";

//test("Should return first name when given full name", () => {
//const firstName = getFirstName("Jon Palacio");
//expect(firstName).toBe("Jon");
////if (firstName !== "Jon") {
////throw new Error("Expected the string Jon");
////}
//});

//test("Should return first name when given first name", () => {
//const firstName = getFirstName("Liz");
//expect(firstName).toBe("Liz");
//});

//test("Should reject password shorter than 8 charachters", () => {
//const isValid = isValidPassword("four");
//expect(isValid).toBe(false);
//});

//test("Should reject password that contains the word password", () => {
//const notPassword = isValidPassword("abcPassword098");
//expect(notPassword).toBe(false);
//});

//test("Should validate a correct password", () => {
//const isValid = isValidPassword("testing12");
//expect(isValid).toBe(true);
//});
