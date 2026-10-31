import { Separator } from '@karasu-lab/ui';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
}

/** Divider placed between sections as an item separator. */
export function SectionDivider({ className }: SectionDividerProps) {
  return <Separator className={cn('w-full', className)} />;
}
