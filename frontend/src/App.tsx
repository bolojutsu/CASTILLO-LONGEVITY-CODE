import Header from './components/mainPage/header.tsx';
import Header2 from './components/learnMorePage/header2.tsx';
import Hero from './components/mainPage/hero.tsx';
import About from './components/mainPage/about.tsx';
import Testimonies from './components/learnMorePage/testimonies.tsx';
import Footer from './components/footer.tsx';
import Bio from './components/learnMorePage/bio.tsx';
import HealthTips from './components/learnMorePage/healthTips.tsx';
// import ChatWidget from './components/chatbot.tsx';
import Success from './components/success.tsx';
import Privacy from './components/legalLinks/privacy.tsx';
import Terms from './components/legalLinks/terms.tsx';
import Disclaimer from './components/legalLinks/medicalDisclaimer.tsx';
import Refund from './components/legalLinks/refund.tsx';
import ConsultationGateway from './components/mainPage/consultationGateway.tsx';
import './index.css'

function App() {
  const path  = window.location.pathname;
  const isSuccessPage = window.location.pathname === '/success';
  const isLearnMorePage = path === '/learn-more';

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

  const isLegalPage = ['/privacy', '/terms', '/disclaimer', '/refunds'].includes(path);

  return (
    <main>
      {isSuccessPage ? (
        <Success />
      ) : isLegalPage ? (
        /* Legal page layout with standard header/footer */
        <>
          <Header2 />
          <div className="max-w-4xl mx-auto px-4 py-12">
            {renderLegalPage()}
          </div>
          <Footer />
        </>
      ) : isLearnMorePage ? (
        <>
          <Header2 />
          <Bio />
          <Testimonies />
          <HealthTips />
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <Hero />
          <About />
          <ConsultationGateway />
          <Footer />
        </>
      )}
    </main>
  );
}

export default App
