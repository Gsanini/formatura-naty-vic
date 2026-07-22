import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Gift,
  MessageCircle,
  QrCode,
  Send,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createStaticPix, hasError } from "pix-utils";
import { toDataURL } from "qrcode";
import aposentadoria from "../assets/fotosPresentes/aposentadoria.jpeg";
import aperolPhoto from "../assets/fotosPresentes/aperol.jpeg";
import atendimentoVipPhoto from "../assets/fotosPresentes/atendimentoVipFesta.jpeg";
import botinasPhoto from "../assets/fotosPresentes/botinas.jpeg";
import cobaiaPhoto from "../assets/fotosPresentes/cobaia.jpeg";
import melhorPresentePhoto from "../assets/fotosPresentes/melhorPresente.jpeg";
import patrocinadoresPhoto from "../assets/fotosPresentes/patrocinadoresOficiais.jpeg";
import pulseiraVipPhoto from "../assets/fotosPresentes/pulseiraVip.jpeg";
import roubarDocinhoPhoto from "../assets/fotosPresentes/roubarDocinho.jpeg";
import taxaConvidadoPhoto from "../assets/fotosPresentes/taxaParaConvidarAlguem.jpeg";
import terapiaPhoto from "../assets/fotosPresentes/terapia.jpeg";
import vestidosPhoto from "../assets/fotosPresentes/vestidos.jpeg";
import zeGotinhaPhoto from "../assets/fotosPresentes/zegotinha.jpeg";
import ajudaipagar from "../assets/fotosPresentes/ajudeipagar.jpeg";
import direitojulgar from "../assets/fotosPresentes/direitojulgar.jpeg";
import dj from "../assets/fotosPresentes/dj.jpeg";
import intervencaodivina from "../assets/fotosPresentes/intervencaodivina.jpeg";
import naodeinaad from "../assets/fotosPresentes/naodeinaad.jpeg";
import parentefavorito from "../assets/fotosPresentes/parenteFavorito.jpeg";

import { countdownLabelClassName } from "./countdown-section";

gsap.registerPlugin(ScrollTrigger);

type RecipientId = "natalia" | "victoria";

type Recipient = {
  id: RecipientId;
  name: string;
  shortName: string;
  pixKey: string;
  merchantCity: string;
};

type GiftItem = {
  id: string;
  description: string;
  value: string;
  image?: string;
  imageClassName?: string;
};

type PaymentQrCode = {
  imageUrl: string;
  brCode: string;
  infoAdicional: string;
  recipient: Recipient;
};

const sectionInnerClassName =
  "mx-auto w-[min(76vw,1468px)] max-xl:w-[min(88vw,1120px)] max-[900px]:w-[min(calc(100%_-_48px),720px)] max-[640px]:w-[min(calc(100%_-_32px),520px)]";

const titleAccentClassName = "italic text-accent";

const pixGuiEmvLength = 18;
const pixSubfieldHeaderLength = 4;
const pixMerchantAccountMaxLength = 99;
const flexibleGiftValueLabel = "Valor livre";

const recipients: Recipient[] = [
  {
    id: "natalia",
    name: "Natalia",
    shortName: "Naty",
    pixKey: "04307946065",
    merchantCity: "SAO PAULO",
  },
  {
    id: "victoria",
    name: "Victoria",
    shortName: "Vic",
    pixKey: "04307953002",
    merchantCity: "SAO PAULO",
  },
];

const giftItems: GiftItem[] = [
  {
    id: "gift-02",
    description: "Botinas novas pra engenheira",
    value: "R$ 150",
    image: botinasPhoto,
    imageClassName: "object-[50%_50%]",
  },
  {
    id: "gift-03",
    description: "Para o Zé Gotinha aparecer na festa",
    value: "R$ 80",
    image: zeGotinhaPhoto,
    imageClassName: "object-[50%_44%]",
  },
  {
    id: "gift-04",
    description: "Para ser cobaia da Naty",
    value: "R$ 100",
    image: cobaiaPhoto,
    imageClassName: "object-[50%_46%]",
  },
  {
    id: "gift-05",
    description: "Pulseira VIP do bar de drinks",
    value: "R$ 200",
    image: pulseiraVipPhoto,
    imageClassName: "object-[50%_52%]",
  },
  {
    id: "gift-06",
    description: "Atendimento VIP na festa",
    value: "R$ 150",
    image: atendimentoVipPhoto,
    imageClassName: "object-[50%_48%]",
  },
  {
    id: "gift-07",
    description: "Para não faltar Aperol na festa",
    value: "R$ 100",
    image: aperolPhoto,
    imageClassName: "object-[50%_48%]",
  },
  {
    id: "gift-08",
    description: "Para saber antes como serão os vestidos",
    value: "R$ 250",
    image: vestidosPhoto,
    imageClassName: "object-[50%_44%]",
  },
  {
    id: "gift-09",
    description: "Auxílio terapia pós TCC",
    value: "R$50",
    image: terapiaPhoto,
    imageClassName: "object-[50%_48%]",
  },
  {
    id: "gift-11",
    description: "Passe livre pra roubar docinho antes da hora",
    value: "R$ 80",
    image: roubarDocinhoPhoto,
    imageClassName: "object-[50%_48%]",
  },
  {
    id: "gift-01",
    description: "Ajude os patrocinadores oficiais",
    value: "R$ 350",
    image: patrocinadoresPhoto,
    imageClassName: "object-[50%_48%]",
  },
  {
    id: "gift-13",
    description: "Dei o MELHOR presente",
    value: "R$ 1000",
    image: melhorPresentePhoto,
    imageClassName: "object-[50%_45%]",
  },
  {
    id: "gift-14",
    description: "Taxa pra convidar alguém pra festa",
    value: "R$ 250",
    image: taxaConvidadoPhoto,
    imageClassName: "object-[50%_50%]",
  },
  {
    id: "gift-15",
    description: "Fundo de aposentadoria das recém-formadas",
    value: "R$ 300",
    image: aposentadoria,
    imageClassName: "object-[50%_50%]",
  },
  {
    id: "gift-17",
    description: "Direito vitalício de dizer: eu ajudei a pagar essa festa",
    image: ajudaipagar,
    imageClassName: "object-[50%_50%]",
    value: "R$ 400",
  },
  {
    id: "gift-18",
    description: "Se, por uma intervenção divina, você se sentir tocado",
    image: intervencaodivina,
    imageClassName: "object-[50%_50%]",
    value: "R$ 600",
  },

  {
    id: "gift-20",
    description: "Cota para ser o parente favorito",
    image: parentefavorito,
    imageClassName: "object-[50%_50%]",
    value: "R$ 320",
  },
  {
    id: "gift-21",
    description: "Taxa pra falar mal da festa com propriedade",
    image: direitojulgar,
    imageClassName: "object-[50%_50%]",
    value: "R$ 700",
  },
  {
    id: "gift-22",
    description: "Adicionar músicas na playlist do DJ",
    image: dj,
    imageClassName: "object-[50%_50%]",
    value: "R$ 100",
  },
  {
    id: "gift-19",
    description: "Só pra não dizer que não dei nada",
    image: naodeinaad,
    imageClassName: "object-[50%_50%]",
    value: flexibleGiftValueLabel,
  },
];

function getPixInfoLimit(pixKey: string) {
  if (!pixKey) {
    return 0;
  }

  return Math.max(
    0,
    pixMerchantAccountMaxLength -
      pixGuiEmvLength -
      (pixSubfieldHeaderLength + pixKey.length) -
      pixSubfieldHeaderLength,
  );
}

function parseCurrencyValue(value: string) {
  const normalizedValue = value.replace(/[^\d,]/g, "").replace(",", ".");
  const amount = Number(normalizedValue);

  return Number.isFinite(amount) ? amount : 0;
}

function createPaymentTxid(giftId: string, recipientId: RecipientId) {
  const giftNumber = giftId.replace(/\D/g, "");
  const recipientCode = recipientId === "natalia" ? "NAT" : "VIC";

  return `P${giftNumber}${recipientCode}`.slice(0, 25);
}

function cleanPixMessage(message: string, limit: number) {
  return message.trim().replace(/\s+/g, " ").slice(0, limit);
}

function GiftVisual({
  gift,
  variant,
}: {
  gift: GiftItem;
  variant: "card" | "modal";
}) {
  const isCard = variant === "card";

  return (
    <figure
      className={
        isCard
          ? "relative aspect-[4/3] overflow-hidden bg-accent-soft/20"
          : "relative aspect-[4/3] overflow-hidden rounded-[6px] border border-white bg-white shadow-[0_18px_54px_rgba(49,32,28,0.12)]"
      }
    >
      {gift.image ? (
        <>
          <img
            src={gift.image}
            alt={`Imagem do presente: ${gift.description}`}
            loading={isCard ? "lazy" : undefined}
            decoding={isCard ? "async" : undefined}
            className={`h-full w-full object-cover ${
              isCard
                ? "transition duration-[1600ms] ease-out group-hover:scale-[1.035]"
                : ""
            } ${gift.imageClassName ?? ""}`}
          />
          {isCard ? (
            <div className='absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-75' />
          ) : null}
        </>
      ) : (
        <div className='grid h-full place-items-center bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(227,94,101,0.16))] px-5 text-center'>
          <div className='grid justify-items-center gap-3'>
            <span className='grid size-12 place-items-center rounded-full border border-primary/15 bg-white/70 text-primary shadow-[0_14px_40px_rgba(49,32,28,0.1)]'>
              <Gift className='size-5' strokeWidth={1.7} />
            </span>
            <span className='font-body text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-primary/70'>
              Foto em breve
            </span>
          </div>
        </div>
      )}
    </figure>
  );
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Alguns navegadores Android e WebViews expõem a API, mas bloqueiam seu uso.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.readOnly = true;
  textArea.setAttribute("aria-hidden", "true");
  textArea.style.position = "fixed";
  textArea.style.inset = "0";
  textArea.style.width = "1px";
  textArea.style.height = "1px";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, text.length);

  const wasCopied = document.execCommand("copy");
  textArea.remove();

  if (!wasCopied) {
    throw new Error("Clipboard unavailable");
  }
}

export default function ListaPresentes() {
  const rootRef = useRef<HTMLElement>(null);
  const paymentDialogRef = useRef<HTMLDivElement>(null);
  const [modalGift, setModalGift] = useState<GiftItem | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] =
    useState<RecipientId | null>(null);
  const [giftMessage, setGiftMessage] = useState("");
  const [paymentQrCode, setPaymentQrCode] = useState<PaymentQrCode | null>(
    null,
  );
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isGeneratingPayment, setIsGeneratingPayment] = useState(false);
  const [isCopiedPaymentCode, setIsCopiedPaymentCode] = useState(false);

  const selectedRecipient = selectedRecipientId
    ? (recipients.find((recipient) => recipient.id === selectedRecipientId) ??
      null)
    : null;
  const selectedRecipientInfoLimit = selectedRecipient
    ? getPixInfoLimit(selectedRecipient.pixKey)
    : 0;
  const remainingMessageCharacters = selectedRecipient
    ? Math.max(0, selectedRecipientInfoLimit - giftMessage.length)
    : 0;

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
      gsap.set("[data-gift-card]", { clearProps: "opacity" });

      gsap.from("[data-gift-header]", {
        opacity: 0,
        y: 26,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 76%" },
      });

      gsap.from("[data-gift-card]", {
        y: 28,
        scale: 0.985,
        duration: 0.74,
        ease: "power3.out",
        stagger: 0.045,
        scrollTrigger: { trigger: "[data-gift-list]", start: "top 76%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!modalGift) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (paymentQrCode) {
          handleClosePaymentModal();
        } else {
          handleCloseGiftModal();
        }
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalGift, paymentQrCode]);

  useEffect(() => {
    if (paymentQrCode) {
      paymentDialogRef.current?.focus();
    }
  }, [paymentQrCode]);

  function resetPaymentState() {
    setPaymentQrCode(null);
    setPaymentError(null);
    setIsCopiedPaymentCode(false);
  }

  function handleOpenGiftModal(gift: GiftItem) {
    setModalGift(gift);
    setSelectedRecipientId(null);
    setGiftMessage("");
    setIsGeneratingPayment(false);
    resetPaymentState();
  }

  function handleCloseGiftModal() {
    setModalGift(null);
    setSelectedRecipientId(null);
    setGiftMessage("");
    setIsGeneratingPayment(false);
    resetPaymentState();
  }

  function handleClosePaymentModal() {
    setPaymentQrCode(null);
    setPaymentError(null);
    setIsCopiedPaymentCode(false);
  }

  function handleSelectRecipient(recipient: Recipient) {
    const infoLimit = getPixInfoLimit(recipient.pixKey);

    setSelectedRecipientId(recipient.id);
    setGiftMessage((currentMessage) => currentMessage.slice(0, infoLimit));
    resetPaymentState();
  }

  function handleMessageChange(message: string) {
    setGiftMessage(message.slice(0, selectedRecipientInfoLimit));
    resetPaymentState();
  }

  async function handleGeneratePayment() {
    if (!modalGift || !selectedRecipient) {
      return;
    }

    if (!selectedRecipient.pixKey) {
      setPaymentError(
        `Adicione a chave Pix da ${selectedRecipient.name} para gerar o QR Code.`,
      );
      setPaymentQrCode(null);
      return;
    }

    setIsGeneratingPayment(true);
    setPaymentError(null);
    setPaymentQrCode(null);
    setIsCopiedPaymentCode(false);

    try {
      const infoAdicional = cleanPixMessage(
        giftMessage,
        selectedRecipientInfoLimit,
      );
      const pix = createStaticPix({
        merchantName: selectedRecipient.name,
        merchantCity: selectedRecipient.merchantCity,
        pixKey: selectedRecipient.pixKey,
        infoAdicional: infoAdicional || undefined,
        transactionAmount: parseCurrencyValue(modalGift.value),
        txid: createPaymentTxid(modalGift.id, selectedRecipient.id),
      });

      if (hasError(pix)) {
        setPaymentError(pix.message);
        return;
      }

      const brCode = pix.toBRCode();
      const imageUrl = await toDataURL(brCode, {
        errorCorrectionLevel: "M",
        margin: 1,
        width: 360,
        color: {
          dark: "#4d0012",
          light: "#fcfaf0",
        },
      });

      setPaymentQrCode({
        imageUrl,
        brCode,
        infoAdicional,
        recipient: selectedRecipient,
      });
    } catch {
      setPaymentError("Nao foi possivel gerar o QR Code agora.");
    } finally {
      setIsGeneratingPayment(false);
    }
  }

  async function handleCopyPaymentCode() {
    if (!paymentQrCode) {
      return;
    }

    try {
      await copyTextToClipboard(paymentQrCode.brCode);
      setIsCopiedPaymentCode(true);
      window.setTimeout(() => setIsCopiedPaymentCode(false), 1800);
    } catch {
      setPaymentError(
        "Não foi possível copiar automaticamente. Toque no código abaixo para selecioná-lo e copie manualmente.",
      );
    }
  }

  return (
    <section
      ref={rootRef}
      className='bg-background py-22 '
      aria-labelledby='presentes-title'
    >
      <div className={sectionInnerClassName}>
        <header
          data-gift-header
          className='flex flex-col items-start gap-5 md:gap-[42px] lg:flex-row lg:justify-between lg:gap-10'
        >
          <p className={countdownLabelClassName}>lista de presentes</p>
          <h2
            id='presentes-title'
            className='max-w-[920px] font-display text-[1.75rem] font-semibold leading-[0.98] tracking-normal text-foreground sm:text-[2.15rem] md:text-[3.2rem] md:leading-[0.96] lg:text-[3rem] lg:leading-[0.94]'
          >
            <span className='whitespace-nowrap max-[640px]:block max-[640px]:whitespace-normal'>
              Sua presença já é o presente!
            </span>
            <br className='max-[640px]:hidden' />
            <em className={titleAccentClassName}>
              mas, se quiser mimar <br />
              as formandas, a gente deixa:
            </em>
          </h2>
        </header>

        <ol
          data-gift-list
          className='gift-list-grid mx-auto mt-[70px] grid max-w-[1040px] list-none gap-4 max-[900px]:mt-[56px] max-[640px]:mt-[42px]'
        >
          {giftItems.map((item) => {
            return (
              <li
                key={item.id}
                data-gift-card
                className='group overflow-hidden rounded-[8px] border border-white/80 bg-white shadow-[0_22px_70px_rgba(49,32,28,0.09)] transition duration-500 hover:-translate-y-1 hover:border-accent/55 hover:shadow-[0_30px_85px_rgba(49,32,28,0.13)]'
              >
                <button
                  type='button'
                  className='grid h-full w-full grid-rows-[auto_1fr] text-left'
                  aria-haspopup='dialog'
                  onClick={() => handleOpenGiftModal(item)}
                >
                  <GiftVisual gift={item} variant='card' />

                  <div className='flex min-h-[132px] flex-col justify-between gap-4 p-4 max-[640px]:min-h-0 max-[640px]:p-3.5'>
                    <div>
                      <h3 className='mt-3 break-words font-display text-[1.18rem] font-light leading-[1.08] tracking-normal text-primary md:text-[1.12rem]'>
                        {item.description}
                      </h3>
                      <p className='mt-3 font-body text-[1.2rem] font-bold leading-none text-primary'>
                        {item.value}
                      </p>
                    </div>

                    <span className='inline-flex h-9 w-fit items-center gap-2 rounded-[4px] border border-primary/20 px-3 font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-primary transition group-hover:border-primary/45 group-hover:bg-primary group-hover:text-background'>
                      <Send className='size-3.5' strokeWidth={1.8} />
                      Escolher
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {modalGift ? (
        <div
          aria-hidden={paymentQrCode ? true : undefined}
          inert={Boolean(paymentQrCode)}
          className='fixed inset-0 z-50 overflow-y-auto overscroll-contain px-4 py-6 [scrollbar-gutter:stable] [-webkit-overflow-scrolling:touch]'
        >
          <button
            type='button'
            className='fixed inset-0 bg-primary/42 backdrop-blur-[2px]'
            aria-label='Fechar escolha do presente'
            onClick={handleCloseGiftModal}
          />

          <div className='relative z-10 flex min-h-full items-start justify-center md:items-center'>
            <div
              role='dialog'
              aria-modal='true'
              aria-labelledby='gift-modal-title'
              className='relative mx-auto grid min-h-0 w-full max-w-[1180px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[8px] border border-white/80 bg-background shadow-[0_30px_110px_rgba(49,32,28,0.28)] max-[767px]:overflow-visible md:max-h-[min(92svh,860px)]'
            >
              <div className='flex items-start justify-between gap-4 border-b border-border/55 px-5 py-4 max-[640px]:px-4'>
                <div>
                  <p className='font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-accent'>
                    escolher presente
                  </p>
                  <h3
                    id='gift-modal-title'
                    className='mt-2 font-display text-[1.7rem] font-light leading-[1.02] tracking-normal text-primary max-[640px]:text-[1.35rem]'
                  >
                    {modalGift.description}
                  </h3>
                </div>

                <button
                  type='button'
                  className='grid size-10 shrink-0 place-items-center rounded-[4px] border border-primary/15 text-primary transition hover:border-primary/35 hover:bg-white'
                  aria-label='Fechar modal'
                  onClick={handleCloseGiftModal}
                >
                  <X className='size-4' strokeWidth={1.8} />
                </button>
              </div>

              <div className='grid min-h-0 overflow-y-visible p-5 max-[640px]:p-4 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-6 md:overflow-y-auto md:overscroll-contain md:[-webkit-overflow-scrolling:touch]'>
                <aside className='md:sticky md:top-0 md:self-start'>
                  <GiftVisual gift={modalGift} variant='modal' />
                  <div className='mt-4 flex items-center justify-between gap-3 border-y border-border/55 py-3'>
                    <span className='font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/50'>
                      valor
                    </span>
                    <strong className='font-body text-[1rem] text-primary'>
                      {modalGift.value}
                    </strong>
                  </div>
                </aside>

                <div className='grid gap-5 max-[767px]:mt-5'>
                  <section>
                    <div className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/50'>
                      <WalletCards
                        className='size-3.5 text-accent'
                        strokeWidth={1.7}
                      />
                      Para quem vai?
                    </div>

                    <div className='mt-3 grid grid-cols-2 gap-2'>
                      {recipients.map((recipient) => {
                        const isSelected = selectedRecipientId === recipient.id;
                        const hasPixKey = Boolean(recipient.pixKey);

                        return (
                          <button
                            key={recipient.id}
                            type='button'
                            className={`flex min-h-20 flex-col items-start justify-center gap-2 rounded-[4px] border px-3.5 py-3 text-left transition ${
                              isSelected
                                ? "border-accent bg-accent/12"
                                : "border-border/70 bg-white/60 hover:border-accent hover:bg-accent/10"
                            }`}
                            aria-pressed={isSelected}
                            onClick={() => handleSelectRecipient(recipient)}
                          >
                            <span className='inline-flex items-center gap-2 font-body text-[0.85rem] font-semibold text-primary'>
                              {isSelected ? (
                                <Check className='size-4' strokeWidth={1.8} />
                              ) : (
                                <UserRound
                                  className='size-4'
                                  strokeWidth={1.8}
                                />
                              )}
                              {recipient.name}
                            </span>
                            <span className='max-w-full truncate font-body text-[0.68rem] uppercase tracking-[0.18em] text-foreground/45'>
                              {hasPixKey
                                ? `Pix ${recipient.shortName}`
                                : "Chave Pix em breve"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedRecipient ? (
                      <p
                        className='mt-3 flex items-center justify-center gap-2 font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent md:hidden'
                        aria-live='polite'
                      >
                        Continue abaixo para gerar o Pix
                        <ChevronDown
                          className='size-4 shrink-0 animate-bounce'
                          strokeWidth={1.8}
                        />
                      </p>
                    ) : null}
                  </section>

                  {selectedRecipient ? (
                    <section
                      className='scroll-mt-4 border-t border-border/55 pt-5'
                    >
                      <div className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/50'>
                        <MessageCircle
                          className='size-3.5 text-accent'
                          strokeWidth={1.7}
                        />
                        Quer deixar uma mensagem?
                      </div>

                      <label className='mt-3 grid gap-2'>
                        <span className='font-body text-[0.78rem] leading-snug text-foreground/62'>
                          Ela entra no campo de mensagem do QR Code Pix.
                        </span>
                        <textarea
                          value={giftMessage}
                          maxLength={selectedRecipientInfoLimit}
                          disabled={!selectedRecipient.pixKey}
                          onChange={(event) =>
                            handleMessageChange(event.target.value)
                          }
                          placeholder={
                            selectedRecipient.pixKey
                              ? "Ex.: Com carinho, parabens pela formatura!"
                              : "Adicione a chave Pix para habilitar a mensagem."
                          }
                          className='min-h-28 resize-none rounded-[6px] border border-border/70 bg-white/70 px-3.5 py-3 font-body text-[0.92rem] leading-relaxed text-foreground outline-none transition placeholder:text-foreground/35 focus:border-accent focus:bg-white disabled:cursor-not-allowed disabled:bg-white/45'
                        />
                      </label>

                      <div className='mt-2 flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-foreground/45 max-[520px]:flex-col max-[520px]:items-start'>
                        <span>Mensagem opcional</span>
                        <span>{remainingMessageCharacters} caracteres</span>
                      </div>

                      {!selectedRecipient.pixKey ? (
                        <p className='mt-4 rounded-[6px] border border-accent/35 bg-accent/10 px-3.5 py-3 font-body text-[0.82rem] leading-relaxed text-primary'>
                          A chave Pix da {selectedRecipient.name} ainda esta
                          vazia no codigo. Preencha `pixKey` para liberar o QR
                          Code.
                        </p>
                      ) : null}

                      <button
                        type='button'
                        className='mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[4px] bg-primary px-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-background transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:bg-primary/45'
                        disabled={
                          !selectedRecipient.pixKey || isGeneratingPayment
                        }
                        onClick={handleGeneratePayment}
                      >
                        <QrCode className='size-4' strokeWidth={1.8} />
                        {isGeneratingPayment
                          ? "Gerando..."
                          : giftMessage.trim()
                            ? "Gerar QR Code com mensagem"
                            : "Gerar QR Code sem mensagem"}
                      </button>
                    </section>
                  ) : null}

                  {paymentError ? (
                    <p className='rounded-[6px] border border-primary/25 bg-white/70 px-3.5 py-3 font-body text-[0.82rem] leading-relaxed text-primary'>
                      {paymentError}
                    </p>
                  ) : null}
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : null}

      {modalGift && paymentQrCode ? (
        <div className='fixed inset-0 z-[60] overflow-y-auto overscroll-contain px-4 py-6 [scrollbar-gutter:stable] [-webkit-overflow-scrolling:touch]'>
          <button
            type='button'
            className='fixed inset-0 bg-primary/55 backdrop-blur-[3px]'
            aria-label='Fechar QR Code Pix'
            onClick={handleClosePaymentModal}
          />

          <div className='relative z-10 flex min-h-full items-start justify-center md:items-center'>
            <div
              ref={paymentDialogRef}
              role='dialog'
              aria-modal='true'
              aria-labelledby='payment-modal-title'
              tabIndex={-1}
              className='relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[8px] border border-white/80 bg-background shadow-[0_30px_110px_rgba(49,32,28,0.32)] outline-none'
            >
              <header className='flex items-start justify-between gap-4 border-b border-border/55 px-5 py-4 max-[640px]:px-4'>
                <div>
                  <p className='font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-accent'>
                    Pix gerado
                  </p>
                  <h3
                    id='payment-modal-title'
                    className='mt-2 font-display text-[1.7rem] font-light leading-[1.02] text-primary max-[640px]:text-[1.4rem]'
                  >
                    Pix para {paymentQrCode.recipient.name}
                  </h3>
                </div>

                <button
                  type='button'
                  className='grid size-10 shrink-0 place-items-center rounded-[4px] border border-primary/15 text-primary transition hover:border-primary/35 hover:bg-white'
                  aria-label='Fechar QR Code Pix'
                  onClick={handleClosePaymentModal}
                >
                  <X className='size-4' strokeWidth={1.8} />
                </button>
              </header>

              <div className='grid gap-4 p-5 max-[640px]:p-4'>
                <p className='font-body text-[0.9rem] leading-relaxed text-foreground/68'>
                  {parseCurrencyValue(modalGift.value) > 0
                    ? `Enviar ${modalGift.value} para `
                    : "Pix sem valor fixo para "}
                  <span className='font-semibold text-primary'>
                    {paymentQrCode.recipient.name}
                  </span>
                  .
                </p>

                <div className='mx-auto w-full max-w-[320px] rounded-[6px] border border-border/60 bg-white p-3 shadow-[0_18px_54px_rgba(49,32,28,0.12)]'>
                  <img
                    src={paymentQrCode.imageUrl}
                    alt={`QR Code Pix para ${paymentQrCode.recipient.name}`}
                    className='aspect-square w-full object-contain'
                  />
                </div>

                <label className='grid gap-2'>
                  <span className='font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/50'>
                    Pix copia e cola
                  </span>
                  <textarea
                    readOnly
                    rows={3}
                    value={paymentQrCode.brCode}
                    onFocus={(event) => event.currentTarget.select()}
                    aria-label='Código Pix copia e cola'
                    className='w-full resize-none break-all rounded-[6px] border border-border/60 bg-white/70 px-3 py-2 font-mono text-[0.72rem] leading-relaxed text-foreground outline-none focus:border-accent'
                  />
                </label>

                {paymentError ? (
                  <p className='rounded-[6px] border border-primary/25 bg-white/70 px-3.5 py-3 font-body text-[0.82rem] leading-relaxed text-primary'>
                    {paymentError}
                  </p>
                ) : null}

                <button
                  type='button'
                  className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-[4px] bg-primary px-3.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-primary-strong'
                  onClick={handleCopyPaymentCode}
                >
                  {isCopiedPaymentCode ? (
                    <Check className='size-4' strokeWidth={1.8} />
                  ) : (
                    <Copy className='size-4' strokeWidth={1.8} />
                  )}
                  {isCopiedPaymentCode ? "Copiado" : "Copiar código Pix"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
