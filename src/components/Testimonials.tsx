import React, { useMemo } from 'react';
import { Quote, ExternalLink } from 'lucide-react';

type Review = {
  source: 'Airbnb' | 'Booking' | 'Google';
  name: string;
  date: string;
  text: string;
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
        text: 'Nous avons passé un super moment. Nous reviendrons certainement dans ce logement la prochaine fois ! Les propriétaires s sont adorables.',
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
        country: 'Italia',
        rating: 5,
      },
      {
        source: 'Google',
        name: 'Nerina',
        date: 'settembre 2024',
        text: 'Oasi di pace e relax totale. Cura dei dettagli, sia interno casa che esterno. Gentilezza e professionalità dei proprietari.',
        country: 'Italia',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Piotr',
        date: 'luglio 2025',
        text: 'Un posto bellissimo in un uliveto, che permette di rilassarsi completamente lontano dalla folla e dal turismo di massa. È stato meraviglioso rilassarsi in campagna, accompagnati da cicale, il fruscio delle foglie e il profumo mediterraneo.',
        stay: 'Famiglia',
        country: 'Polonia',
        yearsOnAirbnb: '3 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Fabio',
        date: 'giugno 2025',
        text: 'Il soggiorno è stato fantastico! La piscina con il giardino è semplicemente fantastica.',
        country: 'Italia',
        yearsOnAirbnb: '9 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Francesco',
        date: 'agosto 2024',
        text: 'Abbiamo alloggiato per una settimana in questa struttura e non c’era mai capitato di trovare una cosa così accurata e confortevole. La location ci ha consentito il puro relax continuo.',
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
        country: 'Corea del Sud',
        yearsOnAirbnb: '4 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Dilan',
        date: 'agosto 2025',
        text: 'Abbiamo trascorso un ottimo soggiorno nella casa! L’host è stato estremamente accogliente, molto attento e sempre disponibile.',
        stay: 'Famiglia',
        country: 'Turchia',
        yearsOnAirbnb: '5 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Pasquale',
        date: 'agosto 2025',
        text: 'Casa così come nelle foto, fornita di tutti i servizi elencati, posizione strategica per poter raggiungere varie località della Puglia, giardino e piscina in ottime condizioni.',
        country: 'Italia',
        yearsOnAirbnb: '4 mesi su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Riina',
        date: 'giugno 2025',
        text: 'Ottimo alloggio come base per visitare la Puglia, la nostra famiglia ha apprezzato la piscina e l’uliveto.',
        stay: 'Famiglia',
        country: 'Finlandia',
        yearsOnAirbnb: '10 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Lidia',
        date: 'giugno 2025',
        text: 'Tutto è stato fantastico, ci siamo trovati benissimo. La posizione è proprio come nelle foto, molto pulita e spaziosa.',
        country: 'Romania',
        yearsOnAirbnb: '8 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Booking',
        name: 'Maja',
        date: '28 settembre 2024',
        text: 'We had an amazing stay at this beautiful apartment set in the midst of olive groves. The location is incredibly peaceful and quiet, perfect for relaxation.',
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
        nights: '7 notti',
        country: 'Germania',
        rating: 10,
      },
      {
        source: 'Booking',
        name: 'Frida',
        date: 'luglio 2025',
        text: 'Lovely family friendly place with great pool and welcoming hosts surrounded by old olive groves.',
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
        text: 'Cura dei dettagli, sia interno casa che esterno. Gentilezza e professionalità dei proprietari.',
        stay: 'Viaggiatore singolo',
        nights: '3 notti',
        country: 'Italia',
        rating: 9,
      },
      {
        source: 'Google',
        name: 'Maura',
        date: 'settembre 2024',
        text: 'Siamo tornati da poco da questo posto meraviglioso. La casa è immersa in un uliveto secolare, fatta di calma e silenzio. Da tornare assolutamente.',
        country: 'Italia',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Stephanie',
        date: 'luglio 2025',
        text: 'Un appartamento semplice ma molto speciale nel bel giardino. La piscina e le aree esterne sono molto speciali ed è stato un vero piacere trascorrere del tempo qui.',
        country: 'Germania',
        yearsOnAirbnb: '13 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Eugenia',
        date: 'giugno 2025',
        text: 'La proprietà si trova in una posizione idilliaca in mezzo a un uliveto e offre molta tranquillità e privacy. Le camere sono pulite, moderne e ben attrezzate.',
        country: 'Italia',
        yearsOnAirbnb: '11 anni su Airbnb',
        rating: 5,
      },
      {
        source: 'Airbnb',
        name: 'Tidiane',
        date: 'agosto 2024',
        text: 'Nous avons passé un séjour très agréable, reposant et ressourçant. L’appartement se situe dans un cadre magnifique au milieu d’une des plus belles oliveraies de la région.',
        stay: 'Amici',
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
      <div className=\"reviews-stars\">
        <div className=\"reviews-stars-row\">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < filled ? '★' : '☆'}</span>
          ))}
        </div>
        <span>{label}</span>
      </div>
    );
  };

  const renderMeta = (review: Review) => {
    const items = [review.stay, review.nights, review.country];
    if (review.source === 'Airbnb' && review.yearsOnAirbnb) items.push(review.yearsOnAirbnb);
    return items.filter(Boolean) as string[];
  };

  return (
    <section className=\"testimonials-section\">
      <div className=\"testimonials-inner\">
        <div className=\"testimonials-header\">
          <h2>Parole degli Ospiti</h2>
          <p>Words from our Guests</p>

          <div className=\"reviews-links\">
            <a href={bookingReviewsUrl} target=\"_blank\" rel=\"noopener noreferrer\" className=\"reviews-link\">
              <span>Recensioni su <strong>Booking.com</strong></span>
              <ExternalLink className=\"w-4 h-4\" />
            </a>

            <a href={airbnbReviewsUrl} target=\"_blank\" rel=\"noopener noreferrer\" className=\"reviews-link\">
              <span>Recensioni su <strong>Airbnb</strong></span>
              <ExternalLink className=\"w-4 h-4\" />
            </a>

            <a href={googleReviewsUrl} target=\"_blank\" rel=\"noopener noreferrer\" className=\"reviews-link\">
              <span>Recensioni su <strong>Google</strong></span>
              <ExternalLink className=\"w-4 h-4\" />
            </a>
          </div>

          <p className=\"reviews-note\">VERIFIED REVIEWS • OPENS IN A NEW TAB</p>
        </div>

        <div className=\"reviews-marquee\">
          <div className=\"reviews-track\">
            {[...reviews, ...reviews].map((review, idx) => (
              <article key={review.source + '-' + review.name + '-' + idx} className=\"review-card\">
                <div className=\"review-card-top\">
                  <div>
                    <p className=\"review-name\">{review.name}</p>
                    <p className=\"review-platform\">{review.source} • {review.date}</p>
                    <p className=\"review-badge\">{review.source.toUpperCase()}</p>
                  </div>

                  <div className=\"review-info\">
                    {renderMeta(review).map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </div>

                <Quote className=\"review-quote\" />

                <p className=\"review-text\">“{review.text}”</p>

                <div className=\"review-divider\" />
                {renderStars(review.rating, review.source)}

                <div className=\"corner corner-tr\" />
                <div className=\"corner corner-bl\" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
