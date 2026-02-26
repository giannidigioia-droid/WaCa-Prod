import React from 'react';
import { Quote, ExternalLink } from 'lucide-react';
export function Testimonials() {
  const bookingReviewsUrl = 'https://www.booking.com/hotel/it/masseria-della-pace-nadir-amp-zenit-apartments.it.html?aid=2311236&label=it-it-booking-desktop-VRZD0IC5lt9Ulq%2AajTZ_bgS652829000338%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp1008463%3Ali%3Adec%3Adm&sid=8059266fdbb662c4b4890577f7bb1c20&all_sr_blocks=1254666602_397981772_2_0_0&checkin=2025-08-01&checkout=2025-08-17&dest_id=-122100&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1254666602_397981772_2_0_0&hpos=1&matching_block_id=1254666602_397981772_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1254666602_397981772_2_0_0__799689&srepoch=1742209379&srpvid=2a544dac788700dd&type=total&ucfs=1&#tab-reviews';
  const airbnbReviewsUrl = 'https://www.airbnb.it/rooms/1604403343972959495';
  
  // Link temporaneo (ricerca). Quando avrai la scheda Google con recensioni,
  // sostituisci con l’URL diretto alla tab "recensioni".
  const googleReviewsUrl = 'https://www.google.com/search?q=WaCa%20-%20Apulian%20Villa%20Reviews';
  const reviews = [{
    text: 'A magical place where time stands still. The olive trees, the silence, the sunset... everything was perfect.',
    author: 'Sarah & James',
    from: 'London, UK',
    rating: 5
  }, {
    text: 'WACA is pure poetry. We loved the rustic charm combined with modern comforts. The pool area is a dream.',
    author: 'Marco e Giulia',
    from: 'Milano, Italy',
    rating: 5
  }, {
    text: "The best family vacation we've ever had. The kids loved the space to run, and we loved the peace.",
    author: 'The Weber Family',
    from: 'Munich, Germany',
    rating: 5
  }];
  return <section className="py-24 px-4 bg-paper-texture-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[var(--brown)] mb-2">
            Parole degli Ospiti
          </h2>
          <p className="font-script text-2xl text-[var(--sienna)]">
            Words from our Guests
          </p>

          {/* Link esterni in alto */}
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <a href={bookingReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow">

              <span className="font-serif text-sm md:text-base text-[var(--brown)]">
                Recensioni su <strong>Booking.com</strong>
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>

            <a href={airbnbReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow">

              <span className="font-serif text-sm md:text-base text-[var(--brown)]">
                Recensioni su <strong>Airbnb</strong>
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--sienna)]" />
            </a>

            <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] border border-[var(--cream)] px-6 py-3 shadow-sm hover:shadow-md transition-shadow">

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

        {/* Cards recensioni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => <div key={idx} className="bg-[var(--paper)] p-8 shadow-sm border border-[var(--cream)] relative group hover:-translate-y-2 transition-transform duration-300">

              <Quote className="w-10 h-10 text-[var(--sage)] opacity-40 mb-4" />

              <p className="font-serif text-lg text-[var(--brown)] italic leading-relaxed mb-6">
                "{review.text}"
              </p>

              <div className="border-t border-[var(--sage)] border-opacity-30 pt-4">
                <p className="font-bold text-[var(--sienna)] font-script text-xl">
                  {review.author}
                </p>
                <p className="text-sm text-[var(--brown)] opacity-60 uppercase tracking-widest mt-1">
                  {review.from}
                </p>
                <div className="flex gap-1 mt-2">
                  {[...Array(review.rating)].map((_, i) => <span key={i} className="text-[var(--sienna)] text-xs">
                      ★
                    </span>)}
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--sage)] opacity-30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--sage)] opacity-30" />
            </div>)}
        </div>
      </div>
    </section>;
}
