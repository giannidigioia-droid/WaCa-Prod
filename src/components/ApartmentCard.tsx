import React, { useState } from 'react';
import { PostcardStamp, OliveBranch } from './DecorativeElements';
interface ApartmentCardProps {
  name: string;
  description: string;
  features: string[];
  rotation?: string;
  className?: string;
}
export function ApartmentCard({
  name,
  description,
  features,
  rotation = '0deg',
  className = ''
}: ApartmentCardProps) {
  const [flipped, setFlipped] = useState(false);

  // NUOVE immagini associate
  const images: Record<string, string> = {
    Dream: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/f_auto,q_auto,w_1600/v1771578265/PatioSudtavolopiscina_em7pyc.jpg',
    Heaven: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/f_auto,q_auto,w_1600/v1771581295/701822006_fj57gi.jpg',
    Oasis: 'https://res.cloudinary.com/dfu9nzn8r/image/upload/f_auto,q_auto,w_1600/v1771578497/701822049_1_rlxdy3.jpg'
  };
  const imageUrl = images[name];
  return <div className={`relative max-w-sm w-full ${className}`} style={{
    transform: `rotate(${rotation})`,
    perspective: '1200px'
  }} onClick={() => setFlipped(!flipped)}>

      {/* Contenitore carta */}
      <div className="relative w-full h-[520px] transition-transform duration-700" style={{
      transformStyle: 'preserve-3d',
      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
    }}>


        {/* FRONTE — TESTO */}
        <div className="absolute inset-0 bg-[#FDFBF7] p-6 md:p-8 vintage-card border border-[#E8E1D5] flex flex-col" style={{
        backfaceVisibility: 'hidden'
      }}>

          <div className="absolute top-4 right-4 w-16 h-20 opacity-80">
            <PostcardStamp className="w-full h-full" />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-full bg-gray-200 opacity-30 pointer-events-none hidden md:block" />

          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-6 pr-16">
              <h3 className="font-script text-4xl text-[var(--sienna)] mb-2">
                {name}
              </h3>
              <div className="w-12 h-1 bg-[var(--sage)] rounded-full opacity-50" />
            </div>

            <div className="flex-grow space-y-4">
              <p className="font-serif text-lg text-[var(--brown)] leading-relaxed italic">
                {description}
              </p>

              <div className="pt-4 border-t border-dashed border-[var(--sage)] border-opacity-30">
                <ul className="space-y-2">
                  {features.map((feature, idx) => <li key={idx} className="flex items-center text-sm font-serif text-[var(--brown)] opacity-80">

                      <span className="w-1.5 h-1.5 bg-[var(--sienna)] rounded-full mr-2" />
                      {feature}
                    </li>)}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-end">
              <OliveBranch className="w-12 h-12 text-[var(--sage)] opacity-60" />
              <span className="font-script text-sm text-[var(--brown)] opacity-50">
                Saluti da Puglia
              </span>
            </div>
          </div>

          {/* suggerimento */}
          <div className="absolute bottom-4 left-4 text-xs font-serif text-[var(--brown)] opacity-40">
            Clicca la cartolina
          </div>
        </div>

        {/* RETRO — FOTO */}
        <div className="absolute inset-0 bg-[#FDFBF7] border border-[#E8E1D5] overflow-hidden" style={{
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)'
      }}>

          {imageUrl && <img src={imageUrl} alt={name} className="w-full h-full object-cover" loading="lazy" />}

          {/* leggero effetto vintage */}
          <div className="absolute inset-0 bg-[#704214] mix-blend-color opacity-10 pointer-events-none" />

          {/* etichetta cartolina */}
          <div className="absolute bottom-4 right-4 bg-[var(--paper)] px-4 py-2 rotate-2 shadow-sm">
            <span className="font-script text-xl text-[var(--brown)]">
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>;
}