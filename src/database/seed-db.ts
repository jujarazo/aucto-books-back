import mongoose from 'mongoose';
import { AuthorSchema } from '../authors/schemas/author.schema';

const authors = [
  { name: 'J.K. Rowling' },
  { name: 'George R.R. Martin' },
  { name: 'J.R.R. Tolkien' },
];

async function seed() {
  console.log('Seeding database...');
  await mongoose.connect('mongodb://localhost:27017/booksDatabase');
  const AuthorModel = mongoose.model('Author', AuthorSchema);

  await AuthorModel.deleteMany({});
  await AuthorModel.insertMany(authors);

  console.log('Database seeded successfully');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Database seeding failed:', err);
  process.exit(1);
});
