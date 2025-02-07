import { ReactNode, HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface SectionProps<T> extends HTMLAttributes<T> {
  children?: ReactNode;
  displayMountains?: boolean;
}

function SectionMountains({
  show,
  className,
}: {
  show?: boolean;
  className?: string;
}) {
  if (!show) return;

  return (
    <Image
      src='/images/shapes/mountains.png'
      alt='mountains'
      width={647}
      height={256}
      quality={100}
      className={cn('absolute max-w-56 sm:max-w-none', className)}
    />
  );
}

export function SectionWrapper({
  children,
  displayMountains,
  ...props
}: SectionProps<HTMLDivElement>) {
  const [bgClasses, className] = (props.className || '')
    .split(' ')
    .reduce<[string[], string[]]>(
      (acc, cls) => {
        cls.startsWith('bg-') ? acc[0].push(cls) : acc[1].push(cls);
        return acc;
      },
      [[], []],
    );

  return (
    <div
      {...props}
      className={cn('relative  w-full ', bgClasses)}
    >
      <SectionMountains
        show={displayMountains}
        className='left-0 top-0 rotate-180 sm:-top-12'
      />
      <div
        className={cn(
          'relative px-3.5 pb-15 pt-30 sm:pb-20 sm:pt-30 lg:px-25',
          className,
        )}
      >
        {children}
      </div>
      <SectionMountains
        show={displayMountains}
        className='bottom-0 right-0 sm:-bottom-12'
      />
    </div>
  );
}

export function SectionTitle({
  children,
  ...props
}: SectionProps<HTMLHeadElement>) {
  return (
    <h2
      {...props}
      className={cn('text-2.25xl font-medium sm:text-4.25xl', props?.className)}
    >
      {children}
    </h2>
  );
}

export function SectionDescription({
  children,
  ...props
}: SectionProps<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn('sm:text-xl', props?.className)}>
      {children}
    </p>
  );
}
