import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { FAQ } from '../components/sections/FAQ';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { QuickFacts } from '../components/sections/QuickFacts';
import { SoftSkills } from '../components/sections/SoftSkills';
import { TechStack } from '../components/sections/TechStack';
import { Timeline } from '../components/sections/Timeline';

export function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <About />
      <Timeline />
      <SoftSkills />
      <TechStack />
      <Projects />
      <FAQ />
      <Contact />
    </>
  );
}