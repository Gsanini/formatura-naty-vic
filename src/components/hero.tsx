import { useEffect, useRef, type SVGProps } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GRADUATION_DATE_PARTS, GRADUATION_MEETING } from "../data";
import nataliaPhoto from "../assets/natalia.jpeg";
import nataliaPhoto1200 from "../assets/natalia-1200.jpeg";
import nataliaPhoto1800 from "../assets/natalia-1800.jpeg";
import victoriaPhoto from "../assets/victoria.JPEG?url";
import CountdownSection from "./countdown-section";
import ScheduleSection from "./schedule-section";
import ListaPresentes from "./listaPresentes";

gsap.registerPlugin(ScrollTrigger);

const heroInnerClassName =
  "mx-auto w-[min(84vw,1480px)] max-xl:w-[min(88vw,1160px)] max-[900px]:w-[min(calc(100%_-_48px),720px)] max-[640px]:w-[min(calc(100%_-_32px),520px)]";

const eyebrowClassName =
  "font-body text-[0.68rem] font-medium uppercase leading-none tracking-[0.46em] text-foreground/55";

function BotanicalOrnament({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden='true'
      className={className}
      fill='none'
      viewBox='0 0 460 460'
      {...props}
    >
      <path
        d='M230 418C227 344 229 280 243 213C256 149 286 93 337 50'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.2'
      />
      <path
        d='M245 212C203 163 166 132 116 116C151 170 184 197 245 212Z'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='1.2'
      />
      <path
        d='M263 151C232 100 205 70 162 48C181 103 211 136 263 151Z'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='1.2'
      />
      <path
        d='M258 254C309 218 351 202 410 204C368 250 323 266 258 254Z'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='1.2'
      />
      <path
        d='M239 315C195 284 154 270 98 274C135 315 178 329 239 315Z'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='1.2'
      />
      <path
        d='M319 62C310 39 321 18 343 13C365 8 386 23 389 46C394 78 364 102 335 91C308 82 300 54 319 34'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.2'
      />
    </svg>
  );
}

function HeroIntro() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
      });

      intro
        .from("[data-hero-eyebrow]", { opacity: 0, y: 18 })
        .from(
          "[data-hero-title] span",
          { opacity: 0, yPercent: 85, stagger: 0.08, duration: 1.05 },
          "-=0.45",
        )
        .from("[data-hero-copy]", { opacity: 0, y: 24 }, "-=0.58")
        .from(
          "[data-hero-photo]",
          { opacity: 0, y: 46, scale: 0.97, stagger: 0.12, duration: 1 },
          "-=0.64",
        )
        .from(
          "[data-hero-meta]",
          { opacity: 0, y: 22, stagger: 0.1, duration: 0.78 },
          "-=0.48",
        );

      gsap.to("[data-hero-photo='natalia']", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-photo='victoria']", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-ornament]", {
        yPercent: -9,
        rotate: 3,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className='relative isolate overflow-hidden bg-background pt-15 pb-8 text-foreground sm:py-10 lg:min-h-svh lg:py-12'
      aria-labelledby='hero-title'
    >
      <BotanicalOrnament
        className='pointer-events-none absolute -left-28 top-14 -z-10 w-[420px] text-primary/20 max-[900px]:-left-44 max-[900px]:top-24 max-[900px]:w-[360px] max-[640px]:!left-auto max-[640px]:!right-[-6rem] max-[640px]:!top-0 max-[640px]:!w-[300px] max-[640px]:-scale-x-100'
        data-hero-ornament
      />
      <BotanicalOrnament
        className='pointer-events-none absolute -right-24 bottom-2 -z-10 w-[360px] -scale-x-100 rotate-12 text-accent/16 max-[900px]:-right-48 max-[900px]:bottom-40'
        data-hero-ornament
      />

      <div className={heroInnerClassName}>
        <div className='grid min-h-[calc(100svh-96px)] items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-14 max-[900px]:min-h-0'>
          <div className='relative z-10 pt-2 max-[900px]:pt-0'>
            <p data-hero-eyebrow className={eyebrowClassName}>
              Formatura 2026
            </p>

            <h1
              id='hero-title'
              data-hero-title
              className="mt-7 overflow-hidden font-display text-[clamp(4.3rem,10vw,10.8rem)] font-semibold leading-[0.78] tracking-normal text-primary [font-variation-settings:'SOFT'_0,'WONK'_1] max-[640px]:mt-5 max-[640px]:text-[clamp(3.7rem,22vw,7rem)]"
            >
              <span className='block'>Naty</span>
              <span className='block pl-[0.22em] font-light italic text-accent max-[640px]:pl-[0.12em]'>
                & Vic
              </span>
            </h1>

            <p
              data-hero-copy
              className="mt-8 max-w-[34rem] font-display text-[clamp(1.1rem,0.9vw,2.2rem)] font-light leading-[1.08] tracking-normal text-foreground/55 [font-variation-settings:'SOFT'_18,'WONK'_1] max-[640px]:mt-6"
            >
              Duas irmãs, duas conquistas e uma noite inteira para celebrar o
              fim de um ciclo.
            </p>

            <div className='mt-12 flex max-w-[720px] flex-col gap-8 md:flex-row md:items-start md:justify-between lg:mt-16'>
              <div>
                <p
                  data-hero-meta
                  className='text-[10px] uppercase tracking-[0.4em] text-foreground/55'
                >
                  Data
                </p>
                <p
                  data-hero-meta
                  className='mt-3 font-display text-2xl text-primary'
                >
                  {GRADUATION_DATE_PARTS.day} ·{" "}
                  {GRADUATION_DATE_PARTS.month.slice(0, 3)} ·{" "}
                  {GRADUATION_DATE_PARTS.year}
                </p>
              </div>

              <div className='text-left md:text-right'>
                <p
                  data-hero-meta
                  className='text-[10px] uppercase tracking-[0.4em] text-foreground/55'
                >
                  Onde
                </p>
                <p
                  data-hero-meta
                  className='mt-3 font-display text-2xl text-primary'
                >
                  {GRADUATION_MEETING.venue}
                </p>
                <p
                  data-hero-meta
                  className='mt-1 text-xs tracking-wide text-foreground/55'
                >
                  {GRADUATION_MEETING.city} — 19h30
                </p>
              </div>
            </div>
          </div>

          <div className='relative mx-auto h-[clamp(440px,62vw,760px)] w-full max-w-[760px] lg:mx-0 lg:max-w-none max-[640px]:h-[clamp(390px,116vw,540px)]'>
            <BotanicalOrnament
              className='pointer-events-none absolute hidden text-primary/16 max-[640px]:bottom-[-12%] max-[640px]:left-[-5.5rem] max-[640px]:block max-[640px]:w-[250px] max-[640px]:-rotate-12'
            />

            <div
              className='absolute -left-10 top-[8%] h-[54%] w-[78%] overflow-hidden rounded-[6px] border border-white/60 bg-white/25 shadow-[0_24px_80px_rgba(33,25,26,0.14)] max-[640px]:left-0 max-[640px]:top-[5%] max-[640px]:h-[51%] max-[640px]:w-[88%]'
              data-hero-photo='natalia'
            >
              <img
                src={nataliaPhoto1200}
                srcSet={`${nataliaPhoto1200} 1200w, ${nataliaPhoto1800} 1800w, ${nataliaPhoto} 4160w`}
                sizes='(max-width: 640px) 88vw, (max-width: 900px) 78vw, 35vw'
                alt='Natália vestida de toga, sorrindo com o canudo em mãos'
                className='h-full w-full object-cover object-[54%_46%]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent' />
            </div>

            <div
              className='absolute right-[-2%] bottom-[3%] h-[66%] w-[56%] overflow-hidden rounded-[6px] border border-white/70 bg-white/25  max-[640px]:right-0 max-[640px]:bottom-0 max-[640px]:h-[61%] max-[640px]:w-[64%]'
              data-hero-photo='victoria'
            >
              <img
                src={victoriaPhoto}
                alt='Victória vestida de toga, sentada em uma poltrona segurando o canudo'
                className='h-full w-full object-cover object-[48%_42%]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent' />
            </div>

            <div
              className='absolute right-[9%] top-[3%] h-[20%] w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent max-[640px]:right-[4%]'
              aria-hidden='true'
            />
            <div
              className='absolute bottom-[18%] left-[9%] h-px w-[34%] bg-gradient-to-r from-transparent via-primary/30 to-transparent max-[640px]:bottom-[24%] max-[640px]:left-[2%]'
              aria-hidden='true'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <HeroIntro />
      <CountdownSection />
      <ScheduleSection />
      <ListaPresentes />
    </>
  );
}
