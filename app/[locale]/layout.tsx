import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import "../globals.css";

const bigShoulders = localFont({
  src: '../fonts/big-shoulders-latin.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
});

const spaceMono = localFont({
  src: [
    {
      path: '../fonts/space-mono-400-latin.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/space-mono-700-latin.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "mmt-ow",
  description: "",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' || locale === 'ckb' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${bigShoulders.variable} ${spaceMono.variable} font-[family-name:var(--font-display)]`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
