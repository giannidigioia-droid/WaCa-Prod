import React, { useEffect, useMemo, useState, useRef } from 'react';
import { OliveBranch } from './DecorativeElements';

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
  const cardRef = useRef<HTMLDivElement>(null);

  // ✅ UPDATED FINAL IMAGES
  const images: Record<string, string> = useMemo(
    () => ({
      Dream:
        'https://res.cloudinary.com/dfu9nzn8r/image/upload/f_auto,q_auto,w_1600/v1771582089/b9dd12b5-38cb-4e6c-845d-194d27f96e13.png_2023-09-08_08_42_18_myofms.jpg',
      Heaven:
        'https://res.cloudinary.com/dfu9nzn8r/image/upload/f_auto,q_auto,w_1600/v1771581999/701822049_mqvxn3.jpg',
      Oasis:
        'https://res.cloudinary.com/dfu9nzn8r/image/upload/f_auto,q_auto,w_1600/v1771581998/701822084_wurbyn.jpg'
    }),
    []
  );

  const imageUrl = images[name];

  const toggle = () => {
    setFlipped((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setFlipped(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setFlipped(false);
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative max-w-sm w-full ${className}`}
      style={{
        transform: `rotate(${rotation})`,
        perspective: '1200px'
      }}
    >
      <div role="button" tabIndex={0} onClick={toggle} className="outline-none cursor-pointer select-none">
        <div
          className="relative w-full h-[520px] transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* ---------- FRONT ---------- */}
          <div
            className="absolute inset-0 bg-[#FDFBF7] p-6 md:p-8 vintage-card border border-[#E8E1D5] flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          >
            <img
              src="https://res.cloudinary.com/dfu9nzn8r/image/upload/v1771674668/IMG_0326_eywbni.png"
              alt="stamp"
              className="absolute top-4 right-4 w-20 h-20 object-contain pointer-events-none select-none"
              draggable={false}
            />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-full bg-gray-200 opacity-30 pointer-events-none hidden md:block" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-6 pr-16">
                <h3 className="font-script text-4xl text-[var(--sienna)] mb-2">{name}</h3>
                <div className="w-12 h-1 bg-[var(--sage)] rounded-full opacity-50" />
              </div>

              <div className="flex-grow space-y-4">
                <p className="font-serif text-lg text-[var(--brown)] leading-relaxed italic">{description}</p>

                <div className="pt-4 border-t border-dashed border-[var(--sage)] border-opacity-30">
                  <ul className="space-y-2">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm font-serif text-[var(--brown)] opacity-80">
                        <span className="w-1.5 h-1.5 bg-[var(--sienna)] rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-end">
                <OliveBranch className="w-12 h-12 text-[var(--sage)] opacity-60" />
                <span className="font-script text-sm text-[var(--brown)] opacity-50">Saluti dalla Puglia</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 text-xs font-serif text-[var(--brown)] opacity-40">
              Clicca la cartolina
            </div>
          </div>

          {/* ---------- BACK FOTO ---------- */}
          <div
            className="absolute inset-0 bg-[#FDFBF7] border border-[#E8E1D5] overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(0)'
            }}
          >
            {imageUrl && (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" loading="lazy" draggable={false} />
            )}

            <div className="absolute inset-0 bg-[#704214] mix-blend-color opacity-10 pointer-events-none" />

            <div className="absolute bottom-4 right-4 bg-[var(--paper)] px-4 py-2 rotate-2 shadow-sm">
              <span className="font-script text-xl text-[var(--brown)]">{name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Apartments() {
  const apartments = [
    {
      name: 'Dream',
      description:
        'A serene retreat with a private terrace overlooking the olive groves. Wake up to birdsong and the scent of Mediterranean herbs.',
      features: ['3 Bedrooms · 4+2 Max Occ.', 'Private terrace', 'Full kitchen', 'Air conditioning', 'Two patios (one with pool view)'],
      rotation: '-1deg'
    },
    {
      name: 'Heaven',
      description:
        'Light-filled and spacious, Heaven opens onto the shared patio and pool. Perfect for families seeking comfort and connection.',
      features: ['2 Bedrooms · 4+1 Max Occ.', 'Patio & pool access', 'Full kitchen', 'Air conditioning', 'Garden views'],
      rotation: '0.5deg'
    },
    {
      name: 'Oasis',
      description:
        'The most intimate of the three, Oasis is a cozy hideaway for couples or small families, with its own quiet corner of the garden.',
      features: ['1 Bedrooms · 4 Max Occ.', 'Patio & pool access', 'Full kitchen', 'Air conditioning', 'Garden views'],
      rotation: '1.5deg'
    }
  ];

  return (
    <section className="py-24 px-4 bg-paper-texture-dark scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[var(--brown)] mb-3">Gli Appartamenti</h2>
          <p className="font-script text-2xl text-[var(--sienna)] opacity-80 transform -rotate-1">
            Choose your perfect retreat
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-8">
          {apartments.map((apt) => (
            <ApartmentCard
              key={apt.name}
              name={apt.name}
              description={apt.description}
              features={apt.features}
              rotation={apt.rotation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
