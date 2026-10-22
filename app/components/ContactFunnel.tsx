"use client";

import { useLocale, useTranslations } from "next-intl";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FaHeart } from "react-icons/fa";
import GlitchText from "./GlitchText";
import SignalBars from "./SignalBars";
import TrapezoidChains from "./TrapezoidChains";

const TRAPEZOID = "trapezoid-clip";
const MONO = "font-[family-name:var(--font-space-mono)]";

const ICONS = {
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4Zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0Zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635Z",
  tiktok:
    "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z",
} as const;

type InfoCard = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  sub?: string;
  href?: string;
};

type FeedPost = {
  key: string;
  icon: string;
  name: string;
  handle?: string;
  text: string;
  color: string;
  fg: string;
  chat: boolean;
  href?: string;
};

function BrandIcon({
  d,
  ...props
}: { d: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d={d} />
    </svg>
  );
}

export default function ContactFunnel() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const skew = locale === "ar" || locale === "ckb" ? 5 : -5;

  const cards: InfoCard[] = [
    {
      icon: EnvelopeIcon,
      label: t("info.email"),
      value: t("values.email"),
      href: `mailto:${t("values.email")}`,
    },
    {
      icon: PhoneIcon,
      label: t("info.phone"),
      value: t("values.phone"),
      href: `tel:${t("values.phone").replace(/[^+\d]/g, "")}`,
    },
  ];

  const feed: FeedPost[] = [
    {
      key: "whatsapp",
      icon: ICONS.whatsapp,
      name: "Our Whatsapp",
      text: "+9647704056209",
      color: "#25D366",
      fg: "#000",
      chat: true,
      href: "https://wa.me/9647704056209",
    },
    {
      key: "instagram",
      icon: ICONS.instagram,
      name: "madmobteam",
      text: t("social.m3"),
      color: "#E1306C",
      fg: "#fff",
      chat: true,
      href: "https://www.instagram.com/madmobteam",
    },
    {
      key: "telegram",
      icon: ICONS.telegram,
      name: "Our Telegram",
      text: t("social.m4"),
      color: "#229ED9",
      fg: "#fff",
      chat: true,
      href: "https://t.me/madmobteam",
    },
    {
      key: "tiktok",
      icon: ICONS.tiktok,
      name: "Mad Mob Team",
      text: t("social.m7"),
      color: "#25F4EE",
      fg: "#000",
      chat: true,
      href: "https://www.tiktok.com/@madmobteam?is_from_webapp=1&sender_device=pc",
    },
  ];

  const cardClass =
    "flex items-start gap-2 border-2 border-white bg-black p-2 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:animate-shock hover:border-orange-600 hover:bg-orange-600 hover:text-black hover:shadow-[6px_6px_0_0_#fff] sm:gap-2.5 sm:border sm:p-3";

  return (
    <section className="relative cursor-crosshair bg-white px-3 pt-24 pb-6 sm:px-6 sm:pt-32 sm:pb-14 md:pt-40 lg:pt-44">
      <TrapezoidChains />

      <div className="relative z-30 flow-root mx-auto max-w-4xl">
        <div className="-m-3 p-3 sm:-m-5 sm:p-5">
          <div className="relative trapezoid-shell">
            <div
              aria-hidden
              className={`absolute inset-0 translate-x-2.5 translate-y-2.5 bg-black sm:translate-x-3 sm:translate-y-3 ${TRAPEZOID}`}
            />

            <div className={`bg-orange-600 p-1.5 sm:p-2 ${TRAPEZOID}`}>
              <div
                className={`trapezoid-content bg-black text-white ${TRAPEZOID}`}
              >
                <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="flex items-end gap-2 text-xl font-black uppercase leading-[0.95] tracking-tighter sm:text-2xl lg:text-3xl">
                    <GlitchText>{t("headline")}</GlitchText>
                    <SignalBars className="pb-[0.12em]" />
                  </h2>
                  <span
                    className="inline-block self-start border-2 border-orange-600 bg-orange-600 px-2.5 py-1 text-[0.6875rem] font-black uppercase text-black sm:self-end sm:border sm:px-3 sm:py-1 sm:text-xs"
                    style={{ transform: `skewX(${skew}deg)` }}
                  >
                    <span
                      className="inline-block"
                      style={{ transform: `skewX(${-skew}deg)` }}
                    >
                      {t("chip")}
                    </span>
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-full bg-orange-600" />

                <div className="mx-1.5 mt-3 grid grid-cols-2 gap-2 sm:mx-2 sm:mt-4 sm:gap-2.5">
                  {cards.map((card, index) => {
                    const Icon = card.icon;
                    const body = (
                      <>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-orange-600 bg-orange-600 text-black transition-colors group-hover:border-white group-hover:bg-black group-hover:text-orange-600 sm:h-9 sm:w-9 sm:border">
                          <Icon
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden
                          />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block ${MONO} text-[0.625rem] font-bold uppercase tracking-widest text-orange-600 group-hover:text-black sm:text-[0.6875rem]`}
                          >
                            {"// "}
                            {card.label}
                          </span>
                          <span className="mt-1 block break-all text-[0.6875rem] font-bold group-hover:text-black sm:text-xs lg:text-sm">
                            {card.value}
                          </span>
                          {card.sub && (
                            <span
                              className={`mt-1 block break-all ${MONO} text-[0.625rem] text-neutral-400 group-hover:text-black/70 sm:text-[0.6875rem]`}
                            >
                              {card.sub}
                            </span>
                          )}
                        </span>
                      </>
                    );

                    const shared = {
                      className: `group ${cardClass}`,
                      children: body,
                    };

                    return card.href ? (
                      <a key={card.label} href={card.href} {...shared} />
                    ) : (
                      <div key={card.label} {...shared} />
                    );
                  })}
                </div>

                <div className="mx-1.5 mt-3 bg-neutral-900 p-2 sm:mx-2 sm:mt-3 sm:p-2.5 lg:p-3">
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b-2 border-orange-600 pb-2 sm:gap-3 sm:border-b">
                    <div className="min-w-0">
                      <h3 className="text-sm font-black uppercase leading-none tracking-tighter sm:text-base">
                        {t("social.title")}
                      </h3>
                    </div>
                    <span
                      className={`${MONO} shrink-0 border-2 border-orange-600 px-2 py-1 text-[0.5625rem] font-bold uppercase tracking-widest text-orange-600 sm:border sm:text-[0.625rem]`}
                    >
                      <span className="animate-blink-fast">■</span>{" "}
                      {t("social.demo")}
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4">
                    {feed.map((post) => {
                      const cardProps = {
                        className:
                          "group flex flex-col border-2 border-white bg-black p-2 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:border-orange-600 hover:shadow-[6px_6px_0_0_#fff] sm:border sm:p-2.5",
                      };

                      const content = (
                        <>
                          <header className="flex items-start gap-1.5">
                            <span
                              className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-white sm:h-8 sm:w-8 sm:border"
                              style={{ backgroundColor: post.color }}
                            >
                              <BrandIcon
                                d={post.icon}
                                className="h-3 w-3 sm:h-4 sm:w-4"
                                style={{ color: post.fg }}
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.6875rem] font-black uppercase sm:text-xs">
                                {post.name}
                              </span>
                              {post.handle && (
                                <span
                                  className={`${MONO} block truncate text-[0.5625rem] text-neutral-400 sm:text-[0.625rem]`}
                                >
                                  {post.handle}
                                </span>
                              )}
                            </span>
                          </header>

                          <p
                            className={`mt-2 line-clamp-2 text-[0.6875rem] leading-snug sm:line-clamp-none sm:text-xs ${
                              post.chat
                                ? "border-2 px-2 py-1 font-bold text-black sm:border sm:px-2 sm:py-1"
                                : "text-neutral-200"
                            }`}
                            style={
                              post.chat
                                ? {
                                    backgroundColor: post.color,
                                    borderColor: post.color,
                                  }
                                : undefined
                            }
                          >
                            {post.text}
                            {post.key === "instagram" && (
                              <FaHeart
                                className="ms-1 inline-block h-3 w-3 align-[-0.125em] text-red-600 sm:h-3.5 sm:w-3.5"
                                aria-label="heart"
                              />
                            )}
                          </p>
                        </>
                      );

                      const openLink = () => {
                        if (post.href) {
                          window.open(post.href, "_blank", "noopener,noreferrer");
                        }
                      };

                      return (
                        <article
                          key={post.key}
                          {...cardProps}
                          className={`${cardProps.className}${
                            post.href ? " cursor-pointer" : ""
                          }`}
                          {...(post.href
                            ? {
                                role: "link",
                                tabIndex: 0,
                                onClick: openLink,
                                onKeyDown: (
                                  event: React.KeyboardEvent<HTMLElement>,
                                ) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    event.preventDefault();
                                    openLink();
                                  }
                                },
                              }
                            : {})}
                        >
                          {content}
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 z-40 sm:inset-5"
      >
        <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-neutral-400/60" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-neutral-400/60" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-neutral-400/60" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-neutral-400/60" />
      </div>
    </section>
  );
}
