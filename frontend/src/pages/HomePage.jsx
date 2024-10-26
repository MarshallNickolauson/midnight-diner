import AboutSection from "../components/AboutSection"
import ContactSection from "../components/ContactSection"
import CTASection from "../components/CTASection"
import FeaturedSection from "../components/FeaturedSection"
import HeroSection from "../components/HeroSection"
import MoodSection from "../components/MoodSection"
import TestimonialsSection from "../components/TestimonialsSection"

const HomePage = () => {
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
