'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    company: '',
    email: '',
    name: '',
    phone: '',
  });

  const [notifications, setNotifications] = useState({
    emailNewCandidate: true,
    emailInterviewComplete: true,
    emailWeeklyDigest: false,
    pushNotifications: true,
  });

  const [branding, setBranding] = useState({
    logoUrl: '',
    primaryColor: '#2563EB',
    companyDescription: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setProfile({
        company: parsed.company || '',
        email: parsed.email || '',
        name: parsed.name || '',
        phone: parsed.phone || '',
      });
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'branding', label: 'Branding', icon: '🎨' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/60 mt-2">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 h-fit"
        >
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-electric-500/20 to-cyan-500/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="glass rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Profile Settings</h2>
                <p className="text-white/60 text-sm">Update your personal information</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {profile.company?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <Button variant="secondary" size="sm">Change Avatar</Button>
                  <p className="text-white/40 text-xs mt-2">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  placeholder="Acme Corp"
                />
                <Input
                  label="Your Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="John Doe"
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="john@example.com"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white font-medium mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Current Password" type="password" placeholder="••••••••" />
                  <Input label="New Password" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="glass rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Notification Preferences</h2>
                <p className="text-white/60 text-sm">Choose how you want to be notified</p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'emailNewCandidate', label: 'New candidate applies', desc: 'Get notified when a new candidate starts an interview' },
                  { key: 'emailInterviewComplete', label: 'Interview completed', desc: 'Get notified when a candidate completes their interview' },
                  { key: 'emailWeeklyDigest', label: 'Weekly digest', desc: 'Receive a weekly summary of your hiring activity' },
                  { key: 'pushNotifications', label: 'Push notifications', desc: 'Enable browser push notifications' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                      className={`w-12 h-6 rounded-full transition-all ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-gradient-to-r from-electric-500 to-cyan-500'
                          : 'bg-white/20'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="glass rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Branding Settings</h2>
                <p className="text-white/60 text-sm">Customize the interview experience for candidates</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Company Logo</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
                    <p className="text-white/40 text-xs mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Brand Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-12 h-12 rounded-xl cursor-pointer border-0"
                    />
                    <Input
                      label=""
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Welcome Message</label>
                  <textarea
                    value={branding.companyDescription}
                    onChange={(e) => setBranding({ ...branding, companyDescription: e.target.value })}
                    placeholder="Welcome to our interview process! We're excited to learn more about you..."
                    className="w-full bg-navy-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
                  Save Branding
                </Button>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="glass rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Team Members</h2>
                  <p className="text-white/60 text-sm">Manage who has access to your account</p>
                </div>
                <Button variant="primary">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Invite Member
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'JD' },
                  { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Hiring Manager', avatar: 'SS' },
                  { name: 'Mike Johnson', email: 'mike@example.com', role: 'Recruiter', avatar: 'MJ' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{member.avatar}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-white/40 text-sm">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
                        {member.role}
                      </span>
                      <button className="text-white/40 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Current Plan</h2>
                    <p className="text-white/60 text-sm">You're on the Professional plan</p>
                  </div>
                  <Button variant="secondary">Upgrade Plan</Button>
                </div>

                <div className="bg-gradient-to-br from-electric-500/20 to-cyan-500/20 border border-cyan-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Professional</h3>
                      <p className="text-white/60">$99/month • Renews Jan 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Candidates this month</p>
                      <p className="text-2xl font-bold text-white">148 / 200</p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-electric-500 to-cyan-500 rounded-full" style={{ width: '74%' }} />
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-white font-bold text-xs">
                      VISA
                    </div>
                    <div>
                      <p className="text-white">•••• •••• •••• 4242</p>
                      <p className="text-white/40 text-sm">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Update</Button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="glass rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Integrations</h2>
                <p className="text-white/60 text-sm">Connect with your favorite tools</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Slack', desc: 'Get notifications in Slack', icon: '💬', connected: true },
                  { name: 'Google Calendar', desc: 'Sync interview schedules', icon: '📅', connected: false },
                  { name: 'Greenhouse', desc: 'Sync with your ATS', icon: '🌱', connected: false },
                  { name: 'Zapier', desc: 'Connect 5000+ apps', icon: '⚡', connected: true },
                  { name: 'Notion', desc: 'Export candidate data', icon: '📝', connected: false },
                  { name: 'Webhooks', desc: 'Custom integrations', icon: '🔗', connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="p-4 bg-white/5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{integration.icon}</span>
                      <div>
                        <p className="text-white font-medium">{integration.name}</p>
                        <p className="text-white/40 text-sm">{integration.desc}</p>
                      </div>
                    </div>
                    <Button
                      variant={integration.connected ? 'ghost' : 'secondary'}
                      size="sm"
                      className={integration.connected ? 'text-emerald-400' : ''}
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}