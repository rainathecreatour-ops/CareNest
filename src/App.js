import React, { useState, useEffect } from 'react';
import storage from './storage';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import ProfileForm from './components/ProfileForm';
import DailyLogScreen from './components/DailyLogScreen';
import MedicationScreen from './components/MedicationScreen';
import AppointmentScreen from './components/AppointmentScreen';
import EmergencyVaultScreen from './components/EmergencyVaultScreen';
import SummaryScreen from './components/SummaryScreen';
import SettingsScreen from './components/SettingsScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import { Heart, Lock } from 'lucide-react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const authStatus = storage.get('carenest_authenticated');
    
    if (authStatus) {
      setIsAuthenticated(true);
      loadProfiles();
    } else {
      setLoading(false);
    }
  };

  const loadProfiles = () => {
    const stored = storage.get('profiles');
    if (stored) {
      setProfiles(stored);
    }
    setLoading(false);
  };

  const saveProfiles = (newProfiles) => {
    storage.set('profiles', newProfiles);
    setProfiles(newProfiles);
  };

  const addProfile = (profileData) => {
    const newProfile = {
      id: Date.now().toString(),
      ...profileData,
      createdAt: new Date().toISOString()
    };
    const updated = [...profiles, newProfile];
    saveProfiles(updated);
    return newProfile;
  };

  const updateProfile = (id, data) => {
    const updated = profiles.map(p => p.id === id ? { ...p, ...data } : p);
    saveProfiles(updated);
  };

  const deleteProfile = (id) => {
    const updated = profiles.filter(p => p.id !== id);
    saveProfiles(updated);
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
      setCurrentScreen('home');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading CareNest...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen 
      onAuthenticate={() => {
        setIsAuthenticated(true);
        loadProfiles();
      }}
      onShowPrivacy={() => setCurrentScreen('privacy')}
    />;
  }

  // Show privacy policy if requested before auth
  if (currentScreen === 'privacy' && !isAuthenticated) {
    return <PrivacyPolicyScreen onBack={() => setCurrentScreen('home')} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen 
          profiles={profiles}
          onSelectProfile={(profile) => {
            setSelectedProfile(profile);
            setCurrentScreen('profile');
          }}
          onAddProfile={() => setCurrentScreen('addProfile')}
          onEmergencyVault={() => setCurrentScreen('emergency')}
          onSettings={() => setCurrentScreen('settings')}
        />;
      case 'profile':
        return <ProfileScreen 
          profile={selectedProfile}
          onBack={() => {
            setCurrentScreen('home');
            setSelectedProfile(null);
          }}
          onEdit={() => {
            setEditingProfile(selectedProfile);
            setCurrentScreen('editProfile');
          }}
          onLogToday={() => setCurrentScreen('dailyLog')}
          onAddMed={() => setCurrentScreen('medications')}
          onAddAppointment={() => setCurrentScreen('appointments')}
          onGenerateSummary={() => setCurrentScreen('summary')}
        />;
      case 'addProfile':
      case 'editProfile':
        return <ProfileForm
          profile={editingProfile}
          onBack={() => {
            setCurrentScreen(editingProfile ? 'profile' : 'home');
            setEditingProfile(null);
          }}
          onSave={(data) => {
            if (editingProfile) {
              updateProfile(editingProfile.id, data);
              setSelectedProfile({ ...editingProfile, ...data });
              setCurrentScreen('profile');
            } else {
              const newProfile = addProfile(data);
              setSelectedProfile(newProfile);
              setCurrentScreen('profile');
            }
            setEditingProfile(null);
          }}
        />;
      case 'dailyLog':
        return <DailyLogScreen
          profile={selectedProfile}
          onBack={() => setCurrentScreen('profile')}
          onSave={() => setCurrentScreen('profile')}
        />;
      case 'medications':
        return <MedicationScreen
          profile={selectedProfile}
          onBack={() => setCurrentScreen('profile')}
        />;
      case 'appointments':
        return <AppointmentScreen
          profile={selectedProfile}
          onBack={() => setCurrentScreen('profile')}
        />;
      case 'emergency':
        return <EmergencyVaultScreen
          profile={selectedProfile}
          profiles={profiles}
          onBack={() => setCurrentScreen(selectedProfile ? 'profile' : 'home')}
        />;
      case 'summary':
        return <SummaryScreen
          profile={selectedProfile}
          onBack={() => setCurrentScreen('profile')}
        />;
      case 'settings':
        return <SettingsScreen
          profiles={profiles}
          onBack={() => setCurrentScreen('home')}
          onDeleteProfile={deleteProfile}
          onShowPrivacy={() => setCurrentScreen('privacy')}
        />;
      case 'privacy':
        return <PrivacyPolicyScreen onBack={() => setCurrentScreen('settings')} />;
      default:
        return <HomeScreen profiles={profiles} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {renderScreen()}
    </div>
  );
};

// Login Screen Component
const LoginScreen = ({ onAuthenticate, onShowPrivacy }) => {
  const [mode, setMode] = useState('check');
  const [accessCode, setAccessCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCode = storage.get('carenest_access_code');
    if (savedCode) {
      setMode('login');
    } else {
      setMode('setup');
    }
  }, []);

  const handleSetup = () => {
    setError('');

    if (accessCode.length < 4) {
      setError('Access code must be at least 4 characters');
      return;
    }

    if (accessCode !== confirmCode) {
      setError('Access codes do not match');
      return;
    }

    storage.set('carenest_access_code', accessCode);
    storage.set('carenest_authenticated', true);
    onAuthenticate();
  };

  const handleLogin = () => {
    setError('');

    const savedCode = storage.get('carenest_access_code');
    
    if (accessCode === savedCode) {
      storage.set('carenest_authenticated', true);
      onAuthenticate();
    } else {
      setError('Incorrect access code');
      setAccessCode('');
    }
  };

  if (mode === 'check') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-indigo-900 flex items-center justify-center gap-2 mb-2">
              <Heart className="w-8 h-8 text-rose-500" />
              CareNest
            </h1>
            <p className="text-gray-600">
              {mode === 'setup' ? 'Setup Access Code' : 'Enter Access Code'}
            </p>
          </div>

          {mode === 'setup' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>First time setup:</strong> Create an access code to protect your family's health information.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create Access Code
                </label>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg tracking-wider"
                  placeholder="Min 4 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Access Code
                </label>
                <input
                  type="password"
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg tracking-wider"
                  placeholder="Re-enter code"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={handleSetup}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
              >
                Set Up CareNest
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg tracking-wider"
                  placeholder="Enter your access code"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
              >
                Access CareNest
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Forgot your code? Clear browser data to reset.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onShowPrivacy}
              className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-2"
            >
              View Privacy Policy
            </button>
            <p className="text-xs text-gray-500 text-center">
              Your data is stored securely in your browser
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
