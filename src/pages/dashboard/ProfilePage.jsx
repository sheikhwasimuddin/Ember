import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { updateUserProfileAsync } from '../../store/slices/userProfileSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { data: userProfile, loading } = useSelector((state) => state.userProfile);

  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    avatar: '👤',
    goals: [],
    interests: [],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'Profile - Ember';
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        bio: userProfile.bio || '',
        avatar: userProfile.avatar || '👤',
        goals: userProfile.goals || [],
        interests: userProfile.interests || [],
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (emoji) => {
    setFormData((prev) => ({
      ...prev,
      avatar: emoji,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    dispatch(updateUserProfileAsync({
      userId: currentUser.uid,
      updateData: formData,
    })).then((result) => {
      if (result.payload) {
        setMessage('Profile updated successfully! ✅');
        setTimeout(() => setMessage(''), 3000);
      }
    });
  };

  const avatarOptions = ['👤', '👨‍🦱', '👩‍🦰', '👨‍🦲', '👩‍🦳', '🧑‍🤝‍🧑', '💃', '🕺', '🧘', '🤸'];
  const goalOptions = [
    'Reduce Anxiety',
    'Improve Sleep',
    'Build Confidence',
    'Manage Stress',
    'Work-Life Balance',
    'Meditation Practice',
    'Better Relationships',
    'Overall Wellness',
  ];
  const interestOptions = [
    'Meditation',
    'Yoga',
    'Journaling',
    'Fitness',
    'Nutrition',
    'Mental Health',
    'Community',
    'Self-Care',
    'Mindfulness',
    'Psychology',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-vibrant-orange hover:text-vibrant-orange/80 transition-colors mb-4"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-4xl font-bold text-foreground">Your Profile</h1>
            <p className="text-lg text-foreground/70">Personalize your Ember experience</p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <Icon name="Check" size={20} className="text-green-500" />
              <p className="text-green-800 font-medium">{message}</p>
            </div>
          )}

          {/* Profile Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="modern-card rounded-2xl p-6 border border-border sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Profile Picture</h3>
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-vibrant flex items-center justify-center text-6xl">
                    {formData.avatar}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground/60 mb-3">Choose an avatar:</p>
                  <div className="grid grid-cols-5 gap-2">
                    {avatarOptions.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleAvatarChange(emoji)}
                        className={`text-2xl p-2 rounded-lg transition-all ${
                          formData.avatar === emoji
                            ? 'bg-vibrant-orange text-white scale-110'
                            : 'bg-background/50 hover:bg-background hover:scale-105'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="modern-card rounded-2xl p-6 border border-border">
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-orange focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Bio */}
                <div className="modern-card rounded-2xl p-6 border border-border">
                  <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-orange focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                  <p className="text-xs text-foreground/50 mt-2">{formData.bio.length}/500 characters</p>
                </div>

                {/* Wellness Goals */}
                <div className="modern-card rounded-2xl p-6 border border-border">
                  <label className="block text-sm font-semibold text-foreground mb-4">Wellness Goals</label>
                  <div className="grid grid-cols-2 gap-3">
                    {goalOptions.map((goal) => (
                      <label
                        key={goal}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.goals.includes(goal)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                goals: [...prev.goals, goal],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                goals: prev.goals.filter((g) => g !== goal),
                              }));
                            }
                          }}
                          className="w-4 h-4 rounded border-border cursor-pointer"
                        />
                        <span className="text-sm text-foreground">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="modern-card rounded-2xl p-6 border border-border">
                  <label className="block text-sm font-semibold text-foreground mb-4">Interests</label>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                interests: [...prev.interests, interest],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                interests: prev.interests.filter((i) => i !== interest),
                              }));
                            }
                          }}
                          className="w-4 h-4 rounded border-border cursor-pointer"
                        />
                        <span className="text-sm text-foreground">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    variant="default"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
