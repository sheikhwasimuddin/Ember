import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CommunityShowcase = () => {
  const [activeTab, setActiveTab] = useState('stories');

  const showcaseStories = [
    {
      id: 1,
      author: 'Sarah M.',
      handle: '@sarah_wellness',
      avatar: '👩‍🦰',
      story: 'Found my confidence back through Ember. 90 days of consistent practice!',
      likes: 342,
      timestamp: '2 days ago',
    },
    {
      id: 2,
      author: 'Marcus T.',
      handle: '@wellnesswarrior',
      avatar: '👨‍🦱',
      story: 'Therapy + AI support = the perfect combination. Life-changing experience.',
      likes: 567,
      timestamp: '1 week ago',
    },
    {
      id: 3,
      author: 'Emma L.',
      handle: '@emmas_journey',
      avatar: '👩‍🦳',
      story: 'Breaking my anxiety patterns has never been easier. Grateful for this community!',
      likes: 289,
      timestamp: '3 days ago',
    },
  ];

  const communityUpdates = [
    {
      id: 1,
      type: 'milestone',
      title: 'We hit 10K followers!',
      description: 'Thanks to our amazing community, we\'ve reached 10,000 Instagram followers.',
      icon: 'Award',
    },
    {
      id: 2,
      type: 'challenge',
      title: 'Mindfulness Challenge Week',
      description: '7-day guided meditation and gratitude practice',
      icon: 'Zap',
    },
    {
      id: 3,
      type: 'feature',
      title: 'Client Success Story Featured',
      description: 'Amazing transformation story now published on our blog',
      icon: 'Star',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6 px-6 py-3 bg-vibrant-orange/10 rounded-full border border-vibrant-orange/30">
            <Icon name="TrendingUp" size={20} className="text-vibrant-orange" />
            <span className="text-sm font-bold text-vibrant-orange">Community Highlights</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text-vibrant">Meet Our Community</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-medium">
            Real people, real transformations. See what our community is sharing on Instagram.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'stories'
                ? 'bg-gradient-vibrant text-white shadow-vibrant-glow'
                : 'bg-white border-2 border-vibrant-orange/30 text-vibrant-orange hover:border-vibrant-orange/50'
            }`}
          >
            <Icon name="MessageSquare" size={20} className="inline-block mr-2" />
            Stories
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'updates'
                ? 'bg-gradient-vibrant text-white shadow-vibrant-glow'
                : 'bg-white border-2 border-vibrant-orange/30 text-vibrant-orange hover:border-vibrant-orange/50'
            }`}
          >
            <Icon name="Bell" size={20} className="inline-block mr-2" />
            Updates
          </button>
        </div>

        {/* Content Tabs */}
        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-scale">
            {showcaseStories.map((story, idx) => (
              <div
                key={story.id}
                className="modern-card rounded-2xl p-8 hover-lift-vibrant group shadow-lg"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{story.avatar}</div>
                    <div>
                      <p className="font-bold text-foreground">{story.author}</p>
                      <p className="text-sm text-vibrant-orange font-semibold">{story.handle}</p>
                    </div>
                  </div>
                  <Icon name="Instagram" size={24} className="text-instagram" />
                </div>

                {/* Story */}
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed font-medium italic">
                  "{story.story}"
                </p>

                {/* Engagement */}
                <div className="flex items-center justify-between pt-6 border-t border-vibrant-orange/20">
                  <div className="flex items-center space-x-2 text-vibrant-pink font-semibold">
                    <Icon name="Heart" size={20} className="fill-current" />
                    <span>{story.likes}</span>
                  </div>
                  <span className="text-xs text-foreground/60 font-medium">{story.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-scale">
            {communityUpdates.map((update, idx) => (
              <div
                key={update.id}
                className="modern-card rounded-2xl p-8 hover-lift-vibrant group shadow-lg border-l-4 border-gradient-vibrant"
                style={{ animationDelay: `${idx * 100}ms`, borderLeftColor: '#F24E1E' }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-vibrant flex items-center justify-center mb-6 group-hover:shadow-vibrant-glow transition-all">
                  <Icon name={update.icon} size={28} color="white" className="font-bold" />
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {update.title}
                </h4>
                <p className="text-foreground/80 font-medium mb-6">
                  {update.description}
                </p>

                {/* Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-vibrant-orange/10 rounded-full border border-vibrant-orange/30">
                  <span className="w-2 h-2 bg-vibrant-orange rounded-full"></span>
                  <span className="text-xs font-bold text-vibrant-orange capitalize">
                    {update.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-foreground/80 mb-8 font-medium">
            Want to share your story? Tag us on Instagram!
          </p>
          <a
            href="https://instagram.com/embermentalhealth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-instagram hover:shadow-instagram-glow text-white font-bold rounded-lg transition-all hover:scale-105 transform text-lg"
          >
            <Icon name="Instagram" size={28} />
            <span>Visit Our Instagram</span>
            <Icon name="ExternalLink" size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunityShowcase;
