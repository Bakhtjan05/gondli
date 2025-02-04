import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-full ring-offset-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-button-default text-white disabled:bg-button-disabled disabled:bg-none disabled:text-text-disabled',
        outline:
          'border-1.5 border-transparent bg-surface-primary bg-clip-padding after:absolute after:-inset-px.5 after:-z-10 after:rounded-full after:bg-button-default',
        pagination:
          'rounded-md border border-border-primary bg-surface-primary',
      },
      size: {
        default: 'px-3.5 py-2.5 text-sm sm:h-13 sm:px-6 sm:py-2 sm:text-base',
        lg: 'px-5 py-3.5 text-sm sm:h-13 sm:px-6 sm:py-2 sm:text-base',
        sm: 'px-5 py-3.5 text-sm sm:py-3 sm:text-base',
        xs: 'h-10 px-6 text-sm',
        icon: 'p-1.75',
        pagination: 'size-10 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant, size, loading, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'pointer-events-none',
        )}
        ref={ref}
        {...props}
      >
        <span className={cn(loading && 'opacity-0')}>{children}</span>
        {loading && (
          <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Loader className='animate-spin' />
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
