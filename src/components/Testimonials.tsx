import React from 'react';
import { Quote } from 'lucide-react';

type Review = {
  source: 'Airbnb' | 'Booking' | 'Google';
  country: string;
  period: string;
  nights: string;
  group: string;
  yearsOnPlatform: string;
  text: string;
  author: string;
  avatar: string;
};

export function Testimonials() {
  const reviews: Review[] = [
    {
      source: 'Airbnb',
      country: 'Poland',
      period: 'luglio 2025',
      nights: '7 notti',
      group: 'Famiglia',
      yearsOnPlatform: '4 anni su Airbnb',
      text:
        'Un posto bellissimo in un uliveto, che permette di rilassarsi completamente lontano dalla folla e dal turismo di massa. È stato meraviglioso rilassarsi in campagna, accompagnati da cicale, il fruscio delle foglie e la natura mediterranea.',
      author: 'Piotr',
      avatar: 'P',
    },
    {
      source: 'Airbnb',
      country: 'Italy',
      period: 'agosto 2024',
      nights: '7 notti',
      group: 'Famiglia',
      yearsOnPlatform: '2 anni su Airbnb',
      text:
        'Abbiamo alloggiato per una settimana in questa struttura e non c’era mai capitato di trovare una cosa così accurata e confortevole. La location ci ha consentito il puro relax continuo. Abbiamo anche avuto la possibilità di conoscere i proprietari, una famiglia davvero molto gentile.',
      author: 'Francesco',
      avatar: 'F',
    },
    {
      source: 'Airbnb',
      country: 'Korea',
      period: '3 settimane fa',
      nights: '2 notti',
      group: 'Coppia',
      yearsOnPlatform: '4 anni su Airbnb',
      text: 'Ottimo alloggio in un ambiente tranquillo!',
      author: 'Dong-Min',
      avatar: 'D',
    },
    {
      source: 'Airbnb',
      country: 'Italy',
      period: 'agosto 2025',
      nights: '5 notti',
      group: 'Famiglia',
      yearsOnPlatform: '10 anni su Airbnb',
      text:
        'Abbiamo trascorso un ottimo soggiorno nella casa. L’host è stato estremamente accogliente, molto attento e sempre disponibile a rispondere alle nostre domande o a consigliarci.',
      author: 'Dilan',
      avatar: 'D',
    },
    {
      source: 'Airbnb',
      country: 'Italy',
      period: 'agosto 2025',
      nights: '3 notti',
      group: 'Coppia',
      yearsOnPlatform: 'N/D',
      text:
        'Casa così come nelle foto, fornita di tutti i servizi elencati, posizione strategica per poter raggiungere varie località della Puglia, giardino e piscina in ottime condizioni, proprietari di casa super accoglienti.',
      author: 'Pasquale',
      avatar: 'P',
    },
    {
      source: 'Airbnb',
      country: 'Finland',
      period: 'giugno 2025',
      nights: '7 notti',
      group: 'Famiglia',
      yearsOnPlatform: '10 anni su Airbnb',
      text:
        'Ottimo alloggio come base per visitare la Puglia, la nostra famiglia ha apprezzato la piscina e l’uliveto. Le camere sono pulite, moderne e ben attrezzate, e l’alloggio si trova in una posizione comoda per iniziare un viaggio in Puglia.',
      author: 'Riina',
      avatar: 'R',
    },
    {
      source: 'Booking',
      country: 'Netherlands',
      period: '28 settembre 2024',
      nights: '5 notti',
      group: 'Famiglia',
      yearsOnPlatform: 'N/D',
      text:
        'We had an amazing stay at this beautiful apartment set in the midst of olive groves. The location is incredibly peaceful and quiet, perfect for relaxation. The terrace overlooks their lovely pool, and everything is very well-maintained.',
      author: 'Maja',
      avatar: 'M',
    },
    {
      source: 'Booking',
      country: 'Belgium',
      period: '15 settembre 2025',
      nights: '9 notti',
      group: 'Coppia',
      yearsOnPlatform: 'N/D',
      text:
        'Nous avons passé un super moment. Nous reviendrons certainement dans ce logement la prochaine fois ! La tranquillité, la propreté, la situation. Tout était parfait.',
      author: 'Christelle',
      avatar: 'C',
    },
    {
      source: 'Google',
      country: 'Italy',
      period: 'giugno 2025',
      nights: '3 notti',
      group: 'Famiglia',
      yearsOnPlatform: 'N/D',
      text:
        'La pace dei sensi. L’estrema pace, la connessione con la natura, la cordialità eccessiva dei proprietari.',
      author: 'Colamonico',
      avatar: 'C',
    },
    {
      source: 'Google',
      country: 'Italy',
      period: 'settembre 2024',
      nights: '3 notti',
      group: 'Coppia',
      yearsOnPlatform: 'N/D',
      text:
        'Cura dei dettagli, sia interno casa che esterno. Gentilezza e professionalità dei proprietari. L’atmosfera è rilassata e autentica.',
      author: 'Nerina',
      avatar: 'N',
    },
  ];

  const duplicatedReviews = [...reviews, ...reviews];

  const sourceLabel = (source: Review['source']) => {
    if (source === 'Airbnb') return 'Airbnb';
    if (source === 'Booking') return 'Booking';
    return 'Google';
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
          <p className="mt-4 text-xs text-[var(--brown)] opacity-60 uppercase tracking-widest font-serif">
            Verified reviews • Opens in a new tab
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 w-max animate-[scrollRightToLeft_60s_linear_infinite]">
            {duplicatedReviews.map((review, idx) => (
              <div
                key={`${review.author}-${idx}`}
                className="w-[360px] md:w-[380px] bg-[var(--paper)] p-8 shadow-sm border border-[var(--cream)] relative shrink-0"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--brown)] opacity-70">
                    <span className="w-2 h-2 rounded-full bg-[var(--sienna)]"></span>
                    {sourceLabel(review.source)}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[var(--brown)] opacity-55">
                    {review.yearsOnPlatform}
                  </span>
                </div>

                <Quote className="w-9 h-9 text-[var(--sage)] opacity-35 mb-4" />

                <p className="font-serif text-lg text-[var(--brown)] italic leading-relaxed mb-6 min-h-[180px]">
                  "{review.text}"
                </p>

                <div className="border-t border-[var(--sage)] border-opacity-30 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--sage)] text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--sienna)] font-script text-xl leading-none">
                        {review.author}
                      </p>
                      <p className="text-xs text-[var(--brown)] opacity-60 uppercase tracking-widest mt-1">
                        {review.country}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-[var(--brown)] opacity-80 uppercase tracking-widest">
                      Periodo: {review.period}
                    </p>
                    <p className="text-sm text-[var(--brown)] opacity-80 uppercase tracking-widest">
                      {review.nights} • {review.group}
                    </p>
                  </div>

                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[var(--sienna)] text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--sage)] opacity-30" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--sage)] opacity-30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollRightToLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-\\[scrollRightToLeft_60s_linear_infinite\\] {
          animation: scrollRightToLeft 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
