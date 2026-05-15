import React, { useMemo } from 'react';
import { Quote, ExternalLink } from 'lucide-react';

type Review = {
  source: 'Airbnb' | 'Booking' | 'Google';
  name: string;
  date: string;
  text: string;
  location?: string;
  stay?: string;
  nights?: string;
  country?: string;
  yearsOnAirbnb?: string;
  rating: number;
};

export function Testimonials() {
  const bookingReviewsUrl =
    'https://www.booking.com/hotel/it/masseria-della-pace-nadir-amp-zenit-apartments.it.html?aid=2311236&label=it-it-booking-desktop-VRZD0IC5lt9Ulq%2AajTZ_bgS652829000338%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp1008463%3Ali%3Adec%3Adm&sid=8059266fdbb662c4b4890577f7bb1c20&all_sr_blocks=1254666602_397981772_2_0_0&checkin=2025-08-01&checkout=2025-08-17&dest_id=-122100&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1254666602_397981772_2_0_0&hpos=1&matching_block_id=1254666602_397981772_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1254666602_397981772_2_0_0__799689&srepoch=1742209379&srpvid=2a544dac788700dd&type=total&ucfs=1#tab-reviews';

  const airbnbReviewsUrl = 'https://www.airbnb.it/rooms/1604403343972959495';
  const googleReviewsUrl = 'https://www.google.com/search?q=WaCa%20-%20Apulian%20Villa%20Reviews';

  const reviews: Review[] = useMemo(
    () => [
      {
        source: 'Booking',
        name: 'Christelle',
        date: '15 settembre 2025',
        text:
          'Nous avons passé un super moment. Nous reviendrons certainement dans ce logement la prochaine fois ! Les propriétaires s sont adorables.',
        stay: 'Coppia',
        nights: '9 notti',
        country: 'Belgio',
        rating: 10,
      },
      {
        source: 'Google',
        name: 'Colamonico',
        date: 'giugno 2025',
        text: 'La pace dei sensi. L’estrema pace la connessione con la natura. La cordialità eccessiva dei proprietari.',
        stay: undefined,
        nights: undefined,
        country: 'Italia',
        rating: 5,
      },
      {
        source: 'Google',
        name: 'Nerina',
        date: 'settembre 2024',
        text:
          'Oasi di pace e relax totale. Cura dei dettagli, sia interno casa che esterno. Gentilezza e professionalità dei proprietari.',
        stay: undefined,
        nights: undefined,
        country: 'Italia',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Piotr',
        date: 'luglio 2025',
        text:
          'Un posto bellissimo in un uliveto, che permette di rilassarsi completamente lontano dalla folla e dal turismo di massa. È stato meraviglioso rilassarsi in campagna, accompagnati da cicale, il fruscio delle foglie e il profumo mediterraneo.',
        stay: 'Famiglia',
        nights: undefined,
        country: 'Polonia',
        yearsOnAirbnb: '3 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Fabio',
        date: 'giugno 2025',
        text:
          'Il soggiorno è stato fantastico! La piscina con il giardino è semplicemente fantastica.',
        stay: undefined,
        nights: undefined,
        country: 'Italia',
        yearsOnAirbnb: '9 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Francesco',
        date: 'agosto 2024',
        text:
          'Abbiamo alloggiato per una settimana in questa struttura e non c’era mai capitato di trovare una cosa così accurata e confortevole. La location ci ha consentito il puro relax continuo.',
        stay: 'Famiglia',
        nights: '7 notti',
        country: 'Italia',
        yearsOnAirbnb: '2 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Dong-Min',
        date: '3 settimane fa',
        text: 'Ottimo alloggio in un ambiente tranquillo!',
        stay: undefined,
        nights: undefined,
        country: 'Corea del Sud',
        yearsOnAirbnb: '4 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Dilan',
        date: 'agosto 2025',
        text:
          'Abbiamo trascorso un ottimo soggiorno nella casa! L’host è stato estremamente accogliente, molto attento e sempre disponibile.',
        stay: 'Famiglia',
        nights: undefined,
        country: 'Turchia',
        yearsOnAirbnb: '5 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Pasquale',
        date: 'agosto 2025',
        text:
          'Casa così come nelle foto, fornita di tutti i servizi elencati, posizione strategica per poter raggiungere varie località della Puglia, giardino e piscina in ottime condizioni.',
        stay: undefined,
        nights: undefined,
        country: 'Italia',
        yearsOnAirbnb: '4 mesi su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Riina',
        date: 'giugno 2025',
        text:
          'Ottimo alloggio come base per visitare la Puglia, la nostra famiglia ha apprezzato la piscina e l’uliveto.',
        stay: 'Famiglia',
        nights: undefined,
        country: 'Finlandia',
        yearsOnAirbnb: '10 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Lidia',
        date: 'giugno 2025',
        text:
          'Tutto è stato fantastico, ci siamo trovati benissimo. La posizione è proprio come nelle foto, molto pulita e spaziosa.',
        stay: undefined,
        nights: undefined,
        country: 'Romania',
        yearsOnAirbnb: '8 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Booking',
        name: 'Maja',
        date: '28 settembre 2024',
        text:
          'We had an amazing stay at this beautiful apartment set in the midst of olive groves. The location is incredibly peaceful and quiet, perfect for relaxation.',
        stay: 'Famiglia',
        nights: '5 notti',
        country: 'Slovenia',
        rating: 10,
      },
      {
        source: 'Booking',
        name: 'Rita',
        date: '3 ottobre 2025',
        text: 'Eccezionale. L’ospite non ha lasciato un commento.',
        stay: undefined,
        nights: '7 notti',
        country: 'Germania',
        rating: 10,
      },
      {
        source: 'Booking',
        name: 'Frida',
        date: 'luglio 2025',
        text:
          'Lovely family friendly place with great pool and welcoming hosts surrounded by old olive groves.',
        stay: 'Famiglia',
        nights: '7 notti',
        country: 'Finlandia',
        rating: 10,
      },
      {
        source: 'Booking',
        name: 'Christina',
        date: 'maggio 2025',
        text: 'Wunderschöne Ruheoase im Grünen',
        stay: 'Coppia',
        nights: '5 notti',
        country: 'Germania',
        rating: 9,
      },
      {
        source: 'Booking',
        name: 'Nerina',
        date: 'settembre 2024',
        text:
          'Cura dei dettagli, sia interno casa che esterno. Gentilezza e professionalità dei proprietari.',
        stay: 'Viaggiatore singolo',
        nights: '3 notti',
        country: 'Italia',
        rating: 9,
      },
      {
        source: 'Google',
        name: 'Maura',
        date: 'settembre 2024',
        text:
          'Siamo tornati da poco da questo posto meraviglioso. La casa è immersa in un uliveto secolare, fatta di calma e silenzio. Da tornare assolutamente.',
        stay: undefined,
        nights: undefined,
        country: 'Italia',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Stephanie',
        date: 'luglio 2025',
        text:
          'Un appartamento semplice ma molto speciale nel bel giardino. La piscina e le aree esterne sono molto speciali ed è stato un vero piacere trascorrere del tempo qui.',
        stay: undefined,
        nights: undefined,
        country: 'Germania',
        yearsOnAirbnb: '13 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Eugenia',
        date: 'giugno 2025',
        text:
          'La proprietà si trova in una posizione idilliaca in mezzo a un uliveto e offre molta tranquillità e privacy. Le camere sono pulite, moderne e ben attrezzate.',
        stay: undefined,
        nights: undefined,
        country: 'Italia',
        yearsOnAirbnb: '11 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Tidiane',
        date: 'agosto 2024',
        text:
          'Nous avons passé un séjour très agréable, reposant et ressourçant. L’appartement se situe dans un cadre magnifique au milieu d’une des plus belles oliveraies de la région.',
        stay: 'Amici',
        nights: undefined,
        country: 'Francia',
        yearsOnAirbnb: '2 anni su Airbnb',
        rating: 5,
      },
    ],
    []
  );

  const renderStars = (rating: number, source: Review['source']) => {
    const filled = source === 'Booking' ? Math.round(rating / 2) : rating;
    const label = source === 'Booking' ? `${rating}/10` : `${rating}/5`;

    return (
      <div className="flex items-center gap-2 mt-3">
        <div className="flex gap-1 text-[var(--sienna)] text-xs">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < filled ? '★' : '☆'}</span>
          ))}
        </div>
        <span className="text-xs uppercase tracking-widest text-[var(--brown)] opacity-60">{label}</span>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 bg-paper-texture-dark overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[var(--brown)] mb-2">Parole degli Ospiti</h2>
          <p className="font-script text-2xl text-[var(--sienna)]">Words from our Guests</p>

          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <a href={bookingReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-sm md:text-base text-[var(--brown)]">Recensioni su <strong>Booking.com</strong></span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>

            <a href={airbnbReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-sm md:text-base text-[var(--brown)]">Recensioni su <strong>Airbnb</strong></span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>

            <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-sm md:text-base text-[var(--brown)]">Recensioni su <strong>Google</strong></span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>
          </div>

          <p className="mt-4 text-xs text-[var(--brown)] opacity-60 uppercase tracking-widest font-serif">
            Verified reviews • Opens in a new tab
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="reviews-track">
            {[...reviews, ...reviews].map((review, idx) => (
              <article key={`${review.source}-${review.name}-${idx}`} className="review-card bg-[var(--paper)] shadow-sm border border-[var(--cream)] relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="review-top">
                  <div className="review-head">
                    <div className="review-meta-left">
                      <p className="review-name">{review.name}</p>
                      <p className="review-platform">{review.source} • {review.date}</p>
                      <p className="review-badge">{review.source.toUpperCase()}</p>
                    </div>

                    <div className="review-meta-right">
                      {review.stay && <p>{review.stay}</p>}
                      {review.nights && <p>{review.nights}</p>}
                      {review.country && <p>{review.country}</p>}
                      {review.yearsOnAirbnb && review.source === 'Airbnb' && <p>{review.yearsOnAirbnb}</p>}
                    </div>
                  </div>
                </div>

                <Quote className="quote-icon" />

                <p className="review-text">“{review.text}”</p>

                <div className="review-divider" />
                {renderStars(review.rating, review.source)}

                <div className="corner top-right" />
                <div className="corner bottom-left" />
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{\`
        .reviews-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee 55s linear infinite;
          will-change: transform;
        }

        .reviews-track:hover {
          animation-play-state: paused;
        }

        .review-card {
          width: 380px;
          min-height: 420px;
          flex: 0 0 auto;
          padding: 1.6rem 1.6rem 1.4rem;
        }

        .review-top {
          min-height: 98px;
        }

        .review-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .review-meta-left {
          min-width: 0;
        }

        .review-name {
          font-family: Georgia, serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--brown);
          line-height: 1.1;
          margin: 0 0 4px 0;
        }

        .review-platform {
          font-family: Georgia, serif;
          font-size: 0.92rem;
          color: var(--brown);
          opacity: 0.65;
          margin: 0 0 10px 0;
        }

        .review-badge {
          display: inline-block;
          border: 1px solid var(--cream);
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: var(--sienna);
          margin: 0;
        }

        .review-meta-right {
          text-align: right;
          font-family: Georgia, serif;
          font-size: 0.82rem;
          color: var(--brown);
          opacity: 0.72;
          line-height: 1.35;
          min-width: 92px;
        }

        .review-meta-right p {
          margin: 0;
        }

        .quote-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: var(--sage);
          opacity: 0.35;
          margin: 0.8rem 0 1rem 0;
        }

        .review-text {
          font-family: Georgia, serif;
          font-size: 1.02rem;
          color: var(--brown);
          font-style: italic;
          line-height: 1.6;
          margin: 0;
        }

        .review-divider {
          border-top: 1px solid rgba(0,0,0,0.13);
          margin-top: 1.35rem;
          padding-top: 1rem;
        }

        .corner {
          position: absolute;
          width: 2rem;
          height: 2rem;
          border-color: var(--sage);
          opacity: 0.25;
        }

        .corner.top-right {
          top: 0;
          right: 0;
          border-top: 2px solid;
          border-right: 2px solid;
        }

        .corner.bottom-left {
          bottom: 0;
          left: 0;
          border-bottom: 2px solid;
          border-left: 2px solid;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .reviews-track {
            gap: 1.25rem;
            animation-duration: 70s;
          }

          .review-card {
            width: 310px;
            min-height: 430px;
            padding: 1.35rem 1.2rem 1.1rem;
          }

          .review-meta-right {
            min-width: 78px;
            font-size: 0.75rem;
          }

          .review-text {
            font-size: 0.98rem;
          }
        }
      \`}</style>
    </section>
  );
}
