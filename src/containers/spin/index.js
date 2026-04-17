import SpinHeroSection from '../../components/spin/SpinHeroSection';
import SpinAboutSection from '../../components/spin/SpinAboutSection';
import SpinUtilitySection from '../../components/spin/SpinUtilitySection';
import SpinTokenomicsSection from '../../components/spin/SpinTokenomicsSection';
import SpinRoadmapSection from '../../components/spin/SpinRoadmapSection';
import SpinTrustSection from '../../components/spin/SpinTrustSection';
import SpinTeamSection from '../../components/spin/SpinTeamSection';
import SpinFAQSection from '../../components/spin/SpinFAQSection';
import SpinFooter from '../../components/spin/SpinFooter';
import SpinNavBar from '../../components/spin/SpinNavBar';

export default function SpinTokenPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0f', marginTop: '-90px' }}>
      <SpinNavBar />
      <SpinHeroSection />
      <SpinAboutSection />
      <SpinUtilitySection />
      <SpinTokenomicsSection />
      <SpinRoadmapSection />
      <SpinTrustSection />
      <SpinTeamSection />
      <SpinFAQSection />
      <SpinFooter />
    </div>
  );
}
