import { Button } from '@karasu-lab/ui';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

interface ProfileInfoProps {
  /** Display name shown on the first line, left-aligned. */
  name: string;
  /** Link target of the GitHub icon button. */
  githubHref: string;
  /** Link target of the X icon button. */
  xHref: string;
}

/**
 * Profile information row: the name on the first line, and GitHub and X
 * icon buttons linking to the given URLs on the next line.
 */
export function ProfileInfo({ name, githubHref, xHref }: ProfileInfoProps) {
  return (
    <section className="flex flex-col items-start gap-3 text-left">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" nativeButton={false} render={<a href={githubHref} target="_blank" rel="noreferrer" aria-label="GitHub" />}>
          <FaGithub className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" nativeButton={false} render={<a href={xHref} target="_blank" rel="noreferrer" aria-label="X" />}>
          <FaXTwitter className="size-5" />
        </Button>
      </div>
    </section>
  );
}
