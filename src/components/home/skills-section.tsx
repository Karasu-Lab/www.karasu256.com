import type { IconType } from 'react-icons';

export interface IconSkillItem {
  /** Label shown under the icon. */
  label: string;
  /** Icon representing this skill. */
  icon: IconType;
}

export type SkillGroup =
  | {
      /** Heading of one skill category. */
      title: string;
      /** Skills in this category, shown as a bulleted list. */
      variant: 'list';
      items: string[];
    }
  | {
      /** Heading of one skill category. */
      title: string;
      /** Skills in this category, shown as an icon grid. */
      variant: 'icons';
      items: IconSkillItem[];
    };

interface SkillsSectionProps {
  /** Section heading, e.g. `Skills`. */
  title: string;
  /** Skill categories assigned to this section. */
  groups: SkillGroup[];
}

/**
 * Skills section. Each assigned group is shown with its heading and
 * either a bulleted (not numbered) list or an icon grid, depending on
 * the group's variant.
 *
 * The icon grid uses an auto-fill layout, so the number of items in
 * each row changes with the available width: fewer columns on narrow
 * viewports and more columns as the window gets wider.
 */
export function SkillsSection({ title, groups }: SkillsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <h3 className="text-base font-medium">{group.title}</h3>
          {group.variant === 'icons' ? (
            <ul className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(5.5rem,1fr))]">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex flex-col items-center gap-2 rounded-lg px-2 py-3 text-center ring-1 ring-foreground/10">
                    <Icon className="size-9" aria-hidden />
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="list-disc space-y-1 pl-5">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
