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
import ExitIntentPopup from './components/ExitIntentPopup';
import StickyHeaderCTA from './components/StickyHeaderCTA';
import SocialProofPopup from './components/SocialProofPopup';

function App() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past the hero section (approx 700px)
      if (window.scrollY > 700) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
        // Show exit-intent popup if mouse leaves the top of the viewport
        if (e.clientY <= 0 && !sessionStorage.getItem('exitIntentShown')) {
            setShowExitPopup(true);
            sessionStorage.setItem('exitIntentShown', 'true');
        }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
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

      <AnimatePresence>
        {showExitPopup && <ExitIntentPopup onClose={() => setShowExitPopup(false)} />}
      </AnimatePresence>

      <SocialProofPopup />
    </div>
  );
}

export default App;
