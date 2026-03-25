import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { logoutAsync } from '../../store/slices/authSlice';
import { updateUserProfileAsync } from '../../store/slices/userProfileSlice';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { data: userProfile } = useSelector((state) => state.userProfile);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    moodReminders: true,
    communityUpdates: true,
    profilePublic: false,
    dataSharing: false,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'Settings - Ember';
    if (userProfile?.preferences) {
      setPreferences((prev) => ({
        ...prev,
        ...userProfile.preferences,
      }));
    }
  }, [userProfile]);

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    dispatch(updateUserProfileAsync({
      userId: currentUser.uid,
      updateData: { preferences },
    })).then(() => {
      setMessage('Settings saved successfully! ✅');
      setTimeout(() => setMessage(''), 3000);
    });
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logoutAsync()).then(() => {
        navigate('/login');
      });
    }
  };

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
            <h1 className="text-4xl font-bold text-foreground">Settings</h1>
            <p className="text-lg text-foreground/70">Manage your preferences and account</p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <Icon name="Check" size={20} className="text-green-500" />
              <p className="text-green-800 font-medium">{message}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Notification Preferences */}
            <div className="modern-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-3">
                <Icon name="Bell" size={24} className="text-vibrant-orange" />
                <span>Notification Preferences</span>
              </h2>
              <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Email Notifications</p>
                    <p className="text-sm text-foreground/60">Receive emails about your account activity</p>
                  </div>
                  <button
                    onClick={() => handleToggle('emailNotifications')}
                    className={`w-12 h-7 rounded-full flex items-center transition-colors ${
                      preferences.emailNotifications ? 'bg-vibrant-orange' : 'bg-border'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transition-transform ${
                        preferences.emailNotifications ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Mood Reminders */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Daily Mood Reminders</p>
                    <p className="text-sm text-foreground/60">Get reminded to log your daily mood</p>
                  </div>
                  <button
                    onClick={() => handleToggle('moodReminders')}
                    className={`w-12 h-7 rounded-full flex items-center transition-colors ${
                      preferences.moodReminders ? 'bg-vibrant-orange' : 'bg-border'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transition-transform ${
                        preferences.moodReminders ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Community Updates */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Community Updates</p>
                    <p className="text-sm text-foreground/60">Get notified about community events</p>
                  </div>
                  <button
                    onClick={() => handleToggle('communityUpdates')}
                    className={`w-12 h-7 rounded-full flex items-center transition-colors ${
                      preferences.communityUpdates ? 'bg-vibrant-orange' : 'bg-border'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transition-transform ${
                        preferences.communityUpdates ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="modern-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-3">
                <Icon name="Shield" size={24} className="text-vibrant-orange" />
                <span>Privacy Settings</span>
              </h2>
              <div className="space-y-4">
                {/* Public Profile */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Public Profile</p>
                    <p className="text-sm text-foreground/60">Allow others to view your profile</p>
                  </div>
                  <button
                    onClick={() => handleToggle('profilePublic')}
                    className={`w-12 h-7 rounded-full flex items-center transition-colors ${
                      preferences.profilePublic ? 'bg-vibrant-orange' : 'bg-border'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transition-transform ${
                        preferences.profilePublic ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Data Sharing */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Share Anonymized Data</p>
                    <p className="text-sm text-foreground/60">Help improve Ember by sharing usage data</p>
                  </div>
                  <button
                    onClick={() => handleToggle('dataSharing')}
                    className={`w-12 h-7 rounded-full flex items-center transition-colors ${
                      preferences.dataSharing ? 'bg-vibrant-orange' : 'bg-border'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transition-transform ${
                        preferences.dataSharing ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
              <Button
                variant="default"
                className="w-full mt-6"
                onClick={handleSavePreferences}
              >
                Save Preferences
              </Button>
            </div>

            {/* Account Management */}
            <div className="modern-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-3">
                <Icon name="Lock" size={24} className="text-vibrant-orange" />
                <span>Account Management</span>
              </h2>
              <div className="space-y-4">
                {/* Account Info */}
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-sm text-foreground/60 mb-2">Email Address</p>
                  <p className="font-semibold text-foreground">{currentUser?.email}</p>
                </div>

                {/* Change Password */}
                <Button
                  variant="outline"
                  className="w-full"
                  iconName="Key"
                  iconPosition="left"
                >
                  Change Password
                </Button>

                {/* Download Data */}
                <Button
                  variant="outline"
                  className="w-full"
                  iconName="Download"
                  iconPosition="left"
                >
                  Download My Data
                </Button>

                {/* Delete Account */}
                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete Account
                </Button>
              </div>
            </div>

            {/* Logout */}
            <div className="modern-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Logout</h2>
              <p className="text-foreground/70 mb-6">Sign out from your account</p>
              <Button
                variant="default"
                className="w-full"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="right"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
