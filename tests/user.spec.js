import "@babel/polyfill";
import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import { getFirstName, isValidPassword } from "../src/utils/user.js";
import prisma from "../src/prisma";
import seedDatabase, { userOne } from "./utils/seedDatabase";
import getClient from "./utils/getClient.js";
import { createUser, getUsers, login, getProfile } from "./utils/operations.js";

const client = getClient();

beforeEach(seedDatabase);

test("Should create a new user", async () => {
  const variables = {
    data: {
      name: "Jon",
      email: "jon@test.com",
      password: "qwerty12345"
    }
  };

  const response = await client.mutate({
    mutation: createUser,
    variables
  });
  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(exists).toBe(true);
});

test("Should expose public author profiles", async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;
  const response = await client.query({ query: getUsers });
  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe("Jen");
});

test("Should not login with bad credentials", async () => {
  const variables = {
    data: {
      email: "jeff@example.com",
      password: "apidng898"
    }
  };
  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test("Should not signup user with invalid password ", async () => {
  const variables = {
    data: {
      name: "Jon",
      email: "jon@test.com",
      password: "pass"
    }
  };
  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test("Should fetch user profile", async () => {
  const client = getClient(userOne.jwt);
  const { data } = await client.query({ query: getProfile });
  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});

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
