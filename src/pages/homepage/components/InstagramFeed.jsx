import React from 'react';
import Icon from '../../../components/AppIcon';

const InstagramFeed = ({ instagramProfile = '@embermentalhealth' }) => {
  // Mock Instagram posts
  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=400&fit=crop',
      likes: 1234,
      comments: 89,
      caption: 'Starting your day mindfully 🧘‍♀️ #MentalWellness',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      likes: 2156,
      comments: 143,
      caption: 'Community stories that inspire change 💚 #EmberCommunity',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      likes: 1876,
      comments: 112,
      caption: 'Your wellness journey matters #MentalHealth',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      likes: 2043,
      comments: 156,
      caption: 'Together we grow stronger 🌱 #MentalHealthMatters',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      likes: 1654,
      comments: 98,
      caption: 'Breaking stigma, one story at a time 💪',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=400&fit=crop',
      likes: 2289,
      comments: 167,
      caption: 'Your mental health is a priority 💙',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-instagram flex items-center justify-center shadow-instagram-glow animate-glow-bounce">
              <Icon name="Instagram" size={28} color="white" className="font-bold" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Follow Our Instagram</h2>
          </div>

          <h3 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">Community Stories & Updates</span>
          </h3>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-medium mb-8">
            Join {instagramProfile && `${instagramProfile} on`} Instagram to see daily wellness tips, community stories, and inspiring moments from our Ember family.
          </p>

          {/* Follow Button */}
          <a
            href="https://instagram.com/embermentalhealth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-instagram hover:shadow-instagram-glow text-white font-bold rounded-lg transition-all hover:scale-105 transform"
          >
            <Icon name="Instagram" size={24} />
            <span>Follow @embermentalhealth</span>
            <Icon name="ExternalLink" size={20} />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-instagram-glow transition-all duration-300 hover:scale-105 transform cursor-pointer"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-6">
                {/* Stats */}
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

                {/* Caption */}
                <p className="text-center text-white font-semibold px-4 max-w-xs line-clamp-2">
                  {post.caption}
                </p>

                {/* View Button */}
                <button className="px-6 py-2 bg-white text-vibrant-instagram font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  View Post
                </button>
              </div>

              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-instagram opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ zIndex: -1 }}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-12 modern-card rounded-3xl bg-gradient-to-r from-vibrant-orange/10 to-vibrant-pink/10 border border-vibrant-orange/20">
          <h4 className="text-2xl font-bold text-foreground mb-4">
            Share Your Story With Us
          </h4>
          <p className="text-lg text-foreground/80 mb-8 font-medium">
            Tag us on Instagram with #EmberWellness to showcase your wellness journey
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-vibrant text-white font-bold rounded-lg hover:shadow-vibrant-glow transition-all hover:scale-105"
            >
              Tag Us on Instagram
            </a>
            <span className="text-foreground/60 font-semibold">#EmberWellness #MentalHealthMatters</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
