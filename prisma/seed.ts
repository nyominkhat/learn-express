import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

function getAuthors(): Array<Author> {
  return [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Willeam", lastName: "Shakespeare" },
    { firstName: "Yuval Noah", lastName: "Harari" },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Sapiens",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Home Alone",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "The Ugly Duck",
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );

  const author: any = await db.author.findFirst({
    where: {
      firstName: "Yuval Noah",
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;

      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id,
        },
      });
    })
  );
}

seed();
