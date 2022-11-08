const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.handler = async (event, context, callback) => {
  try {
    await Promise.all([
      prisma.category.deleteMany(),
      prisma.post.deleteMany(),
      prisma.comment.deleteMany(),
    ]);
    await prisma.author.deleteMany();

    const post = await prisma.post.create({
      data: {
        title: "¿Puede mi Perro Aprender a Usar la Caja de Arena para Gatos?",
        slug: "Puede-mi-perro-aprender-a-usar-la-caja-de-arena-para-gatos",
        excerpt:
          "Muchas veces nos preguntamos si podemos enseñar a nuestra adorada mascota a hacer sus necesidads como un gato, SI se puede",
        content:
          "Cuando se trata del entrenamiento de una mascota es importante realizarlo con responsabilidad, ya sea que queremos evitar incidentes que pueden ser dificiles. Afortunamente aca le mostramos un plan de entrenamiento para que su mascota pueda hacer sus necesidades en casa.",
        content2: "Hay 6 tipos de baños para perros en casa:",
        lista: [
          "Toallas higienicas",
          "Pasto de baño para perro",
          "Estaciones auto Limpiables",
          "Caja de Baño para Perro",
          "Baño para perro con Rejillas",
        ],
        content3:
          "Si te interesa como realizar este entrenamiento hazmelo saber en los comentarios y con ello dare información mas detallada de como llevar el entrenamiento acabo",
        featureImage:
          "https://res.cloudinary.com/davigetz/image/upload/v1667437419/IMG_20221012_151644_ycuat4.jpg",
        featurePot: true,
        priority: 0.7,
      },
    });
    const category = await prisma.category.create({
      data: {
        name: "Perros",
        slug: "Puede-mi-perro-aprender-a-usar-la-caja-de-arena-para-gatos",
      },
    });
    const author = await prisma.author.create({
      data: {
        name: "David",
        bio: "I am a person with many desires and few time",
        photo:
          "https://res.cloudinary.com/davigetz/image/upload/v1664422240/ul4xxlmrshjes4pz0zdt.jpg",
      },
    });
    await prisma.postauthor.create({
      data: {
        postId: post.id,
        authorId: author.id,
      },
    });
    await prisma.postCategory.create({
      data: {
        postId: post.id,
        cateogryId: category.id,
      },
    });

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([author, post]),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
};
