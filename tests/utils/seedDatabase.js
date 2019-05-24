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

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  // create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  await prisma.mutation.createPost({
    data: {
      title: "My Published Post",
      body: "",
      published: true,
      author: {
        connect: {
          id: userOne.user.id
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
          id: userOne.user.id
        }
      }
    }
  });
};

export default seedDatabase;
export { userOne };
