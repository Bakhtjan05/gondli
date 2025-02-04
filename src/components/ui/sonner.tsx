'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast as toastSonner } from 'sonner';

import { CheckCircle, XCircle, XMini } from '@/icons';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position='bottom-center'
      offset={40}
      className='toaster group'
      icons={{
        success: <CheckCircle />,
        error: <XCircle />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          default:
            'pl-5 pr-4 py-3 flex justify-between items-center gap-2 !text-white border-0 rounded-xl xs:fixed xs:left-1/2 xs:w-121.75 xs:-ml-121.75/50',
          title: 'pt-0.5',
          success: '!bg-surface-success',
          error: '!bg-surface-error',
          actionButton: 'pt-px',
        },
      }}
      {...props}
    />
  );
};

const toast = (type: 'success' | 'error', message: string) => {
  toastSonner[type](message, {
    action: {
      label: <XMini />,
      onClick: () => {},
    },
  });
};

export { Toaster, toast };
