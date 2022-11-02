const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.handler = async (event, context, callback) => {
  const slug = event.queryStringParameters && event.queryStringParameters.slug;
  try {
    const post = await prisma.post.findMany({
      where: { slug: { equals: slug } },
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
    if (post.lenght === 0) {
      throw new Error("No se encontro");
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(error),
    };
  }
};
