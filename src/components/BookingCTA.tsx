import React, { useEffect, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { OliveBranch } from './DecorativeElements'
import { Calendar, Mail, Users, Phone, AtSign, X, Tag, MessageCircle } from 'lucide-react'

/**
 * EmailJS config
 */
const EMAILJS_SERVICE_ID = 'service_udnxwt2'
const EMAILJS_TEMPLATE_ID = 'template_72hewse'
const EMAILJS_PUBLIC_KEY = '8lE8ILbaH1QxsXjFJ'

/**
 * Google Ads conversion label
 */
const GOOGLE_ADS_SEND_TO = 'AW-17975995747/pl2CCPyc1f4bEOPaz_tC'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

function gtag_report_conversion(url?: string) {
  const callback = function () {
    if (typeof url !== 'undefined') window.location.href = url
  }

  try {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_SEND_TO,
        value: 1.0,
        currency: 'EUR',
        event_callback: callback,
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

  useEffect(() => {
    if (!open) return

    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVh()
    window.addEventListener('resize', setVh)
    window.addEventListener('orientationchange', setVh)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('resize', setVh)
      window.removeEventListener('orientationchange', setVh)
    }
  }, [open])

  const isEmailValid =
    email.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const isPhoneValid = phone.trim().length === 0 || phone.trim().length >= 6

  const hasAtLeastOneContact =
    (email.trim().length > 0 && isEmailValid) || (phone.trim().length > 0 && isPhoneValid)

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

  const closeModal = () => setOpen(false)

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
    } catch (err: any) {
      setSentOk(false)
      setErrorMsg(
        'Si è verificato un problema temporaneo nell’invio della richiesta. Ti consigliamo di contattarci via WhatsApp nella sezione Contact Us.'
      )
    } finally {
      setSending(false)
    }
  }

  const labelCls = 'block text-[11px] font-serif mb-1 opacity-80'
  const inputCls =
    'w-full min-h-[44px] border border-[var(--cream)] bg-white px-3 py-2 font-serif text-base leading-tight rounded-sm'
  const iconWrap = 'flex items-center gap-2'
  const iconCls = 'w-4 h-4 opacity-60 shrink-0'

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
            className="min-h-[52px] border-2 border-[var(--paper)] text-[var(--paper)] px-10 py-5 rounded-sm font-serif text-xl flex items-center gap-3 hover:bg-[var(--paper)] hover:text-[var(--sienna)] transition-all"
          >
            <Calendar className="w-6 h-6" />
            <span>Check Availability</span>
          </button>
        </div>

        <p className="mt-8 text-sm opacity-60 font-serif uppercase tracking-widest">
          Minimum stay: 3 nights • Best Price Guaranteed
        </p>

        {open && (
          <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
          >
            <div className="absolute inset-0 bg-black/55" onClick={closeModal} />

            <div
              className="absolute inset-0 flex items-end md:items-center justify-center"
              style={{
                paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
                paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
              }}
            >
              <div
                className="
                  relative w-full md:max-w-md
                  h-[92vh] md:h-auto md:max-h-[90vh]
                  bg-[var(--paper)] text-[var(--brown)]
                  border border-[var(--cream)] shadow-2xl
                  rounded-t-2xl md:rounded-sm
                  overflow-hidden flex flex-col
                "
                style={{ maxHeight: '100dvh' }}
              >
                <div className="px-4 py-3 border-b border-[var(--cream)] bg-[var(--paper)] flex items-center justify-between gap-3 shrink-0">
                  <div className="text-left min-w-0">
                    <div
                      id="booking-modal-title"
                      className="font-serif text-sm leading-tight"
                    >
                      Richiesta disponibilità
                    </div>
                    <div className="font-serif text-[11px] opacity-70 leading-tight">
                      Compila e invia in meno di 1 minuto
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center border border-[var(--cream)] hover:bg-[var(--cream)] transition-colors"
                    aria-label="Chiudi"
                    title="Chiudi"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="px-4 py-4 overflow-y-auto flex-1 min-h-0">
                  {(sentOk === true || sentOk === false || errorMsg) && (
                    <div
                      className={`mb-3 p-3 border font-serif text-[13px] leading-snug rounded-sm ${
                        sentOk
                          ? 'border-green-300 bg-green-50 text-green-900'
                          : 'border-red-200 bg-red-50 text-red-900'
                      }`}
                    >
                      {sentOk === true && (
                        <div>✅ Richiesta inviata correttamente. Ti rispondiamo a breve.</div>
                      )}

                      {sentOk === false && (
                        <div className="space-y-2">
                          <div>❌ {errorMsg}</div>
                          <div className="text-[12px] opacity-90">
                            In alternativa, scrivici su WhatsApp dalla sezione Contact Us.
                          </div>
                        </div>
                      )}

                      {sentOk === null && errorMsg && <div>⚠️ {errorMsg}</div>}
                    </div>
                  )}

                  {!sentOk && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
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
                        <p className="text-[12px] font-serif text-red-700 leading-tight -mt-2">
                          {dateError}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Adulti</label>
                          <div className={iconWrap}>
                            <Users className={iconCls} />
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
                            <Users className={iconCls} />
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
                        <div>
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

                      <div>
                        <label className={labelCls}>Nome e Cognome</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value)
                            resetFeedback()
                          }}
                          placeholder="Nome Cognome"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>Cellulare</label>
                        <div className={iconWrap}>
                          <Phone className={iconCls} />
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
                          <p className="mt-1 text-[11px] text-red-700 font-serif leading-tight">
                            Numero non valido.
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={labelCls}>Email</label>
                        <div className={iconWrap}>
                          <AtSign className={iconCls} />
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
                          <p className="mt-1 text-[11px] text-red-700 font-serif leading-tight">
                            Email non valida.
                          </p>
                        )}
                        <p className="mt-1 text-[11px] font-serif opacity-65 leading-tight">
                          Inserisci almeno email o cellulare.
                        </p>
                      </div>

                      <div>
                        {!showDiscount ? (
                          <button
                            type="button"
                            onClick={() => setShowDiscount(true)}
                            className="text-sm font-serif underline underline-offset-4 opacity-80 hover:opacity-100"
                          >
                            Hai un codice sconto?
                          </button>
                        ) : (
                          <div>
                            <label className={labelCls}>Codice sconto</label>
                            <div className={iconWrap}>
                              <Tag className={iconCls} />
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

                      <div className="pt-1 text-[12px] font-serif opacity-75 text-left leading-tight">
                        {nights > 0 ? (
                          <span>
                            Soggiorno: <strong>{nights}</strong> notti
                          </span>
                        ) : (
                          <span>Inserisci le date per calcolare il soggiorno.</span>
                        )}
                      </div>
                    </div>
                  )}

                  {sentOk === true && (
                    <div className="py-6 text-left space-y-3">
                      <p className="font-serif text-sm leading-relaxed">
                        Abbiamo ricevuto la tua richiesta di disponibilità.
                      </p>
                      <p className="font-serif text-sm leading-relaxed opacity-80">
                        Il nostro team ti risponderà al più presto con conferma e tariffa.
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className="px-4 py-3 border-t border-[var(--cream)] bg-[var(--paper)] flex items-center justify-between gap-2 shrink-0"
                  style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
                >
                  {sentOk === true ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          closeModal()
                          setTimeout(() => resetForm(), 200)
                        }}
                        className="px-4 py-3 border border-[var(--cream)] font-serif text-sm hover:bg-[var(--cream)] transition-colors min-h-[44px]"
                      >
                        Chiudi
                      </button>

                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm font-serif text-sm border-2 bg-[var(--sienna)] text-[var(--paper)] border-[var(--sienna)] hover:opacity-90 min-h-[44px]"
                      >
                        Nuova richiesta
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-3 border border-[var(--cream)] font-serif text-sm hover:bg-[var(--cream)] transition-colors min-h-[44px]"
                      >
                        Chiudi
                      </button>

                      <button
                        type="button"
                        onClick={sendEmail}
                        disabled={!canSend || !!dateError}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm font-serif text-sm border-2 min-h-[44px] transition-all ${
                          !canSend || !!dateError
                            ? 'bg-transparent text-[var(--brown)] border-[var(--cream)] opacity-60 cursor-not-allowed'
                            : 'bg-[var(--sienna)] text-[var(--paper)] border-[var(--sienna)] hover:opacity-90'
                        }`}
                      >
                        {sentOk === false ? (
                          <MessageCircle className="w-4 h-4" />
                        ) : (
                          <Mail className="w-4 h-4" />
                        )}
                        <span>{sending ? 'Invio...' : 'Invia richiesta'}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
