import React, { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { OliveBranch } from './DecorativeElements'
import { Calendar, Mail, Users, Phone, AtSign, X, ArrowRight } from 'lucide-react'

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
  const [sending, setSending] = useState(false)
  const [sentOk, setSentOk] = useState<null | boolean>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

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
    setFullName('')
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
        checkin: checkIn,
        checkout: checkOut,
        nights: String(nights),
        adults: String(adults),
        children: String(children),
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

  const labelCls =
    'block text-[11px] md:text-[12px] font-serif mb-1 text-[var(--brown)]/85'
  const inputCls =
    'w-full h-[42px] md:h-[44px] border border-[#e7dccb] bg-[#fbf7f0] px-3 py-2 font-serif text-[15px] text-[var(--brown)] rounded-none outline-none focus:border-[var(--sienna)] focus:ring-1 focus:ring-[var(--sienna)]'
  const smallInputWrap = 'flex items-center gap-2'
  const iconCls = 'w-4 h-4 text-[var(--brown)]/50 shrink-0'

  return (
    <section
      id="booking"
      className="py-20 px-4 bg-[var(--sienna)] relative overflow-hidden text-[var(--paper)] scroll-mt-24"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <OliveBranch className="w-full h-full object-cover text-white transform scale-150 opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-script text-5xl md:text-7xl mb-4 text-[var(--cream)]">
            Prenota il Tuo Soggiorno
          </h2>
          <p className="font-serif text-xl md:text-2xl text-[var(--paper)] opacity-90">
            Richiesta disponibilità diretta
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-[340px] md:max-w-[360px]">
            <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[rgba(120,84,58,0.18)] bg-[#efe6d7]" />

            <div className="relative bg-[#f7f1e6] border border-[#dccfbf] shadow-[0_12px_35px_rgba(74,43,24,0.14)] px-4 pt-10 pb-4 md:px-5">
              <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                <div className="h-[56px] w-[56px] rounded-full bg-[var(--sienna)] text-[var(--paper)] border-4 border-[#f7f1e6] flex items-center justify-center text-[9px] font-serif uppercase tracking-[0.12em] text-center leading-tight shadow-sm">
                  Direct
                  <br />
                  Booking
                </div>
              </div>

              <div className="absolute inset-2 pointer-events-none border border-[rgba(160,132,102,0.18)]" />

              <div className="relative space-y-3">
                {(sentOk === true || sentOk === false || errorMsg) && (
                  <div
                    className={`p-2 border font-serif text-[12px] leading-snug ${
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
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Check-In</label>
                        <div className={smallInputWrap}>
                          <Calendar className={iconCls} aria-hidden="true" />
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
                      </div>

                      <div>
                        <label className={labelCls}>Check-Out</label>
                        <div className={smallInputWrap}>
                          <Calendar className={iconCls} aria-hidden="true" />
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
                    </div>

                    {dateError && (
                      <p className="text-[11px] font-serif text-red-700 -mt-1">
                        {dateError}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Adulti</label>
                        <div className={smallInputWrap}>
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
                        <div className={smallInputWrap}>
                          <Users className={iconCls} aria-hidden="true" />
                          <input
                            type="number"
                            min={0}
                            value={children}
                            onChange={(e) => {
                              setChildren(Math.max(0, Number(e.target.value || 0)))
                              resetFeedback()
                            }}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Nome Completo</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value)
                          resetFeedback()
                        }}
                        placeholder="Alessandro Rossi"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Email / Telefono</label>
                      <div className="space-y-2">
                        <div className={smallInputWrap}>
                          <AtSign className={iconCls} aria-hidden="true" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              resetFeedback()
                            }}
                            placeholder="a.rossi@email.it"
                            className={inputCls}
                          />
                        </div>

                        <div className={smallInputWrap}>
                          <Phone className={iconCls} aria-hidden="true" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value)
                              resetFeedback()
                            }}
                            placeholder="+39 347 123 4567"
                            className={inputCls}
                            inputMode="tel"
                          />
                        </div>
                      </div>

                      {email.trim().length > 0 && !isEmailValid && (
                        <p className="mt-1 text-[11px] text-red-700 font-serif">
                          Email non valida.
                        </p>
                      )}

                      {phone.trim().length > 0 && !isPhoneValid && (
                        <p className="mt-1 text-[11px] text-red-700 font-serif">
                          Numero non valido.
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center pt-1">
                      <div className="px-4 py-1.5 rounded-full border border-[#d5c6b2] bg-[#efe7da] text-[11px] font-serif uppercase tracking-[0.08em] text-[var(--brown)]">
                        {nights > 0 ? `Totale: ${nights} notti` : 'Totale: - notti'}
                      </div>
                    </div>

                    <div className="pt-1 space-y-2">
                      <button
                        type="button"
                        onClick={sendEmail}
                        disabled={!canSend || !!dateError}
                        className={`group w-full h-[46px] flex items-center justify-center gap-2 font-serif text-[15px] uppercase tracking-[0.08em] transition-all ${
                          !canSend || !!dateError
                            ? 'bg-[#c8b19e] text-white/80 cursor-not-allowed'
                            : 'bg-[var(--sienna)] text-[var(--paper)] hover:opacity-95'
                        }`}
                        aria-label="Invia richiesta"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        <span>{sending ? 'Invio...' : 'Invia Richiesta'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[2px]" aria-hidden="true" />
                      </button>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-[#d9cbb9] bg-[#f5eee3] text-[var(--brown)] font-serif text-[12px] rounded-full hover:bg-[#efe5d6] transition-colors"
                          aria-label="Chiudi form"
                        >
                          <X className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Chiudi Form</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {sentOk === true && (
                  <div className="pt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-[#d9cbb9] bg-[#f5eee3] text-[var(--brown)] font-serif text-[12px] rounded-full hover:bg-[#efe5d6] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Chiudi Form</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm opacity-65 font-serif tracking-wide">
          Best Price Guaranteed • Minimum stay 3 nights
        </p>
      </div>
    </section>
  )
}
