import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityInstagram = () => {
  const communityPosts = [
    {
      id: 1,
      author: 'Alex J.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=400&fit=crop',
      likes: 456,
      comments: 34,
      caption: 'Day 30 of my wellness journey! The community here has been incredible 💚 #EmberCommunity',
      hashtags: ['#MentalHealth', '#Recovery', '#CommunityMatters'],
    },
    {
      id: 2,
      author: 'Jordan M.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      likes: 678,
      comments: 52,
      caption: 'Completed the 7-day wellness challenge with the Ember community! Feeling stronger every day 🌱',
      hashtags: ['#WellnessChallenge', '#Progress', '#MentalWellness'],
    },
    {
      id: 3,
      author: 'Sam T.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      likes: 523,
      comments: 41,
      caption: 'This community saved me. Thank you Ember for creating a safe space 💜 #MentalHealthMatters',
      hashtags: ['#MentalHealthAwareness', '#Support', '#EmberFam'],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-vibrant-orange/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-vibrant-orange/10 rounded-full border border-vibrant-orange/30">
            <Icon name="Instagram" size={24} className="text-instagram animate-glow-bounce" />
            <span className="font-bold text-vibrant-orange">Share Your Story</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text-vibrant">Community Stories on Instagram</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-medium">
            Tag us with <span className="font-bold text-vibrant-orange">#EmberCommunity</span> to feature your wellness journey and inspire others
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="group modern-card rounded-2xl overflow-hidden shadow-lg hover:shadow-instagram-glow transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-6">
                  <div className="flex items-center space-x-8 text-white">
                    <div className="flex items-center space-x-2">
                      <Icon name="Heart" size={24} className="fill-current text-pink-500" />
                      <span className="text-xl font-bold">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MessageCircle" size={24} />
                      <span className="text-xl font-bold">{post.comments}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-white text-instagram font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    View Post
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white/95 backdrop-blur">
                {/* Author */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-vibrant flex items-center justify-center text-white text-sm font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{post.author}</p>
                    <p className="text-xs text-vibrant-orange">@ember_community</p>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-sm text-foreground/90 mb-4 leading-relaxed line-clamp-3">
                  {post.caption}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {post.hashtags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-semibold text-vibrant-orange hover:text-vibrant-pink transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="p-8 modern-card rounded-2xl bg-gradient-to-r from-vibrant-orange/10 to-vibrant-pink/10 border border-vibrant-orange/20 text-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground">
            Ready to Share Your Story?
          </h3>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Post your wellness journey on Instagram and tag <span className="font-bold text-vibrant-orange">@embermentalhealth</span> with <span className="font-bold text-vibrant-orange">#EmberCommunity</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://instagram.com/embermentalhealth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-10 py-4 bg-gradient-instagram hover:shadow-instagram-glow text-white font-bold rounded-lg transition-all hover:scale-105 transform text-lg"
            >
              <Icon name="Instagram" size={28} />
              <span>Follow us on Instagram</span>
              <Icon name="ExternalLink" size={24} />
            </a>
            <span className="text-foreground/60 font-medium">or</span>
            <a
              href="https://instagram.com/explore/tags/EmberCommunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-vibrant-orange text-vibrant-orange font-bold rounded-lg hover:bg-vibrant-orange/10 transition-all"
            >
              <Icon name="Hashtag" size={20} />
              <span>View #EmberCommunity</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityInstagram;
