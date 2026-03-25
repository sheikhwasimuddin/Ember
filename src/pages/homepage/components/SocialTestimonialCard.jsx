import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialTestimonialCard = ({
  quote,
  author,
  handle,
  location,
  avatar,
  rating = 5,
  category,
  likes = 0,
  comments = 0,
  verified = false,
  featured = false,
  onShare = () => {},
}) => {
  return (
    <div className="modern-card rounded-2xl p-8 shadow-lg hover-lift-vibrant group h-full flex flex-col">
      {/* Instagram-style header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-vibrant-orange/20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-instagram flex items-center justify-center text-2xl">
            {avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-bold text-foreground">{author}</p>
              {verified && <Icon name="CheckCircle" size={16} className="text-vibrant-orange" />}
            </div>
            <p className="text-xs text-instagram">{handle}</p>
          </div>
        </div>
        <Icon name="Instagram" size={24} className="text-instagram" />
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="mb-4 inline-flex items-center space-x-2 px-4 py-2 bg-vibrant-orange/10 rounded-full border border-vibrant-orange/30 w-fit">
          <Icon name="Star" size={16} className="text-vibrant-orange fill-current" />
          <span className="text-xs font-bold text-vibrant-orange">Featured Story</span>
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-lg text-foreground/90 mb-6 leading-relaxed font-medium italic flex-grow">
        "{quote}"
      </blockquote>

      {/* Rating */}
      <div className="flex space-x-1 mb-6">
        {[...Array(rating)].map((_, i) => (
          <Icon key={i} name="Star" size={18} className="text-vibrant-orange fill-current" />
        ))}
      </div>

      {/* Category and Location */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-vibrant-orange/20">
        <div className="flex items-center space-x-2 px-4 py-2 bg-vibrant-orange/5 rounded-full">
          <Icon name="Tag" size={16} className="text-vibrant-orange" />
          <span className="text-sm font-bold text-vibrant-orange">{category}</span>
        </div>
        <div className="flex items-center space-x-2 text-foreground/70 font-medium">
          <Icon name="MapPin" size={16} />
          <span className="text-sm">{location}</span>
        </div>
      </div>

      {/* Engagement Stats and Actions */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-6 text-sm font-semibold">
          <div className="flex items-center space-x-1 text-vibrant-pink">
            <Icon name="Heart" size={16} className="fill-current" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center space-x-1 text-foreground/60">
            <Icon name="MessageCircle" size={16} />
            <span>{comments}</span>
          </div>
        </div>

        <button
          onClick={onShare}
          className="p-2 rounded-full bg-vibrant-orange/10 hover:bg-vibrant-orange/20 text-vibrant-orange transition-all hover:scale-110"
        >
          <Icon name="Share2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SocialTestimonialCard;
