import React, { useEffect, useMemo, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { OliveBranch } from './DecorativeElements'
import {
  Calendar,
  Mail,
  Users,
  Phone,
  AtSign,
  X,
  Tag,
  ChevronDown,
} from 'lucide-react'

const EMAILJS_SERVICE_ID = 'service_udnxwt2'
const EMAILJS_TEMPLATE_ID = 'template_72hewse'
const EMAILJS_PUBLIC_KEY = '8lE8ILbaH1QxsXjFJ'
const GOOGLE_ADS_SEND_TO = 'AW-17975995747/pl2CCPyc1f4bEOPaz_tC'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

function gtag_report_conversion() {
  try {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_SEND_TO,
        value: 1.0,
        currency: 'EUR',
      })
    }
  } catch {
    // never block UX
  }
  return false
}

export function BookingCTA() {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [sentOk, setSentOk] = useState<null | boolean>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [childrenAges, setChildrenAges] = useState('')
  const [fullName, setFullName] = useState('')
  const [discountCode, setDiscountCode] = useState('')
  const [showDiscount, setShowDiscount] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || !formRef.current) return
    const timer = setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => clearTimeout(timer)
  }, [open])

  const isEmailValid =
    email.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const isPhoneValid =
    phone.trim().length === 0 || phone.trim().replace(/\s+/g, '').length >= 6

  const hasAtLeastOneContact =
    (email.trim().length > 0 && isEmailValid) ||
    (phone.trim().length > 0 && isPhoneValid)

  const dateError = useMemo(() => {
    if (!checkIn || !checkOut) return ''
    if (checkOut <= checkIn) return 'Il check-out deve essere dopo il check-in.'
    return ''
  }, [checkIn, checkOut])

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
  }, [checkIn, checkOut])

  const canSend =
    !!checkIn &&
    !!checkOut &&
    !dateError &&
    adults >= 1 &&
    children >= 0 &&
    (children === 0 || childrenAges.trim().length > 0) &&
    fullName.trim().length > 1 &&
    hasAtLeastOneContact &&
    !sending

  const resetFeedback = () => {
    setSentOk(null)
    setErrorMsg('')
  }

  const resetForm = () => {
    setCheckIn('')
    setCheckOut('')
    setAdults(2)
    setChildren(0)
    setChildrenAges('')
    setFullName('')
    setDiscountCode('')
    setShowDiscount(false)
    setEmail('')
    setPhone('')
    setSentOk(null)
    setErrorMsg('')
    setOpen(false)
  }

  const sendEmail = async () => {
    resetFeedback()

    if (!canSend) {
      setErrorMsg(
        dateError ||
          'Compila nome, date, ospiti e almeno un contatto valido tra email e cellulare.'
      )
      return
    }

    setSending(true)

    try {
      const templateParams = {
        title: 'Richiesta disponibilità WaCa',
        name: fullName.trim() || 'Ospite WaCa',
        discount_code: discountCode.trim() || '-',
        checkin: checkIn,
        checkout: checkOut,
        nights: String(nights),
        adults: String(adults),
        children: String(children),
        ages: children > 0 ? childrenAges.trim() : '-',
        email: email.trim() || '-',
        phone: phone.trim() || '-',
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      gtag_report_conversion()
      setSentOk(true)
    } catch {
      setSentOk(false)
      setErrorMsg(
        'Si è verificato un problema temporaneo nell’invio della richiesta. Ti consigliamo di contattarci via WhatsApp nella sezione Contact Us.'
      )
    } finally {
      setSending(false)
    }
  }

  const labelCls = 'block text-[12px] font-serif mb-1.5 opacity-80 text-left'
  const inputCls =
    'w-full min-h-[50px] border border-[var(--cream)] bg-white px-4 py-3 font-serif text-[16px] leading-tight rounded-sm text-[var(--brown)] placeholder:text-[var(--brown)]/45 focus:outline-none focus:ring-2 focus:ring-[var(--sienna)]/20'
  const iconWrap = 'flex items-center gap-2'
  const iconCls = 'w-5 h-5 opacity-55 shrink-0'
  const sectionCard =
    'bg-[var(--paper)] text-[var(--brown)] shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-sm'
  const softPanel = 'border border-[var(--cream)]/80 bg-white/40 rounded-sm'

  return (
    <section
      id="booking"
      className="py-24 px-4 bg-[var(--sienna)] relative overflow-hidden text-[var(--paper)] scroll-mt-24"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <OliveBranch className="w-full h-full object-cover text-white transform scale-150 opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-script text-5xl md:text-7xl mb-6 text-[var(--cream)]">
          Prenota il Tuo Soggiorno
        </h2>

        <p className="font-serif text-2xl md:text-3xl mb-8 text-[var(--paper)] opacity-90">
          Book Your Stay in Puglia
        </p>

        {!open && (
          <>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
              Inserisci pochi dettagli essenziali: ti risponderemo con disponibilità e
              miglior tariffa garantita.
            </p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  resetFeedback()
                  setOpen(true)
                }}
                className="group min-h-[56px] border-2 border-[var(--paper)] text-[var(--paper)] px-10 py-5 rounded-sm font-serif text-xl flex items-center gap-3 hover:bg-[var(--paper)] hover:text-[var(--sienna)] transition-all duration-200 active:scale-[0.99]"
              >
                <Calendar className="w-6 h-6 transition-transform duration-200 group-hover:translate-y-[-1px]" aria-hidden="true" />
                <span>Check Availability</span>
              </button>
            </div>

            <p className="mt-8 text-sm opacity-60 font-serif uppercase tracking-widest">
              Minimum stay: 3 nights • Best Price Guaranteed
            </p>
          </>
        )}

        {open && (
          <div
            ref={formRef}
            className={`mt-8 max-w-2xl mx-auto text-left ${sectionCard}`}
          >
            <div className="px-5 py-4 md:px-7 md:py-5 border-b border-[var(--cream)] flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold">
                  Richiesta disponibilità
                </h3>
                <p className="font-serif text-[13px] md:text-[14px] opacity-70">
                  Compila e invia in meno di 1 minuto
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center justify-center min-w-[48px] min-h-[48px] border border-[var(--cream)] rounded-sm hover:bg-[var(--cream)]/70 transition-all duration-200"
                aria-label="Chiudi il form"
              >
                <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 md:p-7">
              {(sentOk === true || sentOk === false || errorMsg) && (
                <div
                  className={`mb-6 p-4 border font-serif text-[14px] leading-snug rounded-sm ${
                    sentOk
                      ? 'border-green-300 bg-green-50 text-green-900'
                      : 'border-red-200 bg-red-50 text-red-900'
                  }`}
                >
                  {sentOk === true && (
                    <div>✅ Richiesta inviata correttamente. Ti rispondiamo a breve.</div>
                  )}
                  {sentOk === false && <div>❌ {errorMsg}</div>}
                  {sentOk === null && errorMsg && <div>⚠️ {errorMsg}</div>}
                </div>
              )}

              {sentOk !== true && (
                <div className="space-y-6">
                  <div className={`p-4 md:p-5 ${softPanel}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 opacity-60" aria-hidden="true" />
                      <p className="font-serif text-sm uppercase tracking-wide opacity-70">
                        Date del soggiorno
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Check-in</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => {
                            setCheckIn(e.target.value)
                            resetFeedback()
                          }}
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>Check-out</label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => {
                            setCheckOut(e.target.value)
                            resetFeedback()
                          }}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {dateError && (
                      <p className="text-[13px] font-serif text-red-700 mt-3">
                        {dateError}
                      </p>
                    )}
                  </div>

                  <div className={`p-4 md:p-5 ${softPanel}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 opacity-60" aria-hidden="true" />
                      <p className="font-serif text-sm uppercase tracking-wide opacity-70">
                        Ospiti
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Adulti</label>
                        <div className={iconWrap}>
                          <Users className={iconCls} aria-hidden="true" />
                          <input
                            type="number"
                            min={1}
                            value={adults}
                            onChange={(e) => {
                              setAdults(Math.max(1, Number(e.target.value || 1)))
                              resetFeedback()
                            }}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Ragazzi</label>
                        <div className={iconWrap}>
                          <Users className={iconCls} aria-hidden="true" />
                          <input
                            type="number"
                            min={0}
                            value={children}
                            onChange={(e) => {
                              const v = Math.max(0, Number(e.target.value || 0))
                              setChildren(v)
                              if (v === 0) setChildrenAges('')
                              resetFeedback()
                            }}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    </div>

                    {children > 0 && (
                      <div className="mt-4">
                        <label className={labelCls}>Età ragazzi</label>
                        <input
                          type="text"
                          value={childrenAges}
                          onChange={(e) => {
                            setChildrenAges(e.target.value)
                            resetFeedback()
                          }}
                          placeholder="Es. 3, 7"
                          className={inputCls}
                        />
                      </div>
                    )}
                  </div>

                  <div className={`p-4 md:p-5 ${softPanel}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-4 h-4 opacity-60" aria-hidden="true" />
                      <p className="font-serif text-sm uppercase tracking-wide opacity-70">
                        Contatti
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Nome e Cognome</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value)
                            resetFeedback()
                          }}
                          placeholder="Mario Rossi"
                          className={inputCls}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Cellulare</label>
                          <div className={iconWrap}>
                            <Phone className={iconCls} aria-hidden="true" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value)
                                resetFeedback()
                              }}
                              placeholder="+39 ..."
                              className={inputCls}
                              inputMode="tel"
                            />
                          </div>
                          {phone.trim().length > 0 && !isPhoneValid && (
                            <p className="mt-1 text-[12px] text-red-700 font-serif">
                              Numero non valido.
                            </p>
                          )}
                        </div>

                        <div>
                          <label className={labelCls}>Email</label>
                          <div className={iconWrap}>
                            <AtSign className={iconCls} aria-hidden="true" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value)
                                resetFeedback()
                              }}
                              placeholder="nome@email.com"
                              className={inputCls}
                            />
                          </div>
                          {email.trim().length > 0 && !isEmailValid && (
                            <p className="mt-1 text-[12px] text-red-700 font-serif">
                              Email non valida.
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-[12px] font-serif opacity-70">
                        Inserisci almeno email o cellulare per essere ricontattato.
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 md:p-5 ${softPanel}`}>
                    <button
                      type="button"
                      onClick={() => setShowDiscount((v) => !v)}
                      className="group inline-flex items-center gap-2 text-sm font-serif underline underline-offset-4 opacity-85 hover:opacity-100"
                      aria-expanded={showDiscount}
                    >
                      <Tag className="w-4 h-4" aria-hidden="true" />
                      <span>Hai un codice sconto?</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          showDiscount ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {showDiscount && (
                      <div className="mt-4">
                        <label className={labelCls}>Codice sconto</label>
                        <div className={iconWrap}>
                          <Tag className={iconCls} aria-hidden="true" />
                          <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => {
                              setDiscountCode(e.target.value.toUpperCase())
                              resetFeedback()
                            }}
                            placeholder="Codice"
                            className={inputCls}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 px-1">
                    <div className="text-[13px] md:text-[14px] font-serif opacity-80">
                      {nights > 0 ? (
                        <span>
                          Soggiorno: <strong>{nights}</strong> notti
                        </span>
                      ) : (
                        <span>Inserisci le date per calcolare il soggiorno.</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-6 border-t border-[var(--cream)]">
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="
                          group inline-flex items-center justify-center gap-2
                          min-h-[54px] w-full sm:w-auto
                          px-6 py-3
                          rounded-sm border border-[var(--cream)]
                          bg-transparent text-[var(--brown)]
                          font-serif text-[16px]
                          transition-all duration-200
                          hover:bg-[var(--cream)] hover:shadow-sm
                          active:scale-[0.99]
                        "
                        aria-label="Chiudi il form"
                      >
                        <X
                          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90"
                          aria-hidden="true"
                        />
                        <span>Chiudi form</span>
                      </button>

                      <button
                        type="button"
                        onClick={sendEmail}
                        disabled={!canSend || !!dateError}
                        className={`group inline-flex items-center justify-center gap-3
                          min-h-[54px] w-full sm:w-auto
                          px-7 py-3
                          rounded-sm border-2
                          font-serif text-[17px]
                          transition-all duration-200 shadow-sm
                          ${
                            !canSend || !!dateError
                              ? 'bg-transparent text-[var(--brown)] border-[var(--cream)] opacity-60 cursor-not-allowed'
                              : 'bg-[var(--sienna)] text-[var(--paper)] border-[var(--sienna)] hover:opacity-95 hover:shadow-md active:scale-[0.99]'
                          }`}
                        aria-label="Invia la richiesta di disponibilità"
                      >
                        <Mail
                          className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-[1px]"
                          aria-hidden="true"
                        />
                        <span>{sending ? 'Invio in corso...' : 'Invia richiesta'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {sentOk === true && (
                <div className="mt-8 pt-6 border-t border-[var(--cream)] flex justify-center">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="
                      group inline-flex items-center justify-center gap-3
                      min-h-[56px]
                      px-8 py-3
                      rounded-sm border-2 border-[var(--sienna)]
                      bg-[var(--sienna)] text-[var(--paper)]
                      font-serif text-[17px]
                      shadow-sm transition-all duration-200
                      hover:opacity-95 hover:shadow-md
                      active:scale-[0.99]
                    "
                    aria-label="Chiudi il form e torna al sito"
                  >
                    <X
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90"
                      aria-hidden="true"
                    />
                    <span>Chiudi e torna al sito</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
