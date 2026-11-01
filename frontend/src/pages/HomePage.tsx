import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { FAQ } from '../components/sections/FAQ';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { QuickFacts } from '../components/sections/QuickFacts';
import { SoftSkills } from '../components/sections/SoftSkills';
import { TechStack } from '../components/sections/TechStack';
import { Timeline } from '../components/sections/Timeline';
import { Volunteering } from '../components/sections/Volunteering';
import { usePageMeta } from '../hooks/usePageMeta';

export function HomePage() {
  usePageMeta({
    title: 'Dominik Jeksties – Softwareentwickler aus Hagen',
    description:
      'Dominik Jeksties – Softwareentwickler aus Hagen. Full-Stack-Entwicklung mit PHP, JavaScript, Python, Monitoring und DevOps.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <QuickFacts />
      <About />
      <Timeline />
      <SoftSkills />
      <Volunteering />
      <TechStack />
      <Projects />
      <FAQ />
      <Contact />
    </>
  );
}