import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import CommunityHeader from './components/CommunityHeader';
import ForumCard from './components/ForumCard';
import DiscussionThread from './components/DiscussionThread';
import CommunityStats from './components/CommunityStats';
import GroupChallenges from './components/GroupChallenges';
import SuccessStories from './components/SuccessStories';
import CreatePostModal from './components/CreatePostModal';
import CommunityInstagram from './components/CommunityInstagram';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import mock data from the new file with the .js extension
import { 
  forums as initialForums, 
  discussionThreads as initialDiscussionThreads, 
  communityStats, 
  groupChallenges as initialGroupChallenges, 
  successStories 
} from "./mockData.js";

// New component for the Reply Modal
const ReplyModal = ({ isOpen, onClose, threadId, onReplySubmit, threadTitle }) => {
  const [replyContent, setReplyContent] = useState('');
  
  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReplySubmit(threadId, replyContent);
      setReplyContent('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="MessageCircle" size={20} className="text-therapeutic-primary" />
            <span>Reply to Discussion</span>
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        <form onSubmit={handleSubmitReply} className="p-6 space-y-4">
          <div className="text-sm text-muted-foreground">
            Replying to: 
            <span className="font-medium text-foreground ml-1">{threadTitle}</span>
          </div>
          <div>
            <textarea
              className="w-full min-h-[100px] p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" iconName="Send" iconPosition="right" disabled={!replyContent.trim()}>
              Send Reply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


const CommunityGarden = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [threadToReplyTo, setThreadToReplyTo] = useState(null);
  
  // State for dynamic data
  const [forums] = useState(initialForums);
  const [threads, setThreads] = useState(initialDiscussionThreads);
  const [challenges, setChallenges] = useState(initialGroupChallenges);

  // State for filtering and detailed views
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);

  const filteredThreads = useMemo(() => {
    if (!selectedForum) {
      return threads;
    }
    return threads.filter(thread => thread.forumId === selectedForum);
  }, [selectedForum, threads]);

  const handleCreatePost = () => setIsCreatePostModalOpen(true);

  const handleJoinChallenge = (challengeId) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => 
        challenge.id === challengeId ? { ...challenge, isJoined: true, participants: challenge.isJoined ? challenge.participants : challenge.participants + 1 } : challenge
      )
    );
    console.log(`Joined challenge: ${challengeId}`);
  };

  const handleJoinForum = (forumId) => {
    setSelectedForum(forumId);
    setActiveTab('discussions');
    setSelectedThread(null);
  };

  const handleViewThread = (threadId) => {
    const thread = threads.find(t => t.id === threadId);
    setSelectedThread(thread);
  };
  
  const handleBackToThreads = () => {
    setSelectedThread(null);
  }

  const handleShareStory = () => setIsCreatePostModalOpen(true);

  const handleSubmitPost = (postData) => {
    const newThread = {
      id: Date.now(),
      forumId: postData.forum,
      title: postData.title,
      author: postData.isAnonymous ? "Anonymous User" : "You",
      mood: postData.mood,
      preview: postData.content,
      timestamp: new Date(),
      replyCount: 0,
      supportCount: 0,
      viewCount: 0,
      hasTriggerWarning: postData.hasTriggerWarning,
      replies: []
    };
    setThreads(prevThreads => [newThread, ...prevThreads]);
    setIsCreatePostModalOpen(false);
    setActiveTab('discussions');
    setSelectedForum(postData.forum);
  };
  
  const handleReply = (threadId) => {
    const thread = threads.find(t => t.id === threadId);
    setThreadToReplyTo(thread);
    setIsReplyModalOpen(true);
  };
  
  const handleReplySubmit = (threadId, content) => {
    const newReply = {
      id: Date.now(),
      author: 'You', // This could be dynamic based on user login
      content,
      timestamp: new Date(),
    };

    setThreads(prevThreads =>
      prevThreads.map(thread =>
        thread.id === threadId 
          ? { 
              ...thread, 
              replies: [...(thread.replies || []), newReply],
              replyCount: (thread.replies ? thread.replies.length : 0) + 1,
              lastReply: { author: newReply.author, timestamp: newReply.timestamp }
            } 
          : thread
      )
    );
  };

  const handleSupport = (threadId) => {
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId ? { ...thread, supportCount: thread.supportCount + 1 } : thread
      )
    );
  };

  const resetForumFilter = () => {
    setSelectedForum(null);
  }

  useEffect(() => {
    document.title = 'Community Garden - Ember';
  }, []);

  const tabs = [
    { id: 'forums', label: 'Support Forums', icon: 'MessageSquare' },
    { id: 'discussions', label: 'Recent Discussions', icon: 'MessageCircle' },
    { id: 'challenges', label: 'Group Challenges', icon: 'Trophy' },
    { id: 'stories', label: 'Success Stories', icon: 'Star' }
  ];

  const renderDiscussions = () => {
    if (selectedThread) {
      // --- DETAILED THREAD VIEW ---
      return (
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToThreads} 
            className="mb-4"
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Discussions
          </Button>
          <div className="bg-card border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">{selectedThread.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <span>Posted by <strong>{selectedThread.author}</strong></span>
              <span>•</span>
              <span>{new Date(selectedThread.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-foreground whitespace-pre-wrap">{selectedThread.preview}</p>
            <div className="mt-6 pt-4 border-t border-border">
              <h3 className="font-semibold text-lg mb-4">Replies ({selectedThread.replies?.length})</h3>
              <div className="space-y-4">
                {selectedThread.replies?.map(reply => (
                  <div key={reply.id} className="border-l-2 border-border pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground">{reply.author}</span>
                      <span className="text-xs text-muted-foreground">• {new Date(reply.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // --- LIST OF THREADS VIEW ---
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className='flex items-center gap-2'>
            <h2 className="text-xl font-semibold text-foreground">
              {selectedForum ? `${forums.find(f => f.id === selectedForum)?.name}` : 'All Recent Discussions'}
            </h2>
            {selectedForum && (
               <Button variant="ghost" size="sm" onClick={resetForumFilter}>Show All</Button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreatePost}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
          >
            New Discussion
          </Button>
        </div>
        {filteredThreads.map((thread) => (
          <DiscussionThread
            key={thread.id}
            thread={thread}
            onViewThread={handleViewThread}
            onReply={handleReply}
            onSupport={handleSupport}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CommunityHeader 
            onCreatePost={handleCreatePost}
            onJoinChallenge={() => setActiveTab('challenges')}
          />

          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedThread(null);
                    }}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-bold text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'border-vibrant-orange text-vibrant-orange shadow-vibrant-glow' :'border-transparent text-muted-foreground hover:text-foreground hover:border-vibrant-orange/30'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'forums' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {forums.map((forum) => (
                      <ForumCard
                        key={forum.id}
                        forum={forum}
                        onJoinForum={handleJoinForum}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'discussions' && renderDiscussions()}

              {activeTab === 'challenges' && (
                <GroupChallenges
                  challenges={challenges}
                  onJoinChallenge={handleJoinChallenge}
                />
              )}

              {activeTab === 'stories' && (
                <SuccessStories
                  stories={successStories}
                  onViewStory={(id) => console.log('Viewing story:', id)}
                  onShareStory={handleShareStory}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <CommunityStats stats={communityStats} />
              <div className="modern-card rounded-2xl p-6 border-l-4 border-vibrant-orange shadow-lg">
                <h3 className="font-bold text-lg text-foreground mb-4 flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-vibrant flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-white" />
                  </div>
                  <span className="text-vibrant-orange">Quick Actions</span>
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreatePost}
                    iconName="Edit"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full justify-start border-vibrant-orange text-vibrant-orange hover:bg-vibrant-orange/10 hover:shadow-vibrant-glow"
                  >
                    Share Your Story
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('challenges')}
                    iconName="Trophy"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full justify-start border-vibrant-orange text-vibrant-orange hover:bg-vibrant-orange/10 hover:shadow-vibrant-glow"
                  >
                    Join a Challenge
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Heart"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full justify-start bg-gradient-vibrant text-white font-bold hover:shadow-vibrant-glow"
                  >
                    Crisis Support
                  </Button>
                </div>
              </div>
              <div className="modern-card rounded-2xl p-6 border-l-4 border-trust-builder shadow-lg">
                <h3 className="font-bold text-lg text-foreground mb-4 flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-trust-builder flex items-center justify-center">
                    <Icon name="Shield" size={16} className="text-white" />
                  </div>
                  <span className="text-trust-builder">Community Guidelines</span>
                </h3>
                <ul className="text-sm text-foreground/80 space-y-3">
                  <li className="flex items-start space-x-2"><Icon name="Check" size={14} className="text-vibrant-orange mt-0.5 flex-shrink-0" /><span>Be kind and respectful to all members</span></li>
                  <li className="flex items-start space-x-2"><Icon name="Check" size={14} className="text-vibrant-orange mt-0.5 flex-shrink-0" /><span>Share experiences, not medical advice</span></li>
                  <li className="flex items-start space-x-2"><Icon name="Check" size={14} className="text-vibrant-orange mt-0.5 flex-shrink-0" /><span>Use trigger warnings for sensitive content</span></li>
                  <li className="flex items-start space-x-2"><Icon name="Check" size={14} className="text-vibrant-orange mt-0.5 flex-shrink-0" /><span>Maintain anonymity and privacy</span></li>
                  <li className="flex items-start space-x-2"><Icon name="AlertTriangle" size={14} className="text-vibrant-orange mt-0.5 flex-shrink-0" /><span>Contact crisis support if you're in immediate danger</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instagram Integration Section */}
          <div className="mt-16 mb-12">
            <CommunityInstagram />
          </div>
        </div>
      </div>
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={handleSubmitPost}
      />
      <ReplyModal 
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        threadId={threadToReplyTo?.id} // Pass the thread's ID to the modal
        onReplySubmit={handleReplySubmit} // Pass the new submit handler
        threadTitle={threadToReplyTo?.title}
      />
    </div>
  );
};

export default CommunityGarden;