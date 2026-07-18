import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Check,
  MessageCircle,
  Plus,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RSVP_WHATSAPP_PHONE } from "../data";
import { countdownLabelClassName } from "./countdown-section";

gsap.registerPlugin(ScrollTrigger);

const sectionInnerClassName =
  "mx-auto w-[min(76vw,1468px)] max-xl:w-[min(88vw,1120px)] max-[900px]:w-[min(calc(100%_-_48px),720px)] max-[640px]:w-[min(calc(100%_-_32px),520px)]";

const titleAccentClassName = "italic text-accent";

function cleanName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function uniqueNames(names: string[]) {
  const seenNames = new Set<string>();

  return names.filter((name) => {
    const normalizedName = name.toLocaleLowerCase("pt-BR");

    if (seenNames.has(normalizedName)) {
      return false;
    }

    seenNames.add(normalizedName);
    return true;
  });
}

function createConfirmationMessage(names: string[]) {
  const list = names.map((name) => `- ${name}`).join("\n");
  const totalLabel = names.length === 1 ? "1 pessoa" : `${names.length} pessoas`;

  return [
    "Confirmação de presença - Formatura Naty & Vic",
    "",
    "Confirmados:",
    list,
    "",
    `Total: ${totalLabel}`,
  ].join("\n");
}

function createWhatsappUrl(message: string) {
  const cleanPhone = RSVP_WHATSAPP_PHONE.replace(/\D/g, "");
  const baseUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}`
    : "https://wa.me/";

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export default function ConfirmacaoPresenca() {
  const rootRef = useRef<HTMLElement>(null);
  const [fullName, setFullName] = useState("");
  const [additionalNames, setAdditionalNames] = useState<string[]>([""]);

  const confirmedNames = useMemo(() => {
    return uniqueNames([fullName, ...additionalNames].map(cleanName).filter(Boolean));
  }, [additionalNames, fullName]);
  const hasPrimaryName = cleanName(fullName).length >= 3;
  const canConfirm = hasPrimaryName && confirmedNames.length > 0;

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
      gsap.from("[data-rsvp-header]", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 76%" },
      });

      gsap.from("[data-rsvp-panel]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-rsvp-content]", start: "top 78%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  function handleAdditionalNameChange(index: number, value: string) {
    setAdditionalNames((currentNames) =>
      currentNames.map((name, currentIndex) =>
        currentIndex === index ? value : name,
      ),
    );
  }

  function handleAddAdditionalName() {
    setAdditionalNames((currentNames) => [...currentNames, ""]);
  }

  function handleRemoveAdditionalName(index: number) {
    setAdditionalNames((currentNames) => {
      const nextNames = currentNames.filter(
        (_, currentIndex) => currentIndex !== index,
      );

      return nextNames.length ? nextNames : [""];
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canConfirm) {
      return;
    }

    const message = createConfirmationMessage(confirmedNames);
    const whatsappUrl = createWhatsappUrl(message);
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
      return;
    }

    window.location.href = whatsappUrl;
  }

  return (
    <section
      ref={rootRef}
      className='bg-background py-22 md:py-30'
      aria-labelledby='confirmacao-title'
    >
      <div className={sectionInnerClassName}>
        <header
          data-rsvp-header
          className='flex flex-col items-start gap-5 md:gap-[42px] lg:flex-row lg:justify-between lg:gap-10'
        >
          <p className={countdownLabelClassName}>confirmação de presença</p>
          <h2
            id='confirmacao-title'
            className='max-w-[900px] font-display text-[1.75rem] font-semibold leading-[0.98] tracking-normal text-foreground sm:text-[2.15rem] md:text-[3.2rem] md:leading-[0.96] lg:text-[3rem] lg:leading-[0.94]'
          >
            Confirme quem vai
            <br className='max-[640px]:hidden' />
            <em className={titleAccentClassName}> celebrar com a gente.</em>
          </h2>
        </header>

        <div
          data-rsvp-content
          className='mt-[70px] grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.48fr)] max-[900px]:mt-[56px] max-[640px]:mt-[42px]'
        >
          <form
            data-rsvp-panel
            className='border-y border-border/60 py-7 md:py-8'
            onSubmit={handleSubmit}
          >
            <label className='grid gap-2'>
              <span className='flex items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/50'>
                <UserRound className='size-3.5 text-accent' strokeWidth={1.7} />
                Seu nome completo
              </span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete='name'
                placeholder='Nome e sobrenome'
                className='h-12 rounded-[6px] border border-border/70 bg-white/70 px-3.5 font-body text-[0.95rem] text-foreground outline-none transition placeholder:text-foreground/35 focus:border-accent focus:bg-white'
              />
            </label>

            <div className='mt-7'>
              <div className='flex items-center justify-between gap-3'>
                <span className='flex items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/50'>
                  <UsersRound
                    className='size-3.5 text-accent'
                    strokeWidth={1.7}
                  />
                  Confirmar junto
                </span>

                <button
                  type='button'
                  className='grid size-10 shrink-0 place-items-center rounded-[4px] border border-primary/15 text-primary transition hover:border-primary/35 hover:bg-white'
                  aria-label='Adicionar pessoa'
                  onClick={handleAddAdditionalName}
                >
                  <Plus className='size-4' strokeWidth={1.8} />
                </button>
              </div>

              <div className='mt-3 grid gap-2.5'>
                {additionalNames.map((name, index) => (
                  <div
                    key={index}
                    className='grid grid-cols-[minmax(0,1fr)_44px] gap-2'
                  >
                    <input
                      value={name}
                      onChange={(event) =>
                        handleAdditionalNameChange(index, event.target.value)
                      }
                      autoComplete='name'
                      placeholder='Nome completo'
                      className='h-11 rounded-[6px] border border-border/70 bg-white/70 px-3.5 font-body text-[0.92rem] text-foreground outline-none transition placeholder:text-foreground/35 focus:border-accent focus:bg-white'
                    />
                    <button
                      type='button'
                      className='grid size-11 place-items-center rounded-[4px] border border-primary/15 text-primary transition hover:border-primary/35 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35'
                      aria-label='Remover pessoa'
                      disabled={additionalNames.length === 1 && !name.trim()}
                      onClick={() => handleRemoveAdditionalName(index)}
                    >
                      <Trash2 className='size-4' strokeWidth={1.8} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type='submit'
              className='mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[4px] bg-primary px-4 font-body text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-background transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:bg-primary/45'
              disabled={!canConfirm}
            >
              <MessageCircle className='size-4' strokeWidth={1.8} />
              Confirmar no WhatsApp
            </button>
          </form>

          <aside
            data-rsvp-panel
            className='border-y border-border/60 py-7 lg:border-l lg:border-y-0 lg:py-0 lg:pl-8'
            aria-live='polite'
          >
            <div className='flex items-center justify-between gap-4'>
              <p className='font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-accent'>
                confirmados
              </p>
              <strong className='font-display text-[2.4rem] font-semibold leading-none text-primary'>
                {confirmedNames.length}
              </strong>
            </div>

            <ol className='mt-6 grid list-none gap-2.5'>
              {confirmedNames.length ? (
                confirmedNames.map((name) => (
                  <li
                    key={name}
                    className='flex min-h-10 items-center gap-2 border-b border-border/40 pb-2.5 font-body text-[0.9rem] leading-snug text-foreground/70 last:border-b-0 last:pb-0'
                  >
                    <Check className='size-4 shrink-0 text-accent' strokeWidth={1.8} />
                    <span className='break-words'>{name}</span>
                  </li>
                ))
              ) : (
                <li className='font-body text-[0.9rem] leading-relaxed text-foreground/45'>
                  Aguardando nomes
                </li>
              )}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
