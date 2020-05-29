const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'first.user@prisma.io',
      name: 'First User',
      posts: {
        create: {
          title: 'Duis tristique',
          text: 'Duis tristique placerat erat, vel semper nibh vestibulum.',
        },
      },
    },
    include: {
      posts: true,
    },
  });

  await prisma.user.create({
    data: {
      email: 'second.user@prisma.io',
      name: 'Second User',
      posts: {
        create: {
          title: 'Morbi eget',
          text: 'Morbi eget lacus vel nisl finibus euismod. Aenean.',
        },
      },
    },
    include: {
      posts: true,
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);
  // [
  //   { id: 1,
  //     email: 'first.user@prisma.io',
  //     name: 'First User'
  //   },
  //   { id: 2,
  //     email: 'second.user@prisma.io',
  //     name: 'Second User'
  //   }
  // ]

  const posts = await prisma.post.findMany();
  console.log(posts);
  // [
  //   {
  //     id: 1,
  //     title: 'Duis tristique',
  //     text: 'Duis tristique placerat erat, vel semper nibh vestibulum.',
  //     authorId: 1
  //   },
  //   {
  //     id: 2,
  //     title: 'Morbi eget',
  //     text: 'Morbi eget lacus vel nisl finibus euismod. Aenean.',
  //     authorId: 2
  //   }
  // ]

  const firstUserPosts = await prisma.post.findMany({
    where: {
      author: {
        name: 'First User',
      },
    },
  });
  console.log(firstUserPosts);
  // [
  //   {
  //     id: 1,
  //     title: 'Duis tristique',
  //     text: 'Duis tristique placerat erat, vel semper nibh vestibulum.',
  //     authorId: 1
  //   }
  // ]

  const secondUserPosts = await prisma.post.findMany({
    where: {
      author: {
        name: 'Second User',
      },
    },
  });
  console.log(secondUserPosts);
  // [
  //   {
  //     id: 2,
  //     title: 'Morbi eget',
  //     text: 'Morbi eget lacus vel nisl finibus euismod. Aenean.',
  //     authorId: 2
  //   }
  // ]

  const firstUpdatedUser = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      name: 'First Updated User',
    },
  });
  console.log(firstUpdatedUser);
  // {
  //   id: 1,
  //   email: 'first.user@prisma.io',
  //   name: 'First Updated User'
  // }

  const secondUpdatedUser = await prisma.user.update({
    where: {
      id: 2,
    },
    data: {
      name: 'Second Updated User',
    },
  });
  console.log(secondUpdatedUser);
  // {
  //   id: 2,
  //   email: 'second.user@prisma.io',
  //   name: 'Second Updated User'
  // }

  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const usersAfterDeletion = await prisma.user.findMany();
  console.log(usersAfterDeletion);
  // []

  const postsAfterDeletion = await prisma.post.findMany();
  console.log(postsAfterDeletion);
  // []
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => await prisma.disconnect());
