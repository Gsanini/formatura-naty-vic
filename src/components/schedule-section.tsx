import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "../data";
import { countdownLabelClassName } from "./countdown-section";

gsap.registerPlugin(ScrollTrigger);

const titleAccentClassName = "italic text-accent";

export function EventTimelineSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-tl-header]", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-tl-row]").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });

      gsap.to("[data-tl-line-fill]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-tl-line]",
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className='bg-background pb-20 pt-20 md:pb-40 md:pt-30'
    >
      <div className='mx-auto w-[min(76vw,1468px)] max-xl:w-[min(88vw,1120px)] max-[900px]:w-[min(calc(100%_-_48px),720px)] max-[640px]:w-[min(calc(100%_-_32px),520px)]'>
        <header
          data-tl-header
          className='flex flex-col items-start gap-5 md:gap-[42px] lg:flex-row lg:justify-between lg:gap-10'
        >
          <p
            className={`${countdownLabelClassName} max-[640px]:col-start-1 max-[640px]:row-start-1`}
          >
            Roteiro da noite
          </p>
          <h2 className='max-w-[880px] font-display text-[1.75rem] font-semibold leading-[0.98] tracking-normal text-foreground sm:text-[2.15rem] md:text-[3.2rem] md:leading-[0.96] lg:text-[3rem] lg:leading-[0.94] max-[640px]:col-start-1 max-[640px]:row-start-2 max-[640px]:max-w-full'>
            <span className='whitespace-nowrap max-[640px]:block max-[640px]:whitespace-normal'>
              Programação,
              <span className='max-[640px]:hidden'> </span>
              <br className='hidden max-[640px]:block' />
              <em className={`${titleAccentClassName} whitespace-nowrap`}>
                minuto a
              </em>
            </span>
            <br className='max-[640px]:hidden' />
            <em className={titleAccentClassName}>minuto.</em>
          </h2>
        </header>

        <div className='relative mt-[103px] max-[900px]:mt-[72px] max-[640px]:mt-[58px]'>
          <div
            data-tl-line
            className='pointer-events-none absolute top-0 bottom-2.5 left-[168px] w-px overflow-hidden bg-border max-[640px]:left-3'
            aria-hidden
          >
            <div
              data-tl-line-fill
              className='h-full w-full origin-top scale-y-0 bg-accent'
            />
          </div>

          <ol className='grid list-none'>
            {TIMELINE.map((item) => (
              <li
                key={item.time}
                data-tl-row
                className='group grid min-h-[192px] grid-cols-[168px_70px_minmax(0,1fr)] last:min-h-[124px] max-[640px]:min-h-[150px] max-[640px]:grid-cols-[38px_minmax(0,1fr)] max-[640px]:grid-rows-[auto_1fr] max-[640px]:last:min-h-24'
              >
                <time className="relative z-10 whitespace-nowrap pr-6 font-display text-[1.7rem] font-semibold leading-[0.97] tracking-normal text-primary [font-variation-settings:'SOFT'_0,'WONK'_1] sm:text-[1.85rem] md:text-[2.2rem] lg:text-[2.3rem] max-[640px]:col-start-2 max-[640px]:pr-0">
                  {item.time}
                </time>
                <div
                  className='relative max-[640px]:col-start-1 max-[640px]:row-span-2'
                  aria-hidden='true'
                >
                  <span className='absolute top-[19px] left-[34px] size-2.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150 max-[640px]:top-[17px] max-[640px]:left-[7px]' />
                </div>
                <div className='pt-px max-[640px]:col-start-2 max-[640px]:row-start-2 max-[640px]:pt-2.5'>
                  <h3 className="font-display text-[1.2rem] font-light leading-[1.02] tracking-normal text-foreground [font-variation-settings:'SOFT'_15,'WONK'_1] sm:text-[1.5rem] md:text-[1.5rem] md:leading-[0.98] lg:text-[1.7rem] lg:leading-[0.95]">
                    {item.title}
                  </h3>
                  <p className='mt-3 font-display max-w-[56ch] font-extralight text-[0.82rem] leading-[1.45] tracking-normal text-foreground/60 sm:text-[0.96rem] md:text-[1rem] md:leading-[1.35] lg:text-[15px] max-[640px]:mt-1.25'>
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default EventTimelineSection;
