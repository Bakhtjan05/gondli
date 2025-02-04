import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export interface CategoryProps extends PropsWithChildren {
  isActive?: boolean;
  onClick?: () => void;
}

export function Category({ isActive, onClick, children }: CategoryProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex h-10 shrink-0 items-center justify-center rounded-full bg-input px-6',
        isActive && 'bg-button-default',
      )}
    >
      <p className='text-sm'>{children}</p>
      <div className='glass-border before:rounded-full' />
    </button>
  );
}
