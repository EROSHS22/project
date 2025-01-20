import React, { useState, useEffect } from 'react';
import { ScrollText, Fingerprint, Clock, MapPin, Phone, Mail, ChevronDown, ArrowRight, Shield, Award, Star, X } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'services', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.image-reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleMagneticMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleMagneticLeave = (e) => {
    const { currentTarget: target } = e;
    target.style.transform = '';
  };

  return (
    <div className="min-h-screen bg-[#030303] relative">
      <div className="noise fixed inset-0 z-50 pointer-events-none" />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-xl py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a 
              href="#home" 
              className="text-3xl font-serif font-bold"
            >
              <span className="text-gradient">AJ&S</span>
            </a>

            <div className="hidden md:flex gap-12 items-center">
              {['home', 'services', 'about', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`magnetic-link text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeSection === item
                      ? 'text-amber-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onMouseEnter={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="magnetic-button bg-gradient-to-r from-amber-400 to-amber-600 text-black px-8 py-3 rounded-full text-sm font-semibold hover:from-amber-300 hover:to-amber-500 transition-all duration-300"
                onMouseEnter={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                Get Started
              </a>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <div className="space-y-2">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-30 transition-transform duration-500 ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {['home', 'services', 'about', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-2xl text-white uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/451837014.sd.mp4?s=7a7e37b5b7f5dc0e0ea5f3659c57c5c4f8c72e0d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-4 z-20 pt-20">
          <div className="max-w-5xl mx-auto">
            <div className="overflow-hidden mb-4">
            </div>
            
            <div className="overflow-hidden mb-8">
              <h1 className="text-[12vw] md:text-[8vw] font-serif font-bold leading-none animate-text-reveal">
                <span className="text-gradient-white">AJ&S</span>
                <br />
                <span className="text-gradient">Notary</span>
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-16 mt-16">
              <div className="space-y-8 animate-reveal" style={{ animationDelay: '0.2s' }}>
                <p className="text-xl text-gray-300">
                  Professional notarization and LiveScan services available 7 days a week. 
                  We bring our expertise directly to you with our mobile service.
                </p>
                
                <div className="flex gap-6">
                  <a
                    href="#contact"
                    className="group bg-gradient-to-r from-amber-400 to-amber-600 text-black px-8 py-4 rounded-full hover:from-amber-300 hover:to-amber-500 transition-all duration-300 font-semibold flex items-center gap-2"
                  >
                    Schedule Now
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="relative animate-reveal" style={{ animationDelay: '0.4s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-2xl transform rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
                  alt="Professional workspace"
                  className="rounded-2xl relative z-10 transform -rotate-3 hover:rotate-0 transition-all duration-500 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-12">
          <div className="animate-marquee whitespace-nowrap flex gap-8">
            {Array(10).fill('Available 24/7 • Mobile Service • Licensed & Bonded • ').map((text, i) => (
              <span key={i} className="text-2xl font-serif opacity-20">{text}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="overflow-hidden">
              <h2 className="text-7xl md:text-8xl font-serif font-bold animate-text-reveal">
                Our <span className="text-gradient">Services</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card p-8 rounded-2xl animate-reveal">
              <div className="mb-6">
                <img
                  src="/src/img/2.jpg"
                  alt="Notary services"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="text-amber-400 flex justify-center">
                  <div className="service-icon p-4 rounded-full bg-amber-400/10">
                    <ScrollText className="w-10 h-10" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl text-center font-bold mb-8">Notary Public</h3>
              <ul className="space-y-4">
                {['Loan Documents', 'Power of Attorney', 'Acknowledgements', 'Affidavits', 'Oaths & Affirmations'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-card p-8 rounded-2xl animate-reveal" style={{ animationDelay: '200ms' }}>
              <div className="mb-6">
                <img
                  src="/src/img/3.jpg"
                  alt="LiveScan services"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="text-amber-400 flex justify-center">
                  <div className="service-icon p-4 rounded-full bg-amber-400/10">
                    <Fingerprint className="w-10 h-10" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl text-center font-bold mb-8">LiveScan Services</h3>
              <ul className="space-y-4">
                {['School', 'Volunteer', 'Childcare', 'New Job', 'License', 'Certification'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-card p-8 rounded-2xl animate-reveal" style={{ animationDelay: '400ms' }}>
              <div className="mb-6">
                <img
                  src="/src/img/4.jpg"
                  alt="Forms assistance"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="text-amber-400 flex justify-center">
                  <div className="service-icon p-4 rounded-full bg-amber-400/10">
                    <Clock className="w-10 h-10" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl text-center font-bold mb-8">Forms Assistance</h3>
              <ul className="space-y-4">
                {['Human Services', 'Social Security', 'EDD', 'Personal Review'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
<section id="about" className="py-32 relative overflow-hidden flex items-center justify-center">
  <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
    <div className="max-w-6xl w-full">
      {/* Título centrado */}
      <div className="overflow-hidden mb-16">
        <h2 className="text-7xl md:text-8xl font-serif font-bold animate-text-reveal">
          Why Choose <span className="text-gradient">Us</span>
        </h2>
      </div>

      {/* Contenido centrado */}
      <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
        {/* Columna izquierda */}
        <div className="space-y-8 animate-reveal text-center">
          <div className="mb-8">
            <img
              src="/src/img/5.jpg"
              alt="Professional profile"
              className="w-64 h-64 rounded-full mx-auto object-cover border-4 border-amber-400"
            />
            <h3 className="text-2xl font-bold mt-4">Jesus Diaz</h3>
          </div>
          {[
            'Licensed and certified notary public with years of experience',
            'Mobile service available - we come to you',
            'Fast turnaround times and flexible scheduling',
            'Professional and confidential service',
          ].map((text, index) => (
            <div key={index} className="flex items-center gap-4 group justify-center">
              <div className="p-1 rounded-full bg-amber-400/20 group-hover:bg-amber-400/40 transition-colors">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <p className="text-xl text-gray-300 group-hover:text-white transition-colors">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Columna derecha */}
        <div
          className="grid grid-cols-2 gap-4 animate-reveal items-center justify-center"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Puedes agregar más contenido aquí si lo necesitas */}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="overflow-hidden">
                <h2 className="text-7xl md:text-8xl font-serif font-bold animate-text-reveal">
                  Get in <span className="text-gradient">Touch</span>
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="service-card p-8 rounded-2xl animate-reveal">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <div className="space-y-6">
                <ContactItem
                    icon={Phone}
                    text="(831) 2621833"
                    href="tel:+18312621833"
                  />
                  <ContactItem
                    icon={Phone}
                    text="(559) 537-5609"
                    href="tel:+15595375609"
                  />
                  <ContactItem
                    icon={Mail}
                    text="jediaz905@gmail.com"
                    href="mailto:jediaz905@gmail.com"
                  />
                  <ContactItem
                    icon={MapPin}
                    text="Mobile Service Available"
                  />


                </div>
              </div>

              <div className="service-card p-8 rounded-2xl animate-reveal" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-bold mb-8">Service Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Saturday - Sunday</span>
                    <span>By Appointment</span>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-amber-400 font-semibold">
                      $25.00 Rolling Fee + Government Fee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © {new Date().getFullYear()} AJ&S Notary. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <p className="text-amber-400">Notary Public #2466850</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, items, delay = 0 }) {
  return (
    <div
      className="service-card p-8 rounded-2xl animate-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-amber-400 mb-6 flex justify-center">
        <div className="service-icon p-4 rounded-full bg-amber-400/10">
          <Icon className="w-10 h-10" />
        </div>
      </div>
      <h3 className="text-2xl text-center font-bold mb-8">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-3 group">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
            <span className="text-gray-300 group-hover:text-white transition-colors">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ icon: Icon, text, href }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors">
        <Icon className="w-6 h-6 text-amber-400" />
      </div>
      {href ? (
        <a
          href={href}
          className="text-lg text-gray-300 hover:text-amber-400 transition-colors"
        >
          {text}
        </a>
      ) : (
        <p className="text-lg text-gray-300">{text}</p>
      )}
    </div>
  );
}

export default App;