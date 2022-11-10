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
          "Muchas veces nos preguntamos si podemos enseñar a nuestra adorada mascota a hacer sus necesidades como un gato, y la respuesta es: SI se puede.",
        content:
          "Cuando se trata del entrenamiento de una mascota es importante realizarlo con responsabilidad para  evitar incidentes indeseables. Afortunadamente su mascota pueda hacer sus necesidades en casa y aprender es facilisimo",
        content2: "Hay 6 tipos de baños para perros en casa:",
        lista: [
          "Toallas húmedas",
          "Pasto de baño para perro",
          "Estaciones auto Limpiables",
          "Caja de Baño para Perro",
          "Baño para perro con Rejillas",
        ],
        content3:
          "Utiliza las toallas húmedas como entrenamiento, estos desechables son perfectos para enseñarles, colocala cerca a una puerta en el piso. Y fomenta que tu perro vaya a dicho lugar cada que necesite ir al baño. Muchas veces necesitaras de higienizar el lugar donde tu perro ya que puede salirse de la toalla. Por ello es que luego de iniciar este entrenamiento es recomendable luego comprar alguna opción más cómoda para tu mascota: Ya sea el Pasto de baño para perro, Estaciones auto limpiables, caja de baño para perro o baño para perro con rejillas.",
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

    const postTwo = await prisma.post.create({
      data: {
        title: "¿Comó evitar un Juan Fernando Barona?",
        newsLink: [
          `<blockquote class="twitter-tweet"><p lang="es" dir="ltr">Este es Juan Fernando Barona agrediendo a su pareja, actualmente es periodista y cubre política, está en Egipto… Trabaja en Noticias Uno<br> <br>Ojalá este sujeto y su cómplice sean capturados y judicialízalos. No puede seguir impune.<a href="https://twitter.com/hashtag/Compartir?src=hash&amp;ref_src=twsrc%5Etfw">#Compartir</a> <a href="https://t.co/1doaEgLSoq">pic.twitter.com/1doaEgLSoq</a></p>&mdash; MCN (@mcn24H) <a href="https://twitter.com/mcn24H/status/1590296715046711296?ref_src=twsrc%5Etfw">November 9, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
        ],
        slug: "Como-evitar-un-Juan-Fernando-Barona",
        excerpt:
          "Saber como colocar estas señales sin que el otro se de cuenta para detectar este comportamiento sería ideal para evitar en un futuro con hijos e hijas poder remediar dichos malos comportamientos.",
        content:
          "La relación es un ambiente para compartir y no es lo único que debe existir. Saber distribuir nuestro tiempo y saber que podemos ser libres y esa persona cuenta con nosotros sin necesidad de sentir una atadura hará inclusive amar más a nuestra pareja.",
        featureImage:
          "https://res.cloudinary.com/davigetz/image/upload/v1668034491/sydney-sims-fZ2hMpHIrbI-unsplash_brzbs2.jpg",
        priority: 0.7,
        content2: "Como detectarlos:",
        content3:
          "Saber como colocar estas señales sin que el otro se de cuenta para detectar este comportamiento sería ideal para evitar en un futuro con hijos e hijas poder remediar dichos malos comportamientos.",
        lista: [
          "Si por ejemplo voy a reunirme con amigos o amigas y siempre la persona con la que estoy cuestiona porque estoy con esas personas hay una alarma grande que prender.",
          "Si cada vez mi pareja hace amenazas como porque tienes que ir a ese evento social,siempre con esos amigos si estas mejor conmigo es otra alarma grande.",
          "Si hay una amenaza constante de terminar la relación si no cumplo el designo de estar con esa persona es otra alarma grande.",
          "Si hay expresiones posesivas como ¨Me perteneces¨  es otra alarma grande.",
          "Si hay constantemente comparaciones con otras personas- ¿Si ves como tu mejor amigo si se viste viste bien y tu siempre estas igual?- es otra alarma grande.",
          "Control de llamadas. Mensajes,redes sociales,claves.",
          "Control de la ropa que usa o tiene que lucir la otra persona.",
          "Abuso sexual,Agresividad verbal,humillación,Agresiones físicas.",
        ],
      },
    });

    const categoryTwo = await prisma.category.create({
      data: {
        name: "Salud",
        slug: "Como-evitar-un-Juan-Fernando-Barona",
      },
    });

    await prisma.postauthor.create({
      data: {
        postId: postTwo.id,
        authorId: author.id,
      },
    });

    await prisma.postCategory.create({
      data: {
        postId: postTwo.id,
        cateogryId: categoryTwo.id,
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
