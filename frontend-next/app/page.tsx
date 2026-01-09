'use client';

import { useEffect, useState, useRef } from 'react';
import { flightApi, Flight } from '../lib/api/flights';
import { contentApi } from '../lib/api/content';
import { infoSectionApi } from '../lib/api/infoSections';
import PublicNavbar from '../components/public/PublicNavbar';
import Hero from '../components/public/Hero';
import About from '../components/public/About';
import InfoSections from '../components/public/InfoSections';
import FlightBoard from '../components/public/FlightBoard';
import PublicFooter from '../components/public/PublicFooter';
import ScrollIndicator from '../components/public/ScrollIndicator';
import ContactStats from '../components/public/ContactStats';

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [content, setContent] = useState<any>({});
  const [infoSections, setInfoSections] = useState<any[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fetch Content
    const fetchContent = async () => {
      try {
        const data = await contentApi.getAll();
        setContent(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();

    // Fetch Info Sections
    const fetchInfoSections = async () => {
      try {
        const data = await infoSectionApi.getAll();
        setInfoSections(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInfoSections();

    // Fetch Flights
    const fetchFlights = async () => {
      try {
        const data = await flightApi.getAll();
        setFlights(data);
      } catch (error) {
        console.error('Failed to fetch flights', error);
      }
    };

    fetchFlights();
    const flightInterval = setInterval(fetchFlights, 30000); // 30s refresh

    const handleScroll = () => {
      if (mainRef.current) {
        setShowScrollTop(mainRef.current.scrollTop > 500);
      }
    };

    const currentMain = mainRef.current;
    if (currentMain) {
      currentMain.addEventListener('scroll', handleScroll);
    }

    return () => {
      clearInterval(flightInterval);
      if (currentMain) {
        currentMain.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main ref={mainRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth font-sans text-slate-800">
      <PublicNavbar />
      <ScrollIndicator />

      {/* Section 1: Hero */}
      <section id="hero" className="snap-start w-full h-screen flex items-center justify-center relative">
        <Hero content={content.hero} />
      </section>

      {/* Section 2: About */}
      <section id="about" className="snap-start w-full min-h-screen flex items-center justify-center bg-white relative">
        <About content={content.about} />
      </section>

      {/* Section 2.5: Info Sections (Features/Facilities) */}
      <section id="info" className="snap-start w-full min-h-screen flex items-center justify-center relative py-20 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 w-full">
          <InfoSections sections={infoSections} />
        </div>
      </section>

      {/* Section 3: Schedule */}
      <section id="schedule" className="snap-start w-full min-h-screen flex items-start justify-center bg-white relative">
        <FlightBoard flights={flights} />
      </section>

      {/* Section 4: Contact & Stats */}
      <section id="contact" className="snap-start w-full min-h-screen flex items-center justify-center bg-slate-50 relative">
        <ContactStats />
      </section>

      {/* Section 5: Footer */}
      <section className="snap-start w-full h-auto min-h-[50vh] flex flex-col justify-end bg-slate-800 relative">
        <PublicFooter content={content.running_text} />
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </main>
  );
}
