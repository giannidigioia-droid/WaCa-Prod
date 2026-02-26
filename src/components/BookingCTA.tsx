import React, { useEffect, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { OliveBranch } from './DecorativeElements'
import { Calendar, Mail, Users, Phone, AtSign, X } from 'lucide-react'

/**
 * EmailJS config (your real values)
 */
const EMAILJS_SERVICE_ID = 'service_udnxwt2'
const EMAILJS_TEMPLATE_ID = 'template_72hewse'
const EMAILJS_PUBLIC_KEY = '8lE8ILbaH1QxsXjFJ'

/**
 * Google Ads conversion label (from Google Ads)
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
  const [errorMsg, setErrorMsg] = useState<string>('')

  // Form fields
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [childrenAges, setChildrenAges] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // ✅ iOS-safe viewport height + lock background scroll
  useEffect(() => {
    if (!open) return
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      // ✅ FIX: string template must use backticks
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setVh()
    window.addEventListener('resize', setVh)
    window.addEventListener('orientationchange', setVh)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('resize', setVh)
      window.removeEventListener('orientationchange', setVh)
    }
  }, [open])

  const isEmailValid =
    email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const isPhoneValid = phone.trim().length > 0 && phone.trim().length >= 6

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
    isEmailValid &&
    isPhoneValid &&
    !sending

  const resetFeedback = () => {
    setSentOk(null)
    setErrorMsg('')
  }

  const closeModal = () => setOpen(false)

  const sendEmail = async () => {
    resetFeedback()
    if (!canSend) {
      setErrorMsg(
        dateError ||
          'Compila tutti i campi richiesti (nome, date, ospiti, età ragazzi se presenti, email e cellulare).'
      )
      return
    }

    setSending(true)
    try {
      const templateParams = {
        title: 'Richiesta disponibilità WaCa',
        name: fullName.trim() || 'Ospite WaCa',
        checkin: checkIn,
        checkout: checkOut,
        nights: String(nights),
        adults: String(adults),
        children: String(children),
        ages: children > 0 ? childrenAges : '-',
        email: email.trim(),
        phone: phone.trim(),
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      // ✅ Fire conversion ONLY on success
      gtag_report_conversion()

      setSentOk(true)
    } catch (err: any) {
      setSentOk(false)
      setErrorMsg('Errore invio richiesta. Riprova tra poco.')
    } finally {
      setSending(false)
    }
  }

  // small shared classes (compact)
  const labelCls = 'block text-[11px] font-serif mb-1 opacity-80'
  const inputCls =
    'w-full border border-[var(--cream)] bg-white px-3 py-2 font-serif text-sm leading-tight'
  const iconWrap = 'flex items-center gap-2'
  const iconCls = 'w-4 h-4 opacity-60 shrink-0'

  return (
    <section
      id="booking"
      className="py-24 px-4 bg-[var(--sienna)] relative overflow-hidden text-[var(--paper)] scroll-mt-24"
    >
      {/* Background pattern */}
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
          Inserisci le date e i dettagli: invieremo la richiesta direttamente via
          email per disponibilità e miglior tariffa garantita.
        </p>

        {/* Single CTA */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              resetFeedback()
              setOpen(true)
            }}
            className="border-2 border-[var(--paper)] text-[var(--paper)] px-10 py-5 rounded-sm font-serif text-xl flex items-center gap-3 hover:bg-[var(--paper)] hover:text-[var(--sienna)] transition-all"
          >
            <Calendar className="w-6 h-6" />
            <span>Check Availability</span>
          </button>
        </div>

        <p className="mt-8 text-sm opacity-60 font-serif uppercase tracking-widest">
          Minimum stay: 3 nights • Best Price Guaranteed
        </p>

        {/* Modal */}
        {open && (
          <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/55" onClick={closeModal} />

            {/* Compact card */}
            <div
              className="absolute inset-0 flex items-center justify-center p-3"
              style={{
                paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
                paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
              }}
            >
              <div className="relative w-full max-w-md bg-[var(--paper)] text-[var(--brown)] border border-[var(--cream)] shadow-2xl rounded-sm overflow-hidden">
                {/* Header */}
                <div className="px-3 py-2 border-b border-[var(--cream)] bg-[var(--paper)] flex items-center justify-between gap-2">
                  <div className="text-left min-w-0">
                    <div className="font-serif text-sm leading-tight">
                      Richiesta disponibilità
                    </div>
                    <div className="font-serif text-[11px] opacity-70 leading-tight">
                      Compila e invia (1 minuto)
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="shrink-0 p-2 border border-[var(--cream)] hover:bg-[var(--cream)] transition-colors"
                    aria-label="Chiudi"
                    title="Chiudi"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-3 py-3">
                  {(sentOk === true || sentOk === false || errorMsg) && (
                    <div
                      className={`mb-2 p-2 border font-serif text-[12px] leading-tight ${
                        sentOk
                          ? 'border-green-300 bg-green-50 text-green-900'
                          : 'border-red-200 bg-red-50 text-red-900'
                      }`}
                    >
                      {sentOk === true && <div>✅ Inviata! Ti rispondiamo a breve.</div>}
                      {sentOk === false && <div>❌ {errorMsg}</div>}
                      {sentOk === null && errorMsg && <div>⚠️ {errorMsg}</div>}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
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

                    {dateError && (
                      <div className="col-span-2 -mt-1">
                        <p className="text-[11px] font-serif text-red-700 leading-tight">
                          {dateError}
                        </p>
                      </div>
                    )}

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

                    {children > 0 && (
                      <div className="col-span-2">
                        <label className={labelCls}>Età ragazzi (es. 3, 7)</label>
                        <input
                          type="text"
                          value={childrenAges}
                          onChange={(e) => {
                            setChildrenAges(e.target.value)
                            resetFeedback()
                          }}
                          placeholder="3, 7, 15"
                          className={inputCls}
                        />
                      </div>
                    )}

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
                  </div>

                  <div className="mt-2 text-[11px] font-serif opacity-70 text-left leading-tight">
                    {nights > 0 ? (
                      <span>
                        Soggiorno: <strong>{nights}</strong> notti
                      </span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                </div>

                <div
                  className="px-3 py-2 border-t border-[var(--cream)] bg-[var(--paper)] flex items-center justify-between gap-2"
                  style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-[var(--cream)] font-serif text-sm hover:bg-[var(--cream)] transition-colors"
                  >
                    Chiudi
                  </button>

                  <button
                    type="button"
                    onClick={sendEmail}
                    disabled={!canSend || !!dateError}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm font-serif text-sm border-2 transition-all ${
                      !canSend || !!dateError
                        ? 'bg-transparent text-[var(--brown)] border-[var(--cream)] opacity-60 cursor-not-allowed'
                        : 'bg-[var(--sienna)] text-[var(--paper)] border-[var(--sienna)] hover:opacity-90'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{sending ? 'Invio...' : 'Invia'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
