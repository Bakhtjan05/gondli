import { Metadata } from 'next';
import { BlogFilters } from './_components/filters';
import { BlogListing } from './_components/listing';

export const metadata: Metadata = {
  title: 'Gondli - Blog',
};

export default function Blog() {
  return (
    <main className='pt-16.75 sm:pt-18.5'>
      <BlogFilters />
      <BlogListing />
    </main>
  );
}
