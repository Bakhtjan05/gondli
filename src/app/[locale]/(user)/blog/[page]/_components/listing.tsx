'use client';

import { useMediaQuery } from 'react-responsive';
import { useParams, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import axios from '@/lib/axios';
import { Blog } from '@/types/api';
import { BlogCard } from '@/components/shared/blog-card';
import { Pagination } from '@/components/shared/pagination';

export function BlogListing() {
  const params: any = useParams();
  const searchParams = useSearchParams();

  const isMobile = useMediaQuery({
    maxWidth: '640px',
  });

  const { data: blog } = useSWR(
    `/blog?page=${params.page}&per_page=${isMobile ? 8 : 16}&${searchParams.toString()}`,
    (url: string) => axios.get<Blog>(url).then((res) => res.data),
  );

  return (
    <div className='space-y-10 px-3.75 py-15 sm:space-y-15 sm:px-25'>
      <div className='grid w-full grid-cols-blog-listing gap-6'>
        {blog?.data.map(({ slug, thumbnail, category, title }, index) => (
          <BlogCard
            slug={slug}
            thumbnail={thumbnail}
            category={category}
            title={title}
            key={index}
          />
        ))}
      </div>
      {blog && (
        <Pagination page={+params.page} lastPage={blog.meta.last_page} />
      )}
    </div>
  );
}
