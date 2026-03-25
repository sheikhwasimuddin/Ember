import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './ui/Button';
import Icon from './AppIcon';
import { addMoodEntryAsync, fetchMoodEntries } from '../store/slices/wellnessSlice';

export default function MoodTracker({ userId, onMoodSubmitted }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.wellness);

  const [mood, setMood] = useState(null);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const moodOptions = [
    { value: 1, emoji: '😔', label: 'Very Bad' },
    { value: 2, emoji: '😐', label: 'Bad' },
    { value: 3, emoji: '🙂', label: 'Okay' },
    { value: 4, emoji: '😊', label: 'Good' },
    { value: 5, emoji: '😄', label: 'Great' },
  ];

  const activityOptions = [
    'Exercise', 'Meditation', 'Reading', 'Socializing',
    'Work', 'Rest', 'Creative', 'Outdoor', 'Hobby'
  ];

  const handleActivityToggle = (activity) => {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!mood) {
      setError('Please select a mood');
      return;
    }

    if (!userId) {
      setError('User ID missing - please login again');
      console.error('No userId provided to MoodTracker');
      return;
    }

    const moodData = {
      mood,
      notes: notes.trim(),
      activities,
      energyLevel: mood,
    };

    console.log('Submitting mood entry:', { userId, moodData });

    try {
      const result = await dispatch(addMoodEntryAsync({
        userId,
        moodData,
      }));

      console.log('Mood submission result:', result);

      if (result.type === 'wellness/addMoodEntry/fulfilled') {
        setSubmitted(true);
        setMood(null);
        setNotes('');
        setActivities([]);

        // Refetch mood entries after submission
        setTimeout(() => {
          console.log('Refetching mood entries for user:', userId);
          dispatch(fetchMoodEntries(userId));
          setSubmitted(false);
          if (onMoodSubmitted) onMoodSubmitted();
        }, 500);
      } else if (result.type === 'wellness/addMoodEntry/rejected') {
        setError(`Failed to save mood: ${result.payload}`);
        console.error('Mood submission failed:', result.payload);
      }
    } catch (err) {
      const errorMsg = err?.message || 'Unknown error occurred';
      setError(`Error: ${errorMsg}`);
      console.error('Mood submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
          <Icon name="Check" size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-800">Mood logged successfully! 🎉 Updating data...</p>
          </div>
        </div>
      )}

      {/* Mood Selection */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-4">How are you feeling?</label>
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setMood(option.value);
                setError(null);
              }}
              className={`p-4 rounded-lg transition-all duration-300 flex flex-col items-center space-y-2 ${
                mood === option.value
                  ? 'bg-vibrant-orange text-white scale-110 shadow-lg'
                  : 'bg-background/50 hover:bg-background border border-border'
              }`}
            >
              <span className="text-3xl">{option.emoji}</span>
              <span className="text-xs font-medium text-center hidden sm:block">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">What did you do today?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {activityOptions.map((activity) => (
            <button
              key={activity}
              type="button"
              onClick={() => handleActivityToggle(activity)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activities.includes(activity)
                  ? 'bg-vibrant-orange text-white'
                  : 'bg-background/50 text-foreground border border-border hover:border-vibrant-orange'
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you really feeling? What's on your mind?"
          className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-orange focus:border-transparent transition-all resize-none"
          rows={4}
        />
        <p className="text-xs text-foreground/50 mt-1">{notes.length}/500 characters</p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={!mood || loading}
        iconName="Send"
        iconPosition="right"
      >
        {loading ? 'Saving...' : 'Log Mood Entry'}
      </Button>
    </form>
  );
}
