import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AvatarSection } from '@/components/home/avatar-section';
import { ContentContainer } from '@/components/home/content-container';
import { HomeFooter } from '@/components/home/home-footer';
import { ProfileInfo } from '@/components/home/profile-info';
import { SectionDivider } from '@/components/home/section-divider';
import { SkillsSection, type SkillGroup } from '@/components/home/skills-section';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return { title: t('home.title') };
}

const PROFILE = {
  name: 'Hashibutogarasu',
  avatarSrc: '/icons/kara_su.png',
  githubHref: 'https://github.com/Hashibutogarasu',
  xHref: 'https://x.com/Columba_Karasu',
} as const;

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'インフラ',
    items: ['Cloudflare', 'Vercel', 'NixOS, Ubuntu', 'Raspberry Pi'],
  },
  {
    title: '開発',
    items: ['AI Driven Development', 'Minecraft modding', 'Website publishing'],
  },
  {
    title: 'プログラム言語',
    items: ['TypeScript, JavaScript', 'Java', 'Rust'],
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col px-4 py-8 sm:px-6">
        <ContentContainer>
          <AvatarSection src={PROFILE.avatarSrc} alt={PROFILE.name} />
          <ProfileInfo name={PROFILE.name} githubHref={PROFILE.githubHref} xHref={PROFILE.xHref} />
          <SectionDivider />
          <SkillsSection title="Skills" groups={SKILL_GROUPS} />
        </ContentContainer>
      </div>
      <HomeFooter brand="Karasu Lab" licenseText="Protected under the MIT License." />
    </div>
  );
}
