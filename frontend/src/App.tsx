import Header from './components/header.tsx';
import Hero from './components/hero.tsx';
import About from './components/about.tsx';
import Testimonies from './components/testimonies.tsx';
import Footer from './components/footer.tsx';
import Bio from './components/bio.tsx';
import HealthTips from './components/healthTips.tsx';
import Contact from './components/contact.tsx';
import ChatWidget from './components/chatbot.tsx';
import Pricing from './components/pricing.tsx';
import Success from './components/success.tsx';
import './index.css'
import useScrollReveal from './useScrollReveal.ts';
function App() {
  useScrollReveal();


  const isSuccessPage = window.location.pathname === '/success';

  return (
    <>
     <ChatWidget/>
    <main>
      {isSuccessPage ? (
          // 3. Show only the success screen if they just finished paying
          <Success />
        ) : (
          // 4. Otherwise, show your normal single-page website
          <>
            <Header />
            <Hero />
            <About />
            <Bio />
            <Testimonies />
            <HealthTips />
            <Pricing />
            <Contact />
            <Footer />
          </>
        )}
    </main>
    </>

    
  )
}

export default App
