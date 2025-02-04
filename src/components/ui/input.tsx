'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';

const inputVariants = cva(
  'flex h-12.25 w-full rounded-full px-7 text-sm outline-none file:border-0 file:bg-transparent file:font-medium disabled:cursor-not-allowed disabled:opacity-50 sm:h-16 sm:text-base',
  {
    variants: {
      variant: {
        default:
          'bg-input text-white backdrop-blur-2.5xl placeholder:text-white',
        solid: 'bg-input-solid text-black placeholder:text-text-secondary',
        form: 'rounded-xl px-4.5 caret-pistachio-green placeholder:text-text-secondary sm:h-12.25 sm:text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  Icon?: any;
  submitButton?: ButtonProps;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, Icon, submitButton, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [buttonWidth, setButtonWidth] = React.useState(0);

    React.useEffect(() => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    }, [submitButton]);

    return (
      <div
        className={cn(
          'relative',
          variant === 'form' &&
            'rounded-xl border border-transparent bg-surface-primary bg-clip-padding after:absolute after:-inset-px after:-z-10 after:rounded-xl after:bg-border-primary focus-within:shadow-input-form focus-within:after:bg-button-default',
        )}
      >
        {Icon && (
          <Icon className='absolute left-5 top-1/2 z-10 size-3.625 -translate-y-1/2 sm:size-6' />
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, className }),
            Icon && 'pl-12 sm:pl-14',
          )}
          style={
            submitButton
              ? {
                  paddingRight: `${buttonWidth + 18}px`,
                }
              : {}
          }
          ref={ref}
          {...props}
        />
        {submitButton && (
          <Button
            type='submit'
            ref={buttonRef}
            {...submitButton}
            className={cn(
              'absolute right-1 top-1 sm:right-1.5 sm:top-1.5',
              submitButton.className,
            )}
          />
        )}
        {(!variant || variant === 'default') && (
          <div className='glass-border before:rounded-full' />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
