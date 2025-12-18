import Navbar from '@/src/components/landing/Navbar';
import Hero from '@/src/components/landing/Hero';
import HowItWorks from '@/src/components/landing/HowItWorks';
import Features from '@/src/components/landing/Features';
import Testimonials from '@/src/components/landing/Testimonials';
import Pricing from '@/src/components/landing/Pricing';
import CTA from '@/src/components/landing/CTA';
import Footer from '@/src/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}