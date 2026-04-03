import React, { useEffect, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { OliveBranch } from './DecorativeElements'
import { Calendar, Mail, Users, Phone, AtSign, X, Tag } from 'lucide-react'

const EMAILJS_SERVICE_ID = 'service_udnxwt2'
const EMAILJS_TEMPLATE_ID = 'template_72hewse'
const EMAILJS_PUBLIC_KEY = '8lE8ILbaH1QxsXjFJ'

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

    const syncViewportHeight = () => {
      document.documentElement.style.setProperty('--app-vh', `${window.innerHeight}px`)
    }

    syncViewportHeight()
    window.addEventListener('resize', syncViewportHeight)
    window.addEventListener('orientationchange', syncViewportHeight)

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyPosition = document.body.style.position
    const previousBodyWidth = document.body.style.width
    const scrollY = window.scrollY

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.position = previousBodyPosition
      document.body.style.width = previousBodyWidth
      const top = document.body.style.top
      document.body.style.top = ''
      window.scrollTo(0, Math.abs(parseInt(top || '0', 10)) || scrollY)

      window.removeEventListener('resize', syncViewportHeight)
      window.removeEventListener('orientationchange', syncViewportHeight)
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
            className="border-2 border-[var(--paper)] text-[var(--paper)] px-10 py-5 rounded-sm font-serif text-xl flex items-center gap-3 hover:bg-[var(--paper)] hover:text-[var(--sienna)] transition-all"
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
            className="fixed inset-0 z-[9999]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            style={{ height: 'var(--app-vh, 100dvh)' }}
          >
            <div className="absolute inset-0 bg-black/55" onClick={closeModal} />

            <div className="absolute inset-0 md:flex md:items-center md:justify-center md:p-4">
              <div
                className="
                  absolute inset-x-0 top-0 bottom-0
                  md:relative md:inset-auto md:w-full md:max-w-md md:max-h-[90vh]
                  bg-[var(--paper)] text-[var(--brown)]
                  md:border 
