import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import PainPoints from './components/PainPoints';
import Showcase from './components/Showcase';
import VideoDemo from './components/VideoDemo';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import Trust from './components/Trust';
import Value from './components/Value';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyHeaderCTA from './components/StickyHeaderCTA';

function App() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past the hero section (approx 700px)
      if (window.scrollY > 700) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-trust-gray overflow-x-hidden">
      <Header />
      <AnimatePresence>
        {showStickyCTA && <StickyHeaderCTA />}
      </AnimatePresence>
      
      <main>
        <Hero />
        <Pricing />
        <PainPoints />
        <Showcase />
        <VideoDemo />
        <HowItWorks />
        <Testimonials />
        <Features />
        <Trust />
        <Value />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
