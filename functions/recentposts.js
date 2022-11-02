const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.handler = async (event, context, callback) => {
  try {
    const recent = await prisma.post.findMany({
      take: 3,
      orderBy: {
        addedAt: "asc",
      },
      include: {
        postCategory: {
          include: {
            category: true,
          },
        },
      },
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recent),
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
