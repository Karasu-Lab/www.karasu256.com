interface HomeFooterProps {
  /** Brand text shown at the bottom left. */
  brand: string;
  /** License statement shown at the centre, in English. */
  licenseText: string;
  /** Year shown next to the brand text. Defaults to the current year. */
  year?: number;
}

/**
 * Footer for the top page only. Placed at the very bottom of the page
 * in normal flow — it does not stick while scrolling. The brand and the
 * current year sit at the bottom left, the license statement at the
 * centre.
 */
export function HomeFooter({ brand, licenseText, year = new Date().getFullYear() }: HomeFooterProps) {
  return (
    <footer className="relative flex w-full items-center px-4 py-4 text-sm text-muted-foreground sm:px-6">
      <div className="flex items-center gap-2">
        <span>{brand}</span>
        <span>{year}</span>
      </div>
      <p className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap">{licenseText}</p>
    </footer>
  );
}
