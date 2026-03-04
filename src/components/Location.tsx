import React from 'react'
import { DecorativeBorder } from './DecorativeElements'
import { MapPin, Compass, Sun } from 'lucide-react'

export function Location() {
  const places = [
    {
      name: 'Monopoli',
      minutes: '10 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637894/Monopoli-2_sf8xiz.jpg'
    },
    {
      name: 'Capitolo',
      minutes: '5 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637897/Capitolo_lpgnz6.jpg'
    },
    {
      name: 'Alberobello',
      minutes: '20 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637897/alberobello_uhle1w.webp'
    },
    {
      name: 'Castellana Grotte',
      minutes: '20 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637897/Castellanagrotte_frxiif.avif'
    },
    {
      name: 'Polignano a Mare',
      minutes: '15 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637896/polignano_kephny.jpg'
    },
    {
      name: 'Cisternino',
      minutes: '18 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637894/masseria-cisternino_vgf5rf.jpg'
    },
    {
      name: 'Savelletri',
      minutes: '8 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637894/Savelletri_Fasano_xcdg9d.jpg'
    },
    {
      name: 'Ostuni',
      minutes: '25 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637896/ostuni-mura_ja0wuu.jpg'
    },
    {
      name: 'Bari',
      minutes: '35 min',
      img: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637895/bari_v7vhei.jpg'
    }
  ] as const

  const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg', '-2.5deg', '1.8deg', '-1.2deg'] as const

  return (
    <section className="py-20 px-4 bg-paper-texture overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-[var(--brown)] mb-4">Dove Siamo</h2>
          <p className="font-script text-2xl text-[var(--sienna)]">Where We Are</p>
          <DecorativeBorder className="w-48 mx-auto mt-6 text-[var(--sage)]" />
        </div>

        <div className="relative bg-[#FDFBF7] p-8 md:p-12 border border-[#E8E1D5] shadow-lg max-w-4xl mx-auto transform rotate-1">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Testo sinistra */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-[var(--sienna)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-2xl text-[var(--brown)] mb-2">Monopoli, Puglia</h3>
                  <p className="text-[var(--brown)] opacity-80 leading-relaxed">
                    Located in the countryside among centuries-old olive trees, WaCa Apulian Villa is just a few
                    minutes from the crystal-clear waters of the Adriatic Sea and the historic center of Monopoli.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Compass className="w-8 h-8 text-[var(--sienna)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-2xl text-[var(--brown)] mb-2">Nei Dintorni</h3>
                  <ul className="space-y-2 text-[var(--brown)] opacity-80">
                    <li>• Polignano a Mare (15 min)</li>
                    <li>• Alberobello (20 min)</li>
                    <li>• Ostuni (25 min)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Sun className="w-8 h-8 text-[var(--sienna)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-2xl text-[var(--brown)] mb-2">Il Territorio</h3>
                  <p className="text-[var(--brown)] opacity-80 text-[16px]">
                    Discover the Itria Valley, savor the local cuisine, and experience authentic Apulian hospitality
                    among the sea, historic villages, and golden sunsets.
                  </p>
                </div>
              </div>
            </div>

            {/* Immagine Monopoli (aggiornata) */}
            <div className="relative aspect-square rounded-sm overflow-hidden border-2 border-[var(--cream)] shadow-md">
              <img
                src="https://res.cloudinary.com/dfu9nzn8r/image/upload/v1772637894/Monopoli-2_sf8xiz.jpg"
                alt="Monopoli"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Etichetta cartolina */}
              <div className="absolute bottom-4 right-4 bg-[var(--paper)] px-4 py-2 shadow-sm rotate-2">
                <span className="font-script text-xl text-[var(--brown)] italic">Monopoli 10 min</span>
              </div>
            </div>
          </div>

          {/* GALLERY LUOGHI (ruotata come in gallery) */}
          <div className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((p, idx) => (
                <div
                  key={p.name}
                  className="relative bg-[#FDFBF7] border border-[#E8E1D5] shadow-md overflow-hidden"
                  style={{ transform: `rotate(${rotations[idx % rotations.length]})` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute bottom-3 right-3 bg-[var(--paper)] px-3 py-1 shadow-sm rotate-2">
                      <span className="font-script text-lg text-[var(--brown)] italic">
                        {p.name} {p.minutes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAPPA (Place embed reale) */}
          <div className="mt-10">
            <div className="relative w-full rounded-sm overflow-hidden border-2 border-[var(--cream)] shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.2908956382284!2d17.319634575506402!3d40.865489928205655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13464b026914d4ed%3A0x3ff4af9b3f47ba2f!2sWaCa%20-%20Apulian%20Villa!5e0!3m2!1sit!2sit!4v1772031290686!5m2!1sit!2sit"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WaCa - Apulian Villa su Google Maps"
              />
            </div>

            <p className="mt-4 text-sm text-[var(--brown)] opacity-70">
              Indirizzo: Contrada Vagone, 329/F, 70043 Monopoli (BA)
            </p>
          </div>

          {/* Timbro decorativo */}
          <div className="absolute top-4 right-4 w-24 h-24 border border-[var(--sienna)] opacity-20 rounded-full flex items-center justify-center transform rotate-12">
            <span className="text-xs uppercase tracking-widest text-[var(--sienna)]">Puglia</span>
          </div>
        </div>
      </div>
    </section>
  )
}
