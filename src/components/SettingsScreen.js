import React, { useState } from 'react';
import { ChevronLeft, Trash2, LogOut, Key, Shield } from 'lucide-react';
import storage from '../storage';

const SettingsScreen = ({ profiles, onBack, onDeleteProfile, onShowPrivacy }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showChangeCode, setShowChangeCode] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [confirmNewCode, setConfirmNewCode] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      storage.set('carenest_authenticated', false);
      window.location.reload();
    }
  };

  const handleChangeCode = () => {
    setError('');

    const savedCode = storage.get('carenest_access_code');

    if (currentCode !== savedCode) {
      setError('Current access code is incorrect');
      return;
    }

    if (newCode.length < 4) {
      setError('New access code must be at least 4 characters');
      return;
    }

    if (newCode !== confirmNewCode) {
      setError('New access codes do not match');
      return;
    }

    storage.set('carenest_access_code', newCode);
    alert('Access code changed successfully!');
    setShowChangeCode(false);
    setCurrentCode('');
    setNewCode('');
    setConfirmNewCode('');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="space-y-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white rounded-xl shadow-md p-6 hover:bg-red-600 transition-colors flex items-center justify-center gap-3"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Log Out</span>
          </button>

          {/* Change Access Code */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <button
              onClick={() => setShowChangeCode(!showChangeCode)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Change Access Code</h3>
              </div>
              <span className="text-gray-400">{showChangeCode ? '−' : '+'}</span>
            </button>

            {showChangeCode && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Access Code
                  </label>
                  <input
                    type="password"
                    value={currentCode}
                    onChange={(e) => setCurrentCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Access Code
                  </label>
                  <input
                    type="password"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Access Code
                  </label>
                  <input
                    type="password"
                    value={confirmNewCode}
                    onChange={(e) => setConfirmNewCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                <button
                  onClick={handleChangeCode}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Change Access Code
                </button>
              </div>
            )}
          </div>

          {/* Manage Profiles */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Manage Profiles</h3>
            <div className="space-y-3">
              {profiles.map(profile => (
                <div key={profile.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{profile.name}</p>
                    {profile.age && <p className="text-sm text-gray-600">{profile.age} years old</p>}
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${profile.name}'s profile? This cannot be undone.`)) {
                        onDeleteProfile(profile.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowAbout(!showAbout)}
            className="w-full bg-white rounded-xl shadow-md p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">About CareNest</h3>
          </button>

          {/* Privacy Policy Button */}
          {onShowPrivacy && (
            <button
              onClick={onShowPrivacy}
              className="w-full bg-white rounded-xl shadow-md p-6 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <Shield className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Privacy Policy</h3>
            </button>
          )}

          {showAbout && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">About CareNest</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  <strong>CareNest</strong> is a non-medical family health organizer designed to help caregivers and families track health information and prepare for medical visits.
                </p>
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">⚠️ IMPORTANT DISCLAIMER</p>
                  <p>
                    This app is for organization and education only. It does not provide medical advice, diagnosis, or treatment. For medical concerns, consult a qualified healthcare professional. If this is an emergency, contact local emergency services.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-2">What CareNest CAN do:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Organize user-entered health information</li>
                    <li>Generate clear summaries for medical visits</li>
                    <li>Help prepare questions for healthcare providers</li>
                    <li>Show patterns and trends in logged data</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-2">What CareNest CANNOT do:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Diagnose conditions or recommend treatments</li>
                    <li>Interpret lab results or medical reports</li>
                    <li>Provide emergency triage decisions</li>
                    <li>Replace professional medical advice</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Version 1.0.0 • All data stored locally in your browser
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
