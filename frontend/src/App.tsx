import Header from './components/header.tsx';
import Hero from './components/hero.tsx';
import About from './components/about.tsx';
import Testimonies from './components/testimonies.tsx';
import Footer from './components/footer.tsx';
import Bio from './components/bio.tsx';
import HealthTips from './components/healthTips.tsx';
import Contact from './components/contact.tsx';
import ChatWidget from './components/chatbot.tsx';
import './index.css'
import useScrollReveal from './useScrollReveal.ts';
function App() {
  useScrollReveal();

  return (
    <>
     <ChatWidget/>
    <main>
      <Header/>
      <Hero/>
      <About/>
      <Bio/>
      <Testimonies/>
      <HealthTips/>
      <Contact/>
      <Footer/>
    </main>
    </>

    
  )
}

export default App
