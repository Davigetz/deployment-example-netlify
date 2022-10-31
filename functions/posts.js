const { prisma } = require("../prisma/prismagnral");

exports.handler = async (event, context, callback) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        postauthor: {
          include: {
            author: true,
          },
        },
        postCategory: {
          include: {
            category: true,
          },
        },
      },
    });
    console.log(posts);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(error),
    };
  }
};
