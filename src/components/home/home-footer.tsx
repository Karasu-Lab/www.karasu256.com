import { cn } from '@/lib/utils';

interface HomeFooterProps {
  /** Brand text shown at the bottom left. */
  brand: string;
  /** License statement shown at the centre, in English. */
  licenseText: string;
  /** Year shown next to the brand text. Defaults to the current year. */
  year?: number;
  /** Additional classes, e.g. to override the text size. */
  className?: string;
}

/**
 * Footer for the top page only. Placed at the very bottom of the page
 * in normal flow — it does not stick while scrolling.
 *
 * On narrow viewports the brand and the license statement stack in
 * normal flow so they can never overlap, and the text size steps down
 * instead of staying at one fixed size. From the `sm` breakpoint up,
 * the brand and the current year sit at the bottom left and the
 * license statement is centred, held in the middle column of a
 * three-column grid rather than positioned absolutely.
 */
export function HomeFooter({ brand, licenseText, year = new Date().getFullYear(), className }: HomeFooterProps) {
  return (
    <footer className={cn('grid w-full grid-cols-1 gap-1 px-4 py-4 text-xs text-muted-foreground sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-6 sm:text-sm', className)}>
      <div className="flex items-center gap-2 sm:justify-self-start">
        <span>{brand}</span>
        <span>{year}</span>
      </div>
      <p className="text-left sm:text-center">{licenseText}</p>
    </footer>
  );
}
