import {useLocale, useTranslations} from 'next-intl';
import { RevealMotion, RevealUp } from './Reveal';

function PlainLine({text, delay}: {text: string; delay: number}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <RevealMotion inline delay={delay} from="90%">
        {text}
      </RevealMotion>
    </span>
  );
}

function HighlightedLine({
  text,
  delay,
  period = false,
}: {
  text: string;
  delay: number;
  period?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom px-1">
      <RevealMotion inline delay={delay} from="110%">
        <span className="inline-block">
          <span
            className="inline-block border-4 border-red-600 bg-red-600 px-3 py-1 text-white sm:px-4 sm:py-2"
            style={{ transform: "skewX(-4deg)" }}
          >
            <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
              {text}
            </span>
          </span>
          {period ? "." : null}
        </span>
      </RevealMotion>
    </span>
  );
}

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  /* Arabic reads "we build -> solutions -> digital", so the highlighted word
     lands on the last line instead of the middle one. Every other locale
     keeps the original order. */
  const highlightLast = locale === 'ar';
  const isArabicScript = locale === 'ar' || locale === 'ckb';

  /* Arabic-script titles get an extra size step to stay visually on par with
     the Latin display face. */
  const titleSize = isArabicScript
    ? "text-6xl sm:text-8xl lg:text-9xl"
    : "text-5xl sm:text-7xl lg:text-8xl";

  return (
    <section className="border-b-4 border-black bg-neutral-100 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <h1
            className={`${titleSize} font-black uppercase leading-none tracking-tighter`}
          >
            <PlainLine text={t('weBuild')} delay={0.15} />
            <br />
            {highlightLast ? (
              <PlainLine text={t('solutions')} delay={0.32} />
            ) : (
              <HighlightedLine text={t('digital')} delay={0.32} />
            )}
            <br />
            {highlightLast ? (
              <HighlightedLine text={t('digital')} delay={0.49} period />
            ) : (
              <PlainLine text={t('solutions')} delay={0.49} />
            )}
          </h1>

          <RevealUp
            delay={0.62}
            duration={0.8}
            className="max-w-sm pt-2 text-left text-pretty font-[family-name:var(--font-space-mono)] text-base leading-relaxed text-neutral-500 sm:text-lg"
          >
            {t('tagline')}
          </RevealUp>
        </div>
      </div>
    </section>
  );
}
