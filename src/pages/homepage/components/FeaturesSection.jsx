import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturesSection = ({ onFeatureClick }) => {
  const features = [
    {
      id: 'ai-checkins',
      icon: 'MessageCircle',
      title: 'AI-Powered Check-ins',
      description: 'Daily mood tracking with intelligent insights and personalized recommendations based on your emotional patterns.',
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?w=400&h=300&fit=crop',
      benefits: ['Emotion detection', 'Pattern recognition', 'Personalized insights', 'Progress tracking'],
      route: '/chat-interface'
    },
    {
      id: 'wellness-plans',
      icon: 'TrendingUp',
      title: 'Personalized Wellness Plans',
      description: 'Customized mental health strategies tailored to your unique needs, goals, and progress milestones.',
      image: 'https://img.freepik.com/free-photo/wellness-diet-plan-healthy-living-icon_53876-121317.jpg?semt=ais_hybrid&w=740&q=80',
      benefits: ['Custom goal setting', 'Progress visualization', 'Adaptive strategies', 'Milestone celebrations'],
      route: '/wellness-dashboard'
    },
    {
      id: 'professional-bridge',
      icon: 'UserCheck',
      title: 'Professional Bridge',
      description: 'Seamless connection to licensed therapists with AI-powered matching based on your specific needs and preferences.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
      benefits: ['Therapist matching', 'Session preparation', 'Continuity of care', 'Professional credentials'],
      route: '/professional-connect'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
            <span className="gradient-text-vibrant">Your Complete Mental Wellness Toolkit</span>
          </h2>
          <p className="text-xl sm:text-2xl text-foreground/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Combining cutting-edge AI technology with evidence-based therapeutic approaches
            to support your journey toward better mental health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="modern-card-gradient shadow-lg hover:shadow-social-lift group relative"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-instagram opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: -1 }}></div>

              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <Image
                  src={feature?.image}
                  alt={feature?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center shadow-vibrant-glow animate-glow-bounce"
                    style={{ background: 'linear-gradient(135deg, #F24E1E, #833AB4)' }}
                  >
                    <Icon name={feature?.icon} size={28} color="white" className="font-bold" />
                  </div>
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-vibrant-orange">
                    Featured
                  </span>
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-8 bg-white/95 backdrop-blur rounded-b-2xl">
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-vibrant-orange transition-colors duration-300">
                  {feature?.title}
                </h3>
                <p className="text-foreground/80 mb-6 leading-relaxed font-medium">
                  {feature?.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3 mb-8">
                  {feature?.benefits?.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-vibrant flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} color="white" className="font-bold" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onFeatureClick(feature?.route)}
                  className="w-full bg-gradient-vibrant hover:shadow-vibrant-glow text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 transform"
                >
                  <span>Explore Feature</span>
                  <Icon name="ArrowRight" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-8 modern-card rounded-2xl hover-lift-vibrant group">
            <div className="w-16 h-16 rounded-full bg-gradient-vibrant flex items-center justify-center mx-auto mb-4 group-hover:shadow-vibrant-glow transition-all">
              <Icon name="BookOpen" size={32} color="white" className="font-bold" />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-3 group-hover:text-vibrant-orange transition-colors">Resource Library</h4>
            <p className="text-sm text-foreground/70 font-medium">CBT exercises, mindfulness practices, and educational content</p>
          </div>

          <div className="text-center p-8 modern-card rounded-2xl hover-lift-vibrant group">
            <div className="w-16 h-16 rounded-full bg-gradient-vibrant flex items-center justify-center mx-auto mb-4 group-hover:shadow-vibrant-glow transition-all">
              <Icon name="Users" size={32} color="white" className="font-bold" />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-3 group-hover:text-vibrant-orange transition-colors">Community Garden</h4>
            <p className="text-sm text-foreground/70 font-medium">Anonymous peer support and shared experiences</p>
          </div>

          <div className="text-center p-8 modern-card rounded-2xl hover-lift-vibrant group">
            <div className="w-16 h-16 rounded-full bg-gradient-vibrant flex items-center justify-center mx-auto mb-4 group-hover:shadow-vibrant-glow transition-all">
              <Icon name="Shield" size={32} color="white" className="font-bold" />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-3 group-hover:text-vibrant-orange transition-colors">Crisis Support</h4>
            <p className="text-sm text-foreground/70 font-medium">Immediate intervention and emergency resources</p>
          </div>

          <div className="text-center p-8 modern-card rounded-2xl hover-lift-vibrant group">
            <div className="w-16 h-16 rounded-full bg-gradient-vibrant flex items-center justify-center mx-auto mb-4 group-hover:shadow-vibrant-glow transition-all">
              <Icon name="BarChart3" size={32} color="white" className="font-bold" />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-3 group-hover:text-vibrant-orange transition-colors">Progress Analytics</h4>
            <p className="text-sm text-foreground/70 font-medium">Visual insights and pattern recognition</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
