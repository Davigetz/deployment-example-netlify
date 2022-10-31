const { prisma } = require("../prisma/prismagnral");

exports.handler = async (event, context, callback) => {
  try {
    const { name, email, comment, slug } = JSON.parse(event.body);
    const commentario = prisma.comment.create({
      data: {
        name,
        comment,
      },
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentario),
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
