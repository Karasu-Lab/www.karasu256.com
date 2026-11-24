import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { locales, defaultLocale, type Locale } from '@/i18n/locales';
import { termsMdxComponents } from '@/components/mdx/mdx-components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return { title: t('privacy.title') };
}

function resolveLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale;
}

async function readPrivacyMarkdown(locale: Locale): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'documents', 'privacy', locale, 'PRIVACY-POLICY.md');
  return readFile(filePath, 'utf8');
}

/** Privacy policy page — renders the locale-specific Markdown document via MDX. */
export default async function PrivacyPage() {
  const locale = resolveLocale(await getLocale());
  const source = await readPrivacyMarkdown(locale);

  const { default: Content } = await evaluate(source, {
    ...runtime,
    format: 'md',
  });

  return (
    <div className="max-w-3xl w-full mx-auto px-6 py-12">
      <Content components={termsMdxComponents} />
    </div>
  );
}
