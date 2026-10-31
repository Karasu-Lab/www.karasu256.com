export interface SkillGroup {
  /** Heading of one skill category. */
  title: string;
  /** Skills in this category, shown as a bulleted list. */
  items: string[];
}

interface SkillsSectionProps {
  /** Section heading, e.g. `Skills`. */
  title: string;
  /** Skill categories assigned to this section. */
  groups: SkillGroup[];
}

/**
 * Skills section. Each assigned group is shown with its heading and a
 * bulleted (not numbered) list of its items.
 */
export function SkillsSection({ title, groups }: SkillsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <h3 className="text-base font-medium">{group.title}</h3>
          <ul className="list-disc space-y-1 pl-5">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
