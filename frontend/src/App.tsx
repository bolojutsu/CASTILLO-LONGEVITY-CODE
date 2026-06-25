import Header from './components/header.tsx';
import Hero from './components/hero.tsx';
import About from './components/about.tsx';
import Testimonies from './components/testimonies.tsx';
import Footer from './components/footer.tsx';
import Bio from './components/bio.tsx';
import HealthTips from './components/healthTips.tsx';
import ChatWidget from './components/chatbot.tsx';
import Success from './components/success.tsx';
import ConsultationGateway from './components/consultationGateway.tsx';
import './index.css'

function App() {
  const path  = window.location.pathname;
  const isSuccessPage = window.location.pathname === '/success';
  const isLearnMorePage = path === '/learn-more';

  return (
    <>
      <ChatWidget />
      <main>
        {isSuccessPage ? (
          <Success />
        ) : isLearnMorePage ? (
          /* Render only the requested components for the Learn More page */
          <>
            <Header />
            <Bio />
            <Testimonies />
            <HealthTips />
            <Footer />
          </>
        ) : (
          /* Your normal single-page website landing view */
          <>
            <Header />
            <Hero />
            <About />
            <ConsultationGateway />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}

export default App
