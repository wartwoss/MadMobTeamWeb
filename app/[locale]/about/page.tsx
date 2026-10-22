"use client";

import { useTranslations } from "next-intl";
import PageFrame from "../../components/PageFrame";
import { RevealUp } from "../../components/Reveal";

const MONO = "font-[family-name:var(--font-space-mono)]";
const BODY = `${MONO} text-sm leading-relaxed text-neutral-600 sm:text-base`;

type Service = {
  title: string;
  body: string;
};

const services: Service[] = [
  {
    title: "IT Solutions & Software Development",
    body: "We design and develop custom software systems that solve real-world problems, improve workflows, and help businesses operate more efficiently.",
  },
  {
    title: "Websites & Web Applications",
    body: "From professional business websites to interactive web applications, we create modern, responsive digital experiences.",
  },
  {
    title: "Community Services",
    body: "At MadMobTeam, we believe technology is more than just software, it's a way to bring people together. Through fun, interactive digital experiences, mini-games, and creative projects inspired by Kurdish culture and local events, we aim to create opportunities for our community to connect, socialize, and share memorable experiences.",
  },
];

const approach = [
  "Our first step is to make a solid understanding of the software architecture of the specified problem we are trying to solve.",
  "We use RESTful APIs architecture.",
  "We also use tools such as React/React Native, Laravel, NestJS, Flutter, and many more.",
];

const vision = [
  "We aim to make powerful technology more accessible to businesses and individuals by creating solutions that are useful, thoughtfully designed, and built for long-term growth.",
  "Whether it's a system that improves business operations, a website that introduces a brand to the world, or an application that transforms an idea into a service, we're here to make it happen.",
];

const introBody =
  "We bring together software development, specialized design, and digital presence to create solutions that are practical, reliable, and built around each client's needs. From custom systems that simplify everyday operations to websites and applications that bring ideas to life, we combine technical expertise with thoughtful design to deliver meaningful results.";

const statement =
  "We don't just build products. We build tools, experiences, and digital identities that help businesses move forward.";

const ctaBody =
  "Have an idea, a business challenge, or a project in mind? We'd love to hear about it.";

const ctaClosing = "Let's create something that makes a difference.";

function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="border-b-2 border-neutral-300 pb-3">
      <span
        className={`${MONO} block text-[0.625rem] font-bold uppercase tracking-[0.3em] text-neutral-500`}
      >
        {index} / {label}
      </span>
      <h2 className="mt-2 text-2xl font-black uppercase leading-none tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function About() {
  const t = useTranslations("About");
  const tNav = useTranslations("Nav");

  return (
    <PageFrame title={t("title")} loaderTitle={tNav("about")}>
      <article className="bg-neutral-100 text-neutral-900">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 text-left sm:px-8 sm:py-28">
          {/* Title */}
          <header>
            <RevealUp
              delay={0.05}
              className={`${MONO} text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-neutral-500`}
            >
              {"// studio profile"}
            </RevealUp>

            <RevealUp delay={0.15}>
              <h1 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-tighter text-neutral-900 sm:text-6xl lg:text-7xl">
                {t("title")}{" "}
                <span className="inline-block -skew-x-6 bg-red-600 px-2 text-neutral-50 sm:px-3">
                  <span className="inline-block skew-x-6">Mad Mob Team</span>
                </span>
              </h1>
            </RevealUp>

            <RevealUp delay={0.3}>
              <p className="mt-8 max-w-2xl border-l-4 border-red-600 pl-5 text-2xl font-black uppercase leading-[1.02] tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                We turn ideas into digital solutions.
              </p>
            </RevealUp>
          </header>

          {/* Intro */}
          <div className="mt-12 max-w-2xl space-y-5 sm:mt-14">
            <p className={BODY}>
              We are{" "}
              <span className="font-bold text-neutral-900">MadMobTeam</span>, a
              technology and creative studio dedicated to helping businesses,
              brands, and entrepreneurs grow in the digital world.
            </p>
            <p className={BODY}>{introBody}</p>
          </div>

          {/* Statement */}
          <p className="mt-10 max-w-3xl bg-neutral-200/70 p-5 text-lg font-black uppercase leading-tight tracking-tight text-neutral-900 sm:p-6 sm:text-xl">
            {statement}
          </p>

          {/* What We Do */}
          <section className="mt-16 sm:mt-20">
            <SectionHeading index="01" label="services" title="What We Do" />

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="border-t-2 border-neutral-900 pt-4"
                >
                  <h3 className="text-lg font-black uppercase leading-tight tracking-tight text-neutral-900 lg:text-xl">
                    {service.title}
                  </h3>
                  <p className={`mt-3 ${BODY}`}>{service.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-l-4 border-neutral-900 bg-neutral-200/60 px-5 py-4 sm:px-6 sm:py-5">
              {approach.map((line, index) => (
                <p
                  key={line}
                  className={`${index > 0 ? "mt-3" : ""} ${BODY}`}
                >
                  {line}
                </p>
              ))}
            </div>
          </section>

          {/* Our Vision */}
          <section className="mt-16 sm:mt-20">
            <SectionHeading index="02" label="vision" title="Our Vision" />

            <div className="mt-8 max-w-2xl space-y-5">
              {vision.map((paragraph) => (
                <p key={paragraph} className={BODY}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 bg-neutral-900 p-6 text-neutral-100 sm:mt-20 sm:p-10">
            <span
              className={`${MONO} text-[0.625rem] font-bold uppercase tracking-[0.3em] text-red-500`}
            >
              {"// let's collaborate"}
            </span>
            <h2 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-neutral-50 sm:text-4xl lg:text-5xl">
              Let&apos;s Build Something Together.
            </h2>
            <p
              className={`mt-5 max-w-xl ${MONO} text-sm leading-relaxed text-neutral-300 sm:text-base`}
            >
              {ctaBody}
            </p>
            <p className="mt-8 text-xl font-black uppercase leading-tight tracking-tight text-neutral-100 sm:text-2xl">
              Your idea. Our expertise.{" "}
              <span className="bg-red-600 px-1 text-neutral-50">
                One shared vision.
              </span>
            </p>
            <p
              className={`mt-4 ${MONO} text-sm leading-relaxed text-neutral-400 sm:text-base`}
            >
              {ctaClosing}
            </p>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
