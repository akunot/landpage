import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { I18nProvider } from './i18n/I18nProvider'
import { Navigation } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { ProjectGallery } from './components/projects/ProjectGallery'
import { FeaturedProject } from './components/projects/FeaturedProject'
import { PhilosophySection } from './components/philosophy/PhilosophySection'
import { ResearchSection } from './components/research/ResearchSection'
import { TechnologySection } from './components/technologies/TechnologySection'
import { NowSection } from './components/now/NowSection'
import { ContactSection } from './components/contact/ContactSection'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-accent"
    />
  )
}

export default function App() {
  return (
    // reducedMotion="user": transforms are dropped for users who prefer reduced motion.
    <I18nProvider>
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <ScrollProgress />
        <Navigation />
        <main id="main">
          <HeroSection />
          <ProjectGallery />
          <FeaturedProject />
          <PhilosophySection />
          <ResearchSection />
          <TechnologySection />
          <NowSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
    </I18nProvider>
  )
}
