import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GRADUATION_DATE } from "../data";
import { computeParts, pad } from "../lib/countdown";

gsap.registerPlugin(ScrollTrigger);

export const countdownLabelClassName =
  "whitespace-nowrap font-body text-[11px] font-normal uppercase leading-none tracking-[0.4em] text-foreground/55 max-[640px]:text-[0.68rem] max-[640px]:tracking-[0.48em]";

const sectionInnerClassName =
  "mx-auto w-[min(76vw,1468px)] max-xl:w-[min(88vw,1120px)] max-[900px]:w-[min(calc(100%_-_48px),720px)] max-[640px]:w-[min(calc(100%_-_32px),520px)]";

export default function CountdownSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState<ReturnType<
    typeof computeParts
  > | null>(null);

  useEffect(() => {
    setCountdown(computeParts(GRADUATION_DATE));

    const intervalId = window.setInterval(() => {
      setCountdown(computeParts(GRADUATION_DATE));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

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

    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add("(max-width: 640px)", () => {
        const mobileIntro = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 86%",
            end: "center 48%",
            scrub: 0.7,
          },
        });

        mobileIntro
          .from("[data-count-label]", {
            opacity: 0,
            y: 18,
            stagger: 0.08,
            ease: "none",
            duration: 0.35,
          })
          .from(
            "[data-count-item]",
            {
              opacity: 0,
              y: 64,
              scale: 0.92,
              stagger: 0.12,
              ease: "none",
              duration: 0.68,
            },
            0.12,
          );
      });

      media.add("(min-width: 641px)", () => {
      gsap.from("[data-count-item]", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });

      gsap.from("[data-count-label]", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      });
    }, root);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  const countdownItems = [
    { value: countdown ? String(countdown.days) : "0", label: "DIAS" },
    { value: countdown ? pad(countdown.hours) : "00", label: "HORAS" },
    { value: countdown ? pad(countdown.minutes) : "00", label: "MINUTOS" },
    { value: countdown ? pad(countdown.seconds) : "00", label: "SEGUNDOS" },
  ];

  return (
    <section
      ref={rootRef}
      className='bg-background flex items-center py-30 pt-40 md:py-40 '
      aria-labelledby='countdown-title'
    >
      <div className={sectionInnerClassName}>
        <div className='mb-[82px] flex items-start justify-between max-[900px]:grid max-[900px]:grid-cols-1 max-[900px]:gap-[42px] max-[640px]:mb-[58px] max-[640px]:gap-7'>
          <p
            data-count-label
            className={countdownLabelClassName}
            id='countdown-title'
          >
            CONTAGEM REGRESSIVA
          </p>
          <p
            data-count-label
            className="pr-px font-display text-[16px] font-normal italic text-foreground/60 leading-none [font-variation-settings:'SOFT'_20,'WONK'_1] max-[900px]:justify-self-start"
          >
            até o brinde
          </p>
        </div>

        <div
          className='grid grid-cols-4 max-[900px]:grid-cols-2 max-[900px]:gap-y-[42px] max-[640px]:gap-y-[34px]'
          aria-label='Contagem regressiva até o brinde'
        >
          {countdownItems.map((item) => (
            <div
              data-count-item
              className="relative flex flex-col items-center text-center before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[0.5px] before:bg-border/75 before:content-[''] first:before:hidden max-[900px]:before:hidden"
              key={item.label}
            >
              <strong className="block font-display text-[clamp(5.1rem,6.2vw,6.9rem)] font-medium leading-[0.78] tracking-normal text-primary [font-optical-sizing:auto] [font-variation-settings:'SOFT'_0,'WONK'_1] max-[640px]:text-[clamp(3.7rem,17vw,5rem)]">
                {item.value}
              </strong>
              <span
                className={`${countdownLabelClassName} mt-[28px] [text-indent:0.64em] max-[640px]:mt-5 max-[640px]:[text-indent:0.48em]`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
