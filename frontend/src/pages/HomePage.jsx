import { useLocation } from "react-router-dom"
import AboutSection from "../components/AboutSection"
import ContactSection from "../components/ContactSection"
import CTASection from "../components/CTASection"
import FeaturedSection from "../components/FeaturedSection"
import HeroSection from "../components/HeroSection"
import MoodSection from "../components/MoodSection"
import TestimonialsSection from "../components/TestimonialsSection"
import { useEffect } from "react"

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10)
  }, [location]);

  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <MoodSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
      <ContactSection />
    </>
  )
}

export default HomePage
