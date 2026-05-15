import React, { useEffect, useState } from 'react';
import { Quote, ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

type Review = {
  source: 'Airbnb' | 'Booking' | 'Google';
  text: string;
  author: string;
  from: string;
  rating: number;
  avatar?: string;
  photo?: string;
  photoAlt?: string;
};

export function Testimonials() {
  const bookingReviewsUrl =
    'https://www.booking.com/hotel/it/masseria-della-pace-nadir-amp-zenit-apartments.it.html?aid=2311236&label=it-it-booking-desktop-VRZD0IC5lt9Ulq%2AajTZ_bgS652829000338%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp1008463%3Ali%3Adec%3Adm&sid=8059266fdbb662c4b4890577f7bb1c20&all_sr_blocks=1254666602_397981772_2_0_0&checkin=2025-08-01&checkout=2025-08-17&dest_id=-122100&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1254666602_397981772_2_0_0&hpos=1&matching_block_id=1254666602_397981772_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1254666602_397981772_2_0_0__799689&srepoch=1742209379&srpvid=2a544dac788700dd&type=total&ucfs=1#tab-reviews';

  const airbnbReviewsUrl = 'https://www.airbnb.it/rooms/1604403343972959495';
  const googleReviewsUrl = 'https://www.google.com/search?q=WaCa%20-%20Apulian%20Villa%20Reviews';

  const reviews: Review[] = [
    {
      source: 'Airbnb',
      text:
        'Un posto bellissimo in un uliveto, che permette di rilassarsi completamente lontano dalla folla e dal turismo di massa. È stato meraviglioso rilassarsi in campagna, accompagnati da cicale, il fruscio delle foglie e il profumo mediterraneo. C’è una buona connessione nei dintorni: ci sono sette minuti di macchina dal centro storico, 12 minuti da Polignano e 16 minuti da Monopoli.',
      author: 'Piotr',
      from: 'Airbnb • luglio 2025',
      rating: 5,
      avatar: 'P',
      photo: '/reviews/piotr.jpg',
      photoAlt: 'Piotr',
    },
    {
      source: 'Airbnb',
      text:
        'Il soggiorno è stato fantastico: la piscina con il giardino è semplicemente fantastica.',
      author: 'Fabio',
      from: 'Airbnb • giugno 2025',
      rating: 5,
      avatar: 'F',
      photo: '/reviews/fabio.jpg',
      photoAlt: 'Fabio',
    },
    {
      source: 'Airbnb',
      text:
        'Abbiamo alloggiato per una settimana in questa struttura e non c’era mai capitato di trovare una cosa così accurata e confortevole. La location ci ha consentito il puro relax continuo.',
      author: 'Francesco',
      from: 'Airbnb • agosto 2024',
      rating: 5,
      avatar: 'F',
      photo: '/reviews/francesco.jpg',
      photoAlt: 'Francesco',
    },
    {
      source: 'Airbnb',
      text:
        'Ottimo alloggio in un ambiente tranquillo!',
      author: 'Dong-Min',
      from: 'Airbnb • 3 settimane fa',
      rating: 5,
      avatar: 'D',
      photo: '/reviews/dongmin.jpg',
      photoAlt: 'Dong-Min',
    },
    {
      source: 'Airbnb',
      text:
        'Abbiamo trascorso un ottimo soggiorno nella casa. L’host è stato estremamente accogliente, molto attento e sempre disponibile.',
      author: 'Dilan',
      from: 'Airbnb • agosto 2025',
      rating: 5,
      avatar: 'D',
      photo: '/reviews/dilan.jpg',
      photoAlt: 'Dilan',
    },
    {
      source: 'Airbnb',
      text:
        'Casa così come nelle foto, fornita di tutti i servizi elencati, posizione strategica per raggiungere varie località della Puglia, giardino e piscina in ottime condizioni.',
      author: 'Pasquale',
      from: 'Airbnb • agosto 2025',
      rating: 5,
      avatar: 'P',
      photo: '/reviews/pasquale.jpg',
      photoAlt: 'Pasquale',
    },
    {
      source: 'Airbnb',
      text:
        'Ottimo alloggio come base per visitare la Puglia, la nostra famiglia ha apprezzato la piscina e l’uliveto.',
      author: 'Riina',
      from: 'Airbnb • giugno 2025',
      rating: 5,
      avatar: 'R',
      photo: '/reviews/riina.jpg',
      photoAlt: 'Riina',
    },
    {
      source: 'Airbnb',
      text:
        'Tutto è stato fantastico, ci siamo trovati benissimo. La posizione è proprio come nelle foto, molto pulita e spaziosa.',
      author: 'Lidia',
      from: 'Airbnb • giugno 2025',
      rating: 5,
      avatar: 'L',
    },
    {
      source: 'Booking',
      text:
        'We had an amazing stay at this beautiful apartment set in the midst of olive groves. The location is incredibly peaceful and quiet, perfect for relaxation.',
      author: 'Maja',
      from: 'Booking • settembre 2024',
      rating: 10,
      avatar: 'M',
      photo: '/reviews/maja.jpg',
      photoAlt: 'Maja',
    },
    {
      source: 'Booking',
      text:
        'Nous avons passé un super moment. Nous reviendrons certainement dans ce logement la prochaine fois ! La tranquillité, la propreté, la situation.',
      author: 'Christelle',
      from: 'Booking • settembre 2025',
      rating: 10,
      avatar: 'C',
      photo: '/reviews/christelle.jpg',
      photoAlt: 'Christelle',
    },
    {
      source: 'Google',
      text:
        'La pace dei sensi. L’estrema pace la connessione con la natura. La cordialità eccessiva dei proprietari.',
      author: 'Colamonico',
      from: 'Google • giugno 2025',
      rating: 5,
      avatar: 'C',
      photo: '/reviews/colamonico.jpg',
      photoAlt: 'Colamonico',
    },
    {
      source: 'Google',
      text:
        'Oasi di pace e relax totale. Cura dei dettagli, sia interno casa che esterno. Gentilezza e professionalità dei proprietari.',
      author: 'Nerina',
      from: 'Google • settembre 2024',
      rating: 5,
      avatar: 'N',
      photo: '/reviews/nerina.jpg',
      photoAlt: 'Nerina',
    },
  ];

  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const speed = 0.35;

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    const tick = () => {
      setOffset((prev) => (prev - speed) % 50);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const renderStars = (rating: number, source: Review['source']) => {
    const label = source === 'Booking' ? `${rating}/10` : `${rating}/5`;
    const stars = source === 'Booking' ? 5 : rating;

    return (
      <div className="flex items-center gap-2 mt-3">
        <div className="flex gap-1 text-[var(--sienna)] text-xs">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < stars ? '★' : '☆'}</span>
          ))}
        </div>
        <span className="text-xs uppercase tracking-widest text-[var(--brown)] opacity-60">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 bg-paper-texture-dark overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[var(--brown)] mb-2">
            Parole degli Ospiti
          </h2>
          <p className="font-script text-2xl text-[var(--sienna)]">
            Words from our Guests
          </p>

          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <a
              href={bookingReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-serif text-sm md:text-base text-[var(--brown)]">
                Recensioni su <strong>Booking.com</strong>
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>

            <a
              href={airbnbReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-serif text-sm md:text-base text-[var(--brown)]">
                Recensioni su <strong>Airbnb</strong>
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-serif text-sm md:text-base text-[var(--brown)]">
                Recensioni su <strong>Google</strong>
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>
          </div>

          <p className="mt-4 text-xs text-[var(--brown)] opacity-60 uppercase tracking-widest font-serif">
            Verified reviews • Opens in a new tab
          </p>
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-8 w-max"
            style={{ transform: `translateX(${offset}%)` }}
          >
            {[...reviews, ...reviews].map((review, idx) => (
              <article
                key={idx}
                className="w-[380px] min-h-[420px] bg-[var(--paper)] p-8 shadow-sm border border-[var(--cream)] relative flex-shrink-0"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[var(--sage)]/20 flex items-center justify-center shrink-0">
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt={review.photoAlt || review.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-serif text-xl text-[var(--brown)]">
                        {review.avatar ?? review.author[0]}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-[var(--brown)] text-lg leading-tight">
                      {review.author}
                    </p>
                    <p className="text-sm text-[var(--brown)] opacity-60">
                      {review.from}
                    </p>
                    <p className="mt-1 inline-flex items-center rounded-full border border-[var(--cream)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--sienna)]">
                      {review.source}
                    </p>
                  </div>
                </div>

                <Quote className="w-10 h-10 text-[var(--sage)] opacity-35 mb-4" />

                <p className="font-serif text-lg text-[var(--brown)] italic leading-relaxed">
                  “{review.text}”
                </p>

                <div className="border-t border-[var(--sage)] border-opacity-30 pt-4 mt-6">
                  {renderStars(review.rating, review.source)}
                </div>

                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--sage)] opacity-25" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--sage)] opacity-25" />
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-4 py-2 text-[var(--brown)] shadow-sm"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {paused ? 'Riprendi' : 'Pausa'}
          </button>
          <span className="text-xs uppercase tracking-widest text-[var(--brown)] opacity-60">
            Scorrimento da destra verso sinistra
          </span>
        </div>
      </div>
    </section>
  );
}
}
