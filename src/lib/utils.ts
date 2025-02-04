import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from '@/components/ui/sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: any, t: (key: string) => string) {
  toast('error', error.response?.data.message || t('something-went-wrong'));
}
