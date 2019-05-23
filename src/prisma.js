import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index.js";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "thisisasupersecrettextthatgoesrighthere",
  fragmentReplacements
});

export default prisma;

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.exists
//   .Comment({
//     id: "cjvv0jwfk00ku0731tmdfksqn",
//     author: {
//       id: "cjvv0bx1n00hu0731n74aozsk"
//     }
//   })
//   .then(exists => {
//     console.log(exists);
//   });

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//   if (!userExists) {
//     throw new Error("No User Found!");
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     `{ author { id name email posts { id title published }} }`
//   );
//   return post.author;
// };
// // createPostForUser("cjvv0bx1n00hu0731n74aozsk", {
// //   title: "New post for Molly round 2",
// //   body: "Molly Molly Molly Molly Molly",
// //   published: true
// // })
// //   .then(user => {
// //     console.log(JSON.stringify(user, undefined, 2));
// //   })
// //   .catch(err => {
// //     console.log(err.message);
// //   });

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });
//   if (!postExists) {
//     throw new Error("Post Can Not Be Found!");
//   }
//   const updatedPost = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId
//       },
//       data
//     },
//     `{ author { id name email posts { id title published }}}`
//   );
//   return updatedPost.author;
// };
// // updatePostForUser("cjvv5yxe000wz07314wb6vixu", {
// //   published: true
// // })
// //   .then(user => {
// //     console.log(JSON.stringify(user, undefined, 2));
// //   })
// //   .catch(err => {
// //     console.log(err.message);
// //   });

// // const deletePost = async postId => {
// //   const post = await prisma.mutation.deletePost(
// //     {
// //       where: {
// //         id: postId
// //       }
// //     },
// //     `{ id }`
// //   );
// //   return post;
// // };
// // deletePost("cjvv5zgj900x607316sxsj2dq").then(console.log("success"));
