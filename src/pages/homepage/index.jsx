import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TrustBar from './components/TrustBar';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CommunityFeed from './components/CommunityFeed';
import InstagramFeed from './components/InstagramFeed';
import CommunityShowcase from './components/CommunityShowcase';
import SocialProof from '../../components/ui/SocialProof';
import CrisisSupportBanner from './components/CrisisSupportBanner';
import WellnessChatbot from '../../components/WellnessChatbot';

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userDistressLevel, setUserDistressLevel] = useState('normal');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const savedDistressLevel = localStorage.getItem('userDistressLevel') || 'normal';
    setUserDistressLevel(savedDistressLevel);
    return () => clearTimeout(timer);
  }, []);

  const handleBeginJourney = () => {
    console.log('Starting user journey with mood assessment');
    navigate('/chat-interface');
  };

  const handleExploreResources = () => {
    navigate('/resource-library');
  };

  const handleFeatureClick = (route) => navigate(route);
  const handleViewCommunity = () => navigate('/community-garden');

  const getAdaptiveStyles = () => {
    switch (userDistressLevel) {
      case 'crisis':
        return {
          backgroundColor: 'var(--color-error)',
          primaryColor: 'var(--color-error)',
          secondaryColor: 'var(--color-warning)',
        };
      case 'elevated':
        return {
          backgroundColor: 'var(--color-warning)',
          primaryColor: '#f29819',
          secondaryColor: '#f29819',
        };
      default:
        return {
          backgroundColor: 'var(--color-background)',
          primaryColor: '#f29819',
          secondaryColor: '#f29819',
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#f29819] rounded-2xl flex items-center justify-center breathing-pulse shadow-lg mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading Ember</h2>
          <p className="text-muted-foreground">Preparing your wellness journey...</p>
        </div>
      </div>
    );
  }

  const adaptiveStyles = getAdaptiveStyles();

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        '--adaptive-primary': adaptiveStyles?.primaryColor,
        '--adaptive-secondary': adaptiveStyles?.secondaryColor,
      }}
    >
      <Header />
      <main className="pt-16">
        <HeroSection
          onBeginJourney={handleBeginJourney}
          onExploreResources={handleExploreResources}
        />
        <TrustBar />
        <FeaturesSection onFeatureClick={handleFeatureClick} />
        <TestimonialsSection />
        <SocialProof />
        <CommunityShowcase />
        <InstagramFeed />
        <CommunityFeed onViewCommunity={handleViewCommunity} />

        {/* Modern Footer */}
        <footer className="bg-gradient-to-b from-foreground to-black text-white border-t-4 border-gradient-vibrant py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-vibrant shadow-vibrant-glow">
                    <img src="public/assets/images/logo_ember.png" alt="Ember" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold gradient-text">Ember</h3>
                    <p className="text-sm text-white/70">Your Thoughtful Companion</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-medium mb-6">
                  Transforming mental wellness through compassionate AI technology and evidence-based therapeutic approaches.
                </p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-vibrant-orange rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-vibrant-orange">Helping globally</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-vibrant-orange">Features</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="/wellness-dashboard" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Dashboard</a></li>
                  <li><a href="/chat-interface" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Chat Interface</a></li>
                  <li><a href="/resource-library" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Resources</a></li>
                  <li><a href="/community-garden" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Community</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-vibrant-orange">Support</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="/professional-connect" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Find a Therapist</a></li>
                  <li><button onClick={() => window.location.href = "tel:112"} className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Crisis Support (112)</button></li>
                  <li><a href="/contact" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Help Center</a></li>
                  <li><a href="/contact" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Contact Us</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-vibrant-orange">Legal</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="public/assets/words/Privacy Policy.docx" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Privacy Policy</a></li>
                  <li><a href="#" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Terms of Service</a></li>
                  <li><a href="#" className="text-white/80 hover:text-vibrant-orange transition-colors font-medium">Cookie Policy</a></li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-vibrant-orange">Follow Us</h4>
                <div className="space-y-4">
                  <a href="https://instagram.com/embermentalhealth" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-white/80 hover:text-vibrant-pink transition-all hover-lift-vibrant group">
                    <div className="w-10 h-10 rounded-full bg-gradient-instagram flex items-center justify-center group-hover:shadow-instagram-glow">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Instagram</p>
                      <p className="text-xs text-white/60">@embermentalhealth</p>
                    </div>
                  </a>

                  <a href="https://twitter.com/emberhealth" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-white/80 hover:text-blue-400 transition-all hover-lift-vibrant group">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center group-hover:shadow-lg">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.87.387-1.805.66-2.78.775 1-.6 1.77-1.55 2.136-2.684-.937.556-1.974.96-3.077 1.177-.884-.94-2.143-1.528-3.534-1.528-2.676 0-4.845 2.169-4.845 4.845 0 .38.043.75.127 1.107-4.03-.202-7.61-2.132-10.006-5.066-.418.716-.658 1.55-.658 2.443 0 1.68.856 3.162 2.153 4.033-.795-.025-1.543-.244-2.195-.608v.06c0 2.348 1.67 4.31 3.88 4.755-.407.111-.836.17-1.277.17-.312 0-.616-.03-.916-.088.615 1.92 2.41 3.318 4.532 3.36-1.66 1.3-3.75 2.075-6.02 2.075-.39 0-.773-.023-1.15-.068 2.166 1.388 4.736 2.195 7.512 2.195 9.013 0 13.926-7.474 13.926-13.926 0-.213-.005-.424-.015-.634.956-.69 1.785-1.55 2.44-2.532z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Twitter</p>
                      <p className="text-xs text-white/60">@emberhealth</p>
                    </div>
                  </a>

                  <a href="https://linkedin.com/company/ember-wellness" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-white/80 hover:text-blue-300 transition-all hover-lift-vibrant group">
                    <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center group-hover:shadow-lg">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">LinkedIn</p>
                      <p className="text-xs text-white/60">Ember Wellness</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 py-8 mb-8"></div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-white/70 font-medium text-center sm:text-left mb-6 sm:mb-0">
                © {new Date().getFullYear()} Ember. All rights reserved by ByteBusters. | Made with <span className="text-vibrant-orange">❤️</span> for mental wellness.
              </p>

              {/* Social Icons Bottom */}
              <div className="flex items-center space-x-6">
                <a href="https://instagram.com/embermentalhealth" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gradient-instagram flex items-center justify-center hover:shadow-instagram-glow transition-all hover:scale-110">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/emberhealth" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:shadow-lg transition-all hover:scale-110">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.87.387-1.805.66-2.78.775 1-.6 1.77-1.55 2.136-2.684-.937.556-1.974.96-3.077 1.177-.884-.94-2.143-1.528-3.534-1.528-2.676 0-4.845 2.169-4.845 4.845 0 .38.043.75.127 1.107-4.03-.202-7.61-2.132-10.006-5.066-.418.716-.658 1.55-.658 2.443 0 1.68.856 3.162 2.153 4.033-.795-.025-1.543-.244-2.195-.608v.06c0 2.348 1.67 4.31 3.88 4.755-.407.111-.836.17-1.277.17-.312 0-.616-.03-.916-.088.615 1.92 2.41 3.318 4.532 3.36-1.66 1.3-3.75 2.075-6.02 2.075-.39 0-.773-.023-1.15-.068 2.166 1.388 4.736 2.195 7.512 2.195 9.013 0 13.926-7.474 13.926-13.926 0-.213-.005-.424-.015-.634.956-.69 1.785-1.55 2.44-2.532z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/ember-wellness" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:shadow-lg transition-all hover:scale-110">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

<WellnessChatbot userDistressLevel={userDistressLevel} />
      <CrisisSupportBanner />
    </div>
  );
};
export default Homepage;
