import type {InputHTMLAttributes, TextareaHTMLAttributes} from 'react';
import {cn} from '@/lib/utils';

const base =
  'w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60';

export function Input({className, ...props}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, className)} {...props} />;
}

export function Textarea({className, ...props}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, 'resize-y py-3', className)} {...props} />;
}