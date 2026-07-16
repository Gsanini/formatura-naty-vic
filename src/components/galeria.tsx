import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import natyAmigasPhoto from "../assets/fotosGaleria/natyAmigas.jpeg";
import natyEdsonPhoto from "../assets/fotosGaleria/NatyEdson.jpeg";
import natyGabrielPhoto from "../assets/fotosGaleria/natyGabriel.jpeg";
import natyJaquePhoto from "../assets/fotosGaleria/NatyJaque.jpeg";
import natyMartaPhoto from "../assets/fotosGaleria/natyMarta.jpeg";
import natySozinhaPhoto from "../assets/fotosGaleria/natysozinha.jpeg";
import natySozinha2Photo from "../assets/fotosGaleria/natysozinha2.jpeg";
import natyVicJuntasPhoto from "../assets/fotosGaleria/natyvicjuntas.jpeg";
import natyVicJuntas2Photo from "../assets/fotosGaleria/natyvicjuntas2.jpeg";
import vicEdsonPhoto from "../assets/fotosGaleria/vicEdson.jpeg";
import vicJaquePhoto from "../assets/fotosGaleria/vicJaque.jpeg";
import vicLucasPhoto from "../assets/fotosGaleria/vicLucas.jpeg";
import vicSozinhaPhoto from "../assets/fotosGaleria/vicsozinha.jpeg";
import vicSozinha2Photo from "../assets/fotosGaleria/vicSozinha2.jpeg";
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
    src: vicJaquePhoto,
    alt: "Victoria com Jaque no ensaio de formatura",
    className: "col-start-1 row-start-1 col-span-2 row-span-3",
    imageClassName: "object-[50%_44%]",
    drift: "-4",
  },
  {
    src: natySozinha2Photo,
    alt: "Natalia sozinha no ensaio de formatura",
    className: "col-start-3 row-start-1 col-span-2 row-span-2",
    imageClassName: "object-[50%_38%]",
    drift: "3",
  },
  {
    src: natyVicJuntasPhoto,
    alt: "Natalia e Victoria juntas no ensaio de formatura",
    className: "col-start-5 row-start-1 col-span-2 row-span-3",
    imageClassName: "object-[50%_45%]",
    drift: "-3",
  },
  {
    src: natyMartaPhoto,
    alt: "Natalia com Marta no ensaio de formatura",
    className: "col-start-1 row-start-4 col-span-2 row-span-3",
    imageClassName: "object-[48%_40%]",
    drift: "4",
  },
  {
    src: vicSozinhaPhoto,
    alt: "Victoria sozinha no ensaio de formatura",
    className: "col-start-3 row-start-3 col-span-2 row-span-2",
    imageClassName: "object-[50%_38%]",
    drift: "-2",
  },
  {
    src: natyEdsonPhoto,
    alt: "Natalia com Edson no ensaio de formatura",
    className: "col-start-5 row-start-4 col-span-2 row-span-3",
    imageClassName: "object-[50%_40%]",
    drift: "3",
  },
  {
    src: vicLucasPhoto,
    alt: "Victoria com Lucas no ensaio de formatura",
    className: "col-start-3 row-start-5 col-span-2 row-span-2",
    imageClassName: "object-[50%_40%]",
    drift: "2",
  },
  {
    src: natyVicJuntas2Photo,
    alt: "Natalia e Victoria em retrato juntas",
    className: "col-start-1 row-start-7 col-span-2 row-span-3",
    imageClassName: "object-[50%_40%]",
    drift: "-3",
  },
  {
    src: vicEdsonPhoto,
    alt: "Victoria com Edson no ensaio de formatura",
    className: "col-start-3 row-start-7 col-span-2 row-span-2",
    imageClassName: "object-[50%_45%]",
    drift: "4",
  },
  {
    src: natyJaquePhoto,
    alt: "Natalia com Jaque no ensaio de formatura",
    className: "col-start-5 row-start-7 col-span-2 row-span-3",
    imageClassName: "object-[50%_40%]",
    drift: "-2",
  },
  {
    src: vicSozinha2Photo,
    alt: "Retrato da Victoria no ensaio de formatura",
    className: "col-start-1 row-start-10 col-span-2 row-span-3",
    imageClassName: "object-[50%_40%]",
    drift: "2",
  },
  {
    src: natyAmigasPhoto,
    alt: "Natalia com amigas no ensaio de formatura",
    className: "col-start-3 row-start-9 col-span-2 row-span-2",
    imageClassName: "object-[50%_46%]",
    drift: "-4",
  },
  {
    src: natyGabrielPhoto,
    alt: "Natalia com Gabriel no ensaio de formatura",
    className: "col-start-5 row-start-10 col-span-2 row-span-3",
    imageClassName: "object-[50%_40%]",
    drift: "3",
  },
  {
    src: natySozinhaPhoto,
    alt: "Retrato da Natalia no ensaio de formatura",
    className: "col-start-3 row-start-11 col-span-2 row-span-2",
    imageClassName: "object-[50%_38%]",
    drift: "-3",
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
          className='mx-auto mt-[82px] grid aspect-[1/2] w-full max-w-[940px] grid-cols-6 grid-rows-[repeat(12,minmax(0,1fr))] gap-2.5 max-[900px]:mt-[64px] max-[640px]:mt-[50px] max-[640px]:gap-1.5'
        >
          {galleryItems.map((item) => (
            <figure
              key={`${item.className}-${item.alt}`}
              data-gallery-item
              className={`${galleryTileClassName} ${item.className}`}
            >
              <img
                src={item.src}
                sizes='(max-width: 640px) 50vw, (max-width: 900px) 44vw, 360px'
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
