import { PrismaClient } from '@prisma/client';
import movies from '../movies.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Delete existing movies
  await prisma.movie.deleteMany({});
  console.log('Deleted existing movies');

  // Insert movies from JSON
  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        title: movie.title,
        description: movie.description,
        videoUrl: movie.videoUrl,
        thumbnailUrl: movie.thumbnailUrl,
        genre: movie.genre,
        duration: movie.duration,
      },
    });
    console.log(`Created movie: ${movie.title}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
