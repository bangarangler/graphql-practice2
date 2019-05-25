import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

const userOne = {
  input: {
    name: "Jen",
    email: "jen@test.com",
    password: bcrypt.hashSync("Blue!523wa")
  },
  user: undefined,
  jwt: undefined
};

const postOne = {
  input: {
    title: "My Published Post",
    body: "",
    published: true
  },
  post: undefined
};

const postTwo = {
input: {
title: "My draft Post",
body: "",
published: false
},
post: undefined
}

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  // create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
};

export default seedDatabase;
export { userOne, postOne, postTwo };
