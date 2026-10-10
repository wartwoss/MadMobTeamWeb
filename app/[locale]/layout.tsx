import type {Metadata} from 'next';
import {Space_Mono} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import "../globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
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
      <body className={spaceMono.variable}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}