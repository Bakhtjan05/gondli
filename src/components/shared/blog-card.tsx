'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export interface BlogCardProps {
  slug: string;
  thumbnail: string;
  category: string;
  title: string;
  className?: string;
}

export function BlogCard({
  slug,
  thumbnail,
  category,
  title,
  className,
}: BlogCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/blog/post/${slug}`}
      className={cn(
        'flex h-65.75 w-full flex-col overflow-hidden rounded-2xl border border-border-primary bg-white',
        className,
      )}
    >
      <Image
        src={thumbnail}
        alt='thumbnail'
        width={0}
        height={0}
        sizes='300px'
        className='h-41 w-full shrink-0 object-cover object-center'
      />
      <div className='flex h-full w-full flex-col justify-center gap-2.5 p-4'>
        <p className='text-sm text-text-secondary'>{category}</p>
        <p className='line-clamp-2 font-medium text-text-primary'>{title}</p>
      </div>
    </Link>
  );
}
