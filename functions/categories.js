const { prisma } = require("../prisma/prismageneral");

exports.handler = async (event, context, callback) => {
  try {
    const categories = await prisma.category.findMany({});
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categories),
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
