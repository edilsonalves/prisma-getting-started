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

  const posts = await prisma.post.findMany();
  console.log(posts);

  const firstUserPosts = await prisma.post.findMany({
    where: {
      author: {
        name: 'First User',
      },
    },
  });
  console.log(firstUserPosts);

  const secondUserPosts = await prisma.post.findMany({
    where: {
      author: {
        name: 'Second User',
      },
    },
  });
  console.log(secondUserPosts);

  const firstUpdatedUser = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      name: 'First Updated User',
    },
  });
  console.log(firstUpdatedUser);

  const secondUpdatedUser = await prisma.user.update({
    where: {
      id: 2,
    },
    data: {
      name: 'Second Updated User',
    },
  });
  console.log(secondUpdatedUser);

  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const usersAfterDeletion = await prisma.user.findMany();
  console.log(usersAfterDeletion);

  const postsAfterDeletion = await prisma.post.findMany();
  console.log(postsAfterDeletion);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => await prisma.disconnect());
