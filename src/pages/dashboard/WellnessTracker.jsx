import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MoodTracker from '../../components/MoodTracker';
import { fetchMoodEntries, addMoodEntryAsync } from '../../store/slices/wellnessSlice';

export default function WellnessTracker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { moodEntries, loading } = useSelector((state) => state.wellness);

  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, twoWeeks, month, quarter, all
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    document.title = 'Wellness Tracker - Ember';
    if (currentUser) {
      dispatch(fetchMoodEntries(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  // Generate chart data based on selected period
  useEffect(() => {
    let filteredEntries = [...moodEntries];
    const now = new Date();
    let daysToShow = 7;

    if (selectedPeriod === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      daysToShow = 7;
      filteredEntries = filteredEntries.filter((entry) => {
        let entryDate;
        try {
          if (entry.timestamp && typeof entry.timestamp.toDate === 'function') {
            entryDate = entry.timestamp.toDate();
          } else if (entry.timestamp) {
            entryDate = new Date(entry.timestamp);
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
        return entryDate >= weekAgo;
      });
    } else if (selectedPeriod === 'twoWeeks') {
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      daysToShow = 14;
      filteredEntries = filteredEntries.filter((entry) => {
        let entryDate;
        try {
          if (entry.timestamp && typeof entry.timestamp.toDate === 'function') {
            entryDate = entry.timestamp.toDate();
          } else if (entry.timestamp) {
            entryDate = new Date(entry.timestamp);
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
        return entryDate >= twoWeeksAgo;
      });
    } else if (selectedPeriod === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      daysToShow = 30;
      filteredEntries = filteredEntries.filter((entry) => {
        let entryDate;
        try {
          if (entry.timestamp && typeof entry.timestamp.toDate === 'function') {
            entryDate = entry.timestamp.toDate();
          } else if (entry.timestamp) {
            entryDate = new Date(entry.timestamp);
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
        return entryDate >= monthAgo;
      });
    } else if (selectedPeriod === 'quarter') {
      const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      daysToShow = 90;
      filteredEntries = filteredEntries.filter((entry) => {
        let entryDate;
        try {
          if (entry.timestamp && typeof entry.timestamp.toDate === 'function') {
            entryDate = entry.timestamp.toDate();
          } else if (entry.timestamp) {
            entryDate = new Date(entry.timestamp);
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
        return entryDate >= quarterAgo;
      });
    }

    // Create chart data points
    const data = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];

      const dayEntries = filteredEntries.filter((entry) => {
        let entryDate;
        try {
          if (entry.timestamp && typeof entry.timestamp.toDate === 'function') {
            entryDate = entry.timestamp.toDate();
          } else if (entry.timestamp) {
            entryDate = new Date(entry.timestamp);
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
        return entryDate.toISOString().split('T')[0] === dateStr;
      });

      const avgMood = dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / dayEntries.length
        : null;

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: dateStr,
        mood: avgMood,
        entries: dayEntries.length,
      });
    }

    setChartData(data);
  }, [moodEntries, selectedPeriod]);

  const getMoodEmoji = (mood) => {
    if (!mood) return '—';
    if (mood <= 1) return '😔';
    if (mood <= 2) return '😐';
    if (mood <= 3) return '🙂';
    if (mood <= 4) return '😊';
    return '😄';
  };

  const stats = {
    average: moodEntries.length > 0
      ? (moodEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / moodEntries.length).toFixed(1)
      : '—',
    highest: moodEntries.length > 0
      ? Math.max(...moodEntries.map((e) => e.mood || 0))
      : '—',
    lowest: moodEntries.length > 0
      ? Math.min(...moodEntries.map((e) => e.mood || 0))
      : '—',
    total: moodEntries.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-vibrant-orange hover:text-vibrant-orange/80 transition-colors mb-4"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-4xl font-bold text-foreground">Wellness Tracker</h1>
            <p className="text-lg text-foreground/70">Monitor your mood and wellness journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mood Logger */}
              <div className="modern-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Log Your Mood</h2>
                <MoodTracker
                  userId={currentUser?.uid}
                  onMoodSubmitted={() => {
                    // Data will be refetched by MoodTracker
                  }}
                />
              </div>

              {/* Chart */}
              <div className="modern-card rounded-2xl p-8 border border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-2xl font-bold text-foreground">Mood History</h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'week', label: 'Week', icon: '📅' },
                      { value: 'twoWeeks', label: '2 Weeks', icon: '📊' },
                      { value: 'month', label: 'Month', icon: '📈' },
                      { value: 'quarter', label: '3 Months', icon: '📉' },
                      { value: 'all', label: 'All Time', icon: '🕐' },
                    ].map((period) => (
                      <button
                        key={period.value}
                        onClick={() => setSelectedPeriod(period.value)}
                        className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                          selectedPeriod === period.value
                            ? 'bg-vibrant-orange text-white shadow-lg shadow-vibrant-orange/30 scale-105'
                            : 'bg-background/50 text-foreground hover:bg-background border border-border/50 hover:border-vibrant-orange/50'
                        }`}
                      >
                        <span>{period.icon}</span>
                        <span className="text-sm">{period.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart Visualization - Line Graph */}
                <div className="mb-8">
                  {chartData.length > 0 ? (
                    <div className="relative w-full h-64 bg-gradient-to-b from-vibrant-orange/5 to-transparent p-4 rounded-lg border border-border/30">
                      {/* Grid Background */}
                      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <line
                            key={`h-${i}`}
                            x1="0"
                            y1={`${((5 - i) / 5) * 100}%`}
                            x2="100%"
                            y2={`${((5 - i) / 5) * 100}%`}
                            stroke="currentColor"
                            className="text-border"
                            strokeDasharray="3,3"
                          />
                        ))}
                      </svg>

                      {/* Y-axis Labels */}
                      <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-foreground/50">
                        <span>5</span>
                        <span>4</span>
                        <span>3</span>
                        <span>2</span>
                        <span>1</span>
                      </div>

                      {/* Line Chart */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                        style={{ paddingLeft: '24px', paddingRight: '12px' }}
                      >
                        {/* Gradient */}
                        <defs>
                          <linearGradient id="moodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F24E1E" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#F24E1E" stopOpacity="0.01" />
                          </linearGradient>
                        </defs>

                        {/* Area under line */}
                        <path
                          d={`M ${chartData
                            .map((point, i) => {
                              const widthPercent = (i / Math.max(chartData.length - 1, 1)) * 100;
                              const heightPercent = point.mood ? ((5 - point.mood) / 5) * 100 : 50;
                              return `${widthPercent}% ${heightPercent}%`;
                            })
                            .join(' L ')} L 100% 100% L 0% 100% Z`}
                          fill="url(#moodGradient)"
                          className="transition-all duration-300"
                        />

                        {/* Line */}
                        <polyline
                          points={chartData
                            .map((point, i) => {
                              const widthPercent = (i / Math.max(chartData.length - 1, 1)) * 100;
                              const heightPercent = point.mood ? ((5 - point.mood) / 5) * 100 : 50;
                              return `${widthPercent}%,${heightPercent}%`;
                            })
                            .join(' ')}
                          fill="none"
                          stroke="#F24E1E"
                          strokeWidth="2.5"
                          vectorEffect="non-scaling-stroke"
                          className="drop-shadow-lg"
                        />

                        {/* Data Points */}
                        {chartData.map((point, i) => {
                          const widthPercent = (i / Math.max(chartData.length - 1, 1)) * 100;
                          const heightPercent = point.mood ? ((5 - point.mood) / 5) * 100 : 50;
                          return (
                            <g key={`point-${i}`} className="group/point cursor-pointer">
                              <circle
                                cx={`${widthPercent}%`}
                                cy={`${heightPercent}%`}
                                r="3"
                                fill="#F24E1E"
                                className="opacity-0 transition-opacity group-hover/point:opacity-100"
                              />
                              <circle
                                cx={`${widthPercent}%`}
                                cy={`${heightPercent}%`}
                                r="4"
                                fill="none"
                                stroke="#F24E1E"
                                strokeWidth="2.5"
                                vectorEffect="non-scaling-stroke"
                                className="opacity-30 transition-all group-hover/point:opacity-100 group-hover/point:r-6"
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {/* X-axis Labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 pb-1 text-xs text-foreground/50 pointer-events-none">
                        <span>{chartData[0]?.date}</span>
                        <span>{chartData[Math.floor(chartData.length / 2)]?.date}</span>
                        <span>{chartData[chartData.length - 1]?.date}</span>
                      </div>

                      {/* Tooltip on Hover */}
                      <div className="absolute -top-10 left-0 flex flex-wrap gap-2 pointer-events-none">
                        {chartData.map((data, i) => (
                          <div
                            key={`tooltip-${i}`}
                            className="group/chart flex-1 min-w-0 flex justify-center"
                          >
                            <div className="absolute -top-12 bg-foreground text-background px-2 py-1 rounded text-xs font-medium opacity-0 group-hover/chart:opacity-100 transition-opacity whitespace-nowrap">
                              {data.mood ? `${data.mood.toFixed(1)}/5` : 'No data'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-background/30 rounded-lg border border-dashed border-border">
                      <p className="text-foreground/50">Start logging your mood to see the chart</p>
                    </div>
                  )}

                  {/* Scale Legend */}
                  <div className="flex items-center justify-between mt-6 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-vibrant-orange"></div>
                      <span className="text-sm text-foreground/60">Mood Trend</span>
                    </div>
                    <div className="flex space-x-4 text-xs text-foreground/60">
                      <span>📊 {chartData.filter((d) => d.mood).length} days tracked</span>
                      <span>•</span>
                      <span>
                        {selectedPeriod === 'week' && '7 days'}
                        {selectedPeriod === 'twoWeeks' && '14 days'}
                        {selectedPeriod === 'month' && '30 days'}
                        {selectedPeriod === 'quarter' && '90 days'}
                        {selectedPeriod === 'all' && 'All entries'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="text-center text-sm text-foreground/60">
                  Showing {chartData.filter((d) => d.mood).length} days with entries
                </div>
              </div>
            </div>

            {/* Sidebar - Stats */}
            <div className="space-y-6">
              {/* Statistics */}
              <div className="modern-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center space-x-2">
                  <Icon name="BarChart3" size={20} className="text-vibrant-orange" />
                  <span>Statistics</span>
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <p className="text-sm text-foreground/60 mb-1">Average Mood</p>
                    <p className="text-3xl font-bold text-vibrant-orange">{stats.average}</p>
                    <p className="text-xs text-foreground/50 mt-1">/5</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Best Mood</p>
                      <p className="text-2xl">{getMoodEmoji(stats.highest)}</p>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Lowest Mood</p>
                      <p className="text-2xl">{getMoodEmoji(stats.lowest)}</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <p className="text-sm text-foreground/60 mb-1">Total Entries</p>
                    <p className="text-3xl font-bold text-vibrant-orange">{stats.total}</p>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="modern-card rounded-2xl p-6 border border-vibrant-orange/20">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Lightbulb" size={20} className="text-vibrant-orange" />
                  <span>Insights</span>
                </h3>
                <div className="space-y-3 text-sm">
                  {moodEntries.length === 0 ? (
                    <p className="text-foreground/70">Start logging your mood to see insights</p>
                  ) : (
                    <>
                      <p className="text-foreground/80">
                        📈 Your average mood is <span className="font-bold text-vibrant-orange">{stats.average}/5</span>
                      </p>
                      <p className="text-foreground/80">
                        ✅ You've logged <span className="font-bold text-vibrant-orange">{stats.total}</span> moods
                      </p>
                      {Number(stats.average) >= 3 ? (
                        <p className="text-foreground/80">
                          🌟 Great job! Keep up the positive momentum
                        </p>
                      ) : (
                        <p className="text-foreground/80">
                          💪 Consider exploring our resources or community support
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Resources */}
              <div className="modern-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="BookOpen" size={20} className="text-vibrant-orange" />
                  <span>Resources</span>
                </h3>
                <div className="space-y-3">
                  <a
                    href="/meditation-and-mindfulness"
                    className="block p-3 rounded-lg bg-background/50 hover:bg-vibrant-orange/10 text-sm font-medium text-foreground hover:text-vibrant-orange transition-colors"
                  >
                    🧘 Meditation Practice
                  </a>
                  <a
                    href="/resource-library"
                    className="block p-3 rounded-lg bg-background/50 hover:bg-vibrant-orange/10 text-sm font-medium text-foreground hover:text-vibrant-orange transition-colors"
                  >
                    📚 Resource Library
                  </a>
                  <a
                    href="/community-garden"
                    className="block p-3 rounded-lg bg-background/50 hover:bg-vibrant-orange/10 text-sm font-medium text-foreground hover:text-vibrant-orange transition-colors"
                  >
                    💬 Community Support
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
