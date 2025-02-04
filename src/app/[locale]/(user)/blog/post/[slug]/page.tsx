'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { Blog } from '@/types/api';
import { MountainsShape } from '@/shapes';
import { BlogCard } from '@/components/shared/blog-card';

export default function BlogPost({
  params,
}: {
  params: { slug: string } | any;
}) {
  const t = useTranslations();

  const { data } = useSWR(`/blog/${params.slug}`, (url: string) =>
    axios.get<{ data: Blog['data'][0] }>(url).then((res) => res.data.data),
  );

  const { data: recommended } = useSWR(['/blog', 'recommended'], ([url]) =>
    axios
      .get<Blog>(url)
      .then((res) =>
        res.data.data.filter(({ slug }) => slug !== params.slug).slice(0, 3),
      ),
  );

  if (!data) return;

  return (
    <main className='pt-16.75 sm:pt-18.5'>
      <title>{`Gondli - ${data.title}`}</title>
      <div className='mx-auto w-full max-w-200 space-y-10 px-3.75 py-15 pt-10 sm:pt-15'>
        <div className='space-y-1.5'>
          <h1 className='text-2.5xl font-medium text-text-primary'>
            {data.title}
          </h1>
          <p className='text-text-secondary'>{data.category}</p>
        </div>
        <Image
          src={data.thumbnail}
          alt='thumbnail'
          width={0}
          height={0}
          sizes='800px'
          className='h-auto w-full rounded-2xl'
        />
        <div
          className='prose'
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
        <div className='flex w-full flex-col-reverse justify-between gap-5 rounded-2xl bg-surface-brand p-6 sm:flex-row sm:gap-6'>
          <div className='space-y-8'>
            <div className='space-y-2 text-white sm:space-y-3'>
              <p className='text-lg font-medium'>{t('join-gondli-title')}</p>
              <p>{t('join-gondli-description')}</p>
            </div>
            <Button size={'sm'}>{t('join-gondli')}</Button>
          </div>
          <MountainsShape className='size-15 sm:size-36.25' />
        </div>
        <div className='h-px w-full bg-border-primary' />
        <div className='space-y-6'>
          <p className='font-medium text-text-primary'>
            {t('might-interest-you')}
          </p>
          <div className='grid w-full grid-cols-recommended-posts gap-6'>
            {recommended?.map(({ slug, thumbnail, category, title }, index) => (
              <BlogCard
                slug={slug}
                thumbnail={thumbnail}
                category={category}
                title={title}
                className='h-73.25 sm:h-60'
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
