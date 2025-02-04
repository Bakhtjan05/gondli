import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { cn } from '@/lib/utils';

const COLUMNS = {
  length: {
    base: 6,
    mobile: 3,
  },
  repeat: 3,
};

function Columns({
  data,
  className,
}: {
  data: string[][];
  className?: string;
}) {
  return (
    <div className={cn('flex h-full w-full justify-center gap-6', className)}>
      {data.map((paths, index) => (
        <div
          className='h-full min-w-39.25 flex-1 shrink-0 overflow-hidden sm:min-w-57.5'
          key={index}
        >
          {[...new Array(COLUMNS.repeat)].map((_, i) => (
            <div
              className={cn(
                'flex flex-col',
                index % 2 === 0
                  ? 'animate-down-mobile sm:animate-down'
                  : 'animate-up-mobile sm:animate-up',
              )}
              aria-hidden={!!i || undefined}
              key={i}
            >
              {paths.map((path) => (
                <Image
                  src={path.replace('public', '')}
                  alt='hero'
                  width={460}
                  height={660}
                  priority
                  className='h-auto w-full rounded-2xl pb-6'
                  key={path}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default async function HeroBackground() {
  const imagesPath = path.join(process.cwd(), 'public/images/hero');
  const images = await fs.readdir(imagesPath);

  const columns: string[][] = Array.from(
    { length: COLUMNS.length.base },
    () => [],
  );
  const columnsMobile: string[][] = Array.from(
    { length: COLUMNS.length.mobile },
    () => [],
  );

  images.forEach((filename, index) => {
    // Add leading slash to the image path and ensure it's using forward slashes
    const imagePath = `/images/hero/${filename.replace(/\\/g, '/')}`;
    columns[index % COLUMNS.length.base].push(imagePath);
    columnsMobile[index % COLUMNS.length.mobile].push(imagePath);
  });

  return (
    <div className='absolute left-0 top-0 -z-10 h-screen w-full overflow-hidden bg-surface-brand p-inherit'>
      <Columns data={columns} className='hidden sm:flex' />
      <Columns data={columnsMobile} className='sm:hidden' />
      <div className='absolute left-0 top-0 z-10 h-full w-full space-y-6 bg-hero-gradient' />
    </div>
  );
}
