import Header from './components/mainPage/header.tsx';
import Header2 from './components/learnMorePage/header2.tsx';
import Hero from './components/mainPage/hero.tsx';
import About from './components/mainPage/about.tsx';
import Testimonies from './components/learnMorePage/testimonies.tsx';
import Footer from './components/footer.tsx';
import Bio from './components/learnMorePage/bio.tsx';
import HealthTips from './components/learnMorePage/healthTips.tsx';
// import ChatWidget from './components/chatbot.tsx';
import Sources from './components/learnMorePage/sources.tsx';
import Success from './components/success.tsx';
import LegalHeader from './components/legalLinks/legalHeader.tsx';
import Privacy from './components/legalLinks/privacy.tsx';
import Terms from './components/legalLinks/terms.tsx';
import Disclaimer from './components/legalLinks/medicalDisclaimer.tsx';
import Refund from './components/legalLinks/refund.tsx';
import ConsultationGateway from './components/mainPage/consultationGateway.tsx';
import './index.css';

function App() {
  const path = window.location.pathname;
  const isSuccessPage = path === '/success';
  const isLearnMorePage = path === '/learn-more';
  const isGatewayPage = path === '/gateway';
  const isLegalPage = ['/privacy', '/terms', '/disclaimer', '/refunds'].includes(path);

  const renderLegalPage = () => {
    switch (path) {
      case '/privacy':
        return <Privacy />;
      case '/terms':
        return <Terms />;
      case '/disclaimer':
        return <Disclaimer />;
      case '/refunds':
        return <Refund />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (isSuccessPage) {
      return <Success />;
    }

    if (isLegalPage) {
      return (
        <>
          <div className="max-w-4xl mx-auto px-4 py-12">
            <LegalHeader/>
            {renderLegalPage()}
          </div>
          <Footer />
        </>
      );
    }

    if (isLearnMorePage) {
      return (
        <>
          <Header2 />
          {/* <Bio /> */}
          <Sources />
          <Testimonies />
          {/* <HealthTips /> */}
          <Footer />
        </>
      );
    }

    if (isGatewayPage) {
      return (
        <>
          <Header />
          <ConsultationGateway />
          <Footer />
        </>
      );
    }

    // Default Main Page
    return (
      <>
        <Header />
        <Hero />
        <About />
        <Footer />
      </>
    );
  };

  return <main>{renderContent()}</main>;
}

export default App;