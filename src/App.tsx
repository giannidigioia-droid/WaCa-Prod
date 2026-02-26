import React from 'react';
import { SEO } from "./components/SEO";

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { EntireVilla } from './components/EntireVilla';
import { Apartments } from './components/Apartments';
import { Gallery } from './components/Gallery';
import { Amenities } from './components/Amenities';
import { DolceVita } from './components/DolceVita';
import { Testimonials } from './components/Testimonials';
import { Location } from './components/Location';
import { BookingCTA } from './components/BookingCTA';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      {/* ===== SEO PERMANENTE ===== */}
      <SEO />

      <main className="min-h-screen w-full bg-paper-texture overflow-x-hidden selection:bg-[var(--sage)] selection:text-white">
        <Navigation />

        <div id="home">
          <Hero />
        </div>

        <EntireVilla />

        <div id="apartments">
          <Apartments />
        </div>

        <Gallery />

        <div id="amenities">
          <Amenities />
        </div>

        <div id="dolcevita">
          <DolceVita />
        </div>

        <Testimonials />

        <Location />

        <BookingCTA />

        <div id="contact">
          <Footer />
        </div>
      </main>
    </>
  );
}
