import {useTranslations} from 'next-intl';
import { RevealMotion, RevealUp } from './Reveal';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="border-b-4 border-black bg-neutral-100 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <h1 className="text-4xl font-black uppercase leading-none tracking-tighter sm:text-6xl lg:text-7xl">
            <span className="inline-block overflow-hidden align-bottom">
              <RevealMotion inline delay={0.15} from="90%">
                {t('weBuild')}
              </RevealMotion>
            </span>
            <br />
            <span className="inline-block overflow-hidden align-bottom px-1">
              <RevealMotion inline delay={0.32} from="110%">
                <span className="inline-block border-4 border-red-600 bg-red-600 px-3 py-1 text-white sm:px-4 sm:py-2" style={{ transform: "skewX(-4deg)" }}>
                  <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
                    {t('digital')}
                  </span>
                </span>
              </RevealMotion>
            </span>
            <br />
            <span className="inline-block overflow-hidden align-bottom">
              <RevealMotion inline delay={0.49} from="90%">
                {t('solutions')}
              </RevealMotion>
            </span>
          </h1>

          <RevealUp
            delay={0.62}
            duration={0.8}
            className="max-w-sm pt-2 font-[family-name:var(--font-space-mono)] text-base leading-relaxed text-neutral-500 sm:text-lg lg:text-end"
          >
            {t('tagline')}
          </RevealUp>
        </div>
      </div>
    </section>
  );
}