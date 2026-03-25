import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MoodTracker from '../../components/MoodTracker';
import { fetchMoodEntries } from '../../store/slices/wellnessSlice';
import { fetchUserProfile } from '../../store/slices/userProfileSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { data: userProfile } = useSelector((state) => state.userProfile);
  const { moodEntries } = useSelector((state) => state.wellness);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserProfile(currentUser.uid));
      dispatch(fetchMoodEntries(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    document.title = 'Dashboard - Ember';
  }, []);

  const todayMood = moodEntries.length > 0 ? moodEntries[0] : null;
  const weekMoodAverage = moodEntries
    .slice(0, 7)
    .reduce((sum, entry) => sum + (entry.mood || 0), 0) / Math.min(moodEntries.length, 7);

  const getMoodEmoji = (mood) => {
    if (mood <= 1) return '😔';
    if (mood <= 2) return '😐';
    if (mood <= 3) return '🙂';
    if (mood <= 4) return '😊';
    return '😄';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, {currentUser?.displayName || 'Friend'}! 👋
            </h1>
            <p className="text-lg text-foreground/70">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {/* Today's Mood */}
                <div className="modern-card rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-2">{todayMood ? getMoodEmoji(todayMood.mood) : '📝'}</div>
                  <p className="text-sm text-foreground/60 mb-1">Today's Mood</p>
                  <p className="text-xl font-bold text-vibrant-orange">
                    {todayMood ? `${todayMood.mood}/5` : 'Not logged'}
                  </p>
                </div>

                {/* Week Average */}
                <div className="modern-card rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-sm text-foreground/60 mb-1">Week Average</p>
                  <p className="text-xl font-bold text-vibrant-orange">
                    {weekMoodAverage ? weekMoodAverage.toFixed(1) : '--'}/5
                  </p>
                </div>

                {/* Total Entries */}
                <div className="modern-card rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-sm text-foreground/60 mb-1">Total Entries</p>
                  <p className="text-xl font-bold text-vibrant-orange">{moodEntries.length}</p>
                </div>
              </div>

              {/* Mood Tracker Widget */}
              <div className="modern-card rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Log Your Mood</h2>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/dashboard/wellness-tracker')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Detailed Tracking
                  </Button>
                </div>
                <MoodTracker
                  userId={currentUser?.uid}
                  onMoodSubmitted={() => {
                    // Data will be refetched by MoodTracker
                  }}
                />
              </div>

              {/* Recent Activity */}
              <div className="modern-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Recent Mood Entries</h2>
                {moodEntries.length > 0 ? (
                  <div className="space-y-4">
                    {moodEntries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="flex items-start justify-between p-4 bg-background/50 rounded-lg">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                            <p className="font-semibold text-foreground">Mood: {entry.mood}/5</p>
                          </div>
                          {entry.notes && (
                            <p className="text-sm text-foreground/70">{entry.notes}</p>
                          )}
                        </div>
                        <span className="text-xs text-foreground/50">
                          {entry.timestamp?.toDate?.().toLocaleDateString?.() || 'Recent'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-foreground/70 mb-4">No mood entries yet</p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/dashboard/wellness-tracker')}
                    >
                      Start Tracking
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="modern-card rounded-2xl p-6 border border-border">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-vibrant flex items-center justify-center text-3xl mx-auto mb-4">
                    {userProfile?.avatar || '👤'}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{currentUser?.displayName}</h3>
                  <p className="text-sm text-foreground/60">{currentUser?.email}</p>
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate('/dashboard/profile')}
                    iconName="User"
                    iconPosition="left"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate('/dashboard/settings')}
                    iconName="Settings"
                    iconPosition="left"
                  >
                    Settings
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="modern-card rounded-2xl p-6 border border-vibrant-orange/20 border-l-4 border-l-vibrant-orange">
                <h3 className="font-bold text-lg text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Zap" size={20} className="text-vibrant-orange" />
                  <span>Quick Access</span>
                </h3>
                <div className="space-y-3">
                  <a
                    href="/community-garden"
                    className="block p-3 rounded-lg bg-background/50 hover:bg-vibrant-orange/10 transition-colors text-sm font-medium text-foreground hover:text-vibrant-orange"
                  >
                    💬 Community Garden
                  </a>
                  <a
                    href="/meditation-and-mindfulness"
                    className="block p-3 rounded-lg bg-background/50 hover:bg-vibrant-orange/10 transition-colors text-sm font-medium text-foreground hover:text-vibrant-orange"
                  >
                    🧘 Meditation & Mindfulness
                  </a>
                  <a
                    href="/chat-interface"
                    className="block p-3 rounded-lg bg-background/50 hover:bg-vibrant-orange/10 transition-colors text-sm font-medium text-foreground hover:text-vibrant-orange"
                  >
                    🤖 AI Wellness Chat
                  </a>
                  <a
                    href="/professional-connect"
                    className="block p-3 rounded-lg bg-background/50 hover:bg-vibrant-orange/10 transition-colors text-sm font-medium text-foreground hover:text-vibrant-orange"
                  >
                    👨‍⚕️ Professional Connect
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
