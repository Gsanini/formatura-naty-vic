import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import nataliaPhoto from "../assets/natalia.jpeg";
import nataliaPhoto1200 from "../assets/natalia-1200.jpeg";
import nataliaPhoto1800 from "../assets/natalia-1800.jpeg";
import victoriaPhoto from "../assets/victoria.JPEG?url";
import { countdownLabelClassName } from "./countdown-section";

gsap.registerPlugin(ScrollTrigger);

const sectionInnerClassName =
  "mx-auto w-[min(76vw,1468px)] max-xl:w-[min(88vw,1120px)] max-[900px]:w-[min(calc(100%_-_48px),720px)] max-[640px]:w-[min(calc(100%_-_32px),520px)]";

const titleAccentClassName = "italic text-accent";

const galleryTileClassName =
  "group relative overflow-hidden rounded-[4px] bg-white/50 shadow-[0_18px_55px_rgba(49,32,28,0.08)]";

const galleryImageClassName =
  "h-full w-full object-cover transition duration-[1600ms] ease-out will-change-transform group-hover:scale-[1.025]";

const galleryItems = [
  {
    src: nataliaPhoto1200,
    srcSet: `${nataliaPhoto1200} 1200w, ${nataliaPhoto1800} 1800w, ${nataliaPhoto} 4160w`,
    sizes: "(max-width: 640px) 31vw, (max-width: 1200px) 28vw, 300px",
    alt: "Natalia em ensaio de formatura ao ar livre",
    className: "col-start-1 row-start-1 col-span-2 row-span-3",
    imageClassName: "object-[56%_43%]",
    drift: "-4",
  },
  {
    src: victoriaPhoto,
    alt: "Victoria sentada em uma poltrona durante o ensaio",
    className: "col-start-3 row-start-1 col-span-2 row-span-2",
    imageClassName: "object-[47%_38%]",
    drift: "3",
  },
  {
    src: nataliaPhoto1800,
    srcSet: `${nataliaPhoto1200} 1200w, ${nataliaPhoto1800} 1800w, ${nataliaPhoto} 4160w`,
    sizes: "(max-width: 640px) 31vw, (max-width: 1200px) 28vw, 300px",
    alt: "Retrato de formatura da Natalia com o canudo",
    className: "col-start-5 row-start-1 col-span-2 row-span-3",
    imageClassName: "object-[62%_34%]",
    drift: "-3",
  },
  {
    src: victoriaPhoto,
    alt: "Detalhe do ensaio de formatura da Victoria",
    className: "col-start-1 row-start-4 col-span-2 row-span-3",
    imageClassName: "object-[35%_60%]",
    drift: "4",
  },
  {
    src: nataliaPhoto,
    srcSet: `${nataliaPhoto1200} 1200w, ${nataliaPhoto1800} 1800w, ${nataliaPhoto} 4160w`,
    sizes: "(max-width: 640px) 31vw, (max-width: 1200px) 28vw, 300px",
    alt: "Natalia sorrindo no ensaio de formatura",
    className: "col-start-3 row-start-3 col-span-2 row-span-2",
    imageClassName: "object-[50%_38%]",
    drift: "-2",
  },
  {
    src: victoriaPhoto,
    alt: "Victoria segurando o canudo no ensaio",
    className: "col-start-5 row-start-4 col-span-2 row-span-3",
    imageClassName: "object-[54%_45%]",
    drift: "3",
  },
  {
    src: nataliaPhoto1200,
    srcSet: `${nataliaPhoto1200} 1200w, ${nataliaPhoto1800} 1800w, ${nataliaPhoto} 4160w`,
    sizes: "(max-width: 640px) 31vw, (max-width: 1200px) 28vw, 300px",
    alt: "Detalhe do retrato de formatura da Natalia",
    className: "col-start-3 row-start-5 col-span-2 row-span-2",
    imageClassName: "object-[35%_38%]",
    drift: "2",
  },
];

export default function Galeria() {
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
      gsap.from("[data-gallery-header]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 76%" },
      });

      gsap.from("[data-gallery-item]", {
        opacity: 0,
        y: 26,
        scale: 0.985,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: { trigger: "[data-gallery-grid]", start: "top 78%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-gallery-img]").forEach((image) => {
        gsap.to(image, {
          yPercent: Number(image.dataset.galleryDrift ?? 0),
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className='bg-background pb-20 pt-10 md:pb-40 md:pt-30'
      aria-labelledby='galeria-title'
    >
      <div className={sectionInnerClassName}>
        <header
          data-gallery-header
          className='flex flex-col items-start gap-5 md:gap-[42px] lg:flex-row lg:justify-between lg:gap-10'
        >
          <p
            className={`${countdownLabelClassName} max-[640px]:col-start-1 max-[640px]:row-start-1`}
          >
            ensaio 2026
          </p>
          <h2
            id='galeria-title'
            className='max-w-[880px] font-display text-[1.75rem] font-semibold leading-[0.98] tracking-normal text-foreground sm:text-[2.15rem] md:text-[3.2rem] md:leading-[0.96] lg:text-[3rem] lg:leading-[0.94] max-[640px]:col-start-1 max-[640px]:row-start-2 max-[640px]:max-w-full'
          >
            <span className='whitespace-nowrap max-[640px]:block max-[640px]:whitespace-normal'>
              Os retratos
            </span>
            <br className='max-[640px]:hidden' />
            <em className={titleAccentClassName}>antes da noite</em>
          </h2>
        </header>

        <div
          data-gallery-grid
          className='mx-auto mt-[82px] grid aspect-square w-full max-w-[940px] grid-cols-6 grid-rows-6 gap-2.5 max-[900px]:mt-[64px] max-[640px]:mt-[50px] max-[640px]:gap-1.5'
        >
          {galleryItems.map((item) => (
            <figure
              key={`${item.className}-${item.alt}`}
              data-gallery-item
              className={`${galleryTileClassName} ${item.className}`}
            >
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes={item.sizes}
                alt={item.alt}
                loading='lazy'
                decoding='async'
                data-gallery-img
                data-gallery-drift={item.drift}
                className={`${galleryImageClassName} ${item.imageClassName}`}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
