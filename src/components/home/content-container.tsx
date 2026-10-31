import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container that frames the page content of the site. It scrolls
 * vertically when its content exceeds the available height, while its
 * own height adapts to the elements placed inside it.
 */
export function ContentContainer({ children, className }: ContentContainerProps) {
  return (
    <div className={cn('mx-auto flex h-auto w-full max-w-3xl flex-col gap-6 overflow-y-auto rounded-xl bg-card px-6 py-6 text-card-foreground ring-1 ring-foreground/10 sm:px-8', className)}>
      {children}
    </div>
  );
}
