import React from 'react';
import { Heart, Plus, AlertCircle, Settings } from 'lucide-react';

const HomeScreen = ({ profiles, onSelectProfile, onAddProfile, onEmergencyVault, onSettings }) => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 flex items-center gap-2">
              <Heart className="w-8 h-8 text-rose-500" />
              CareNest
            </h1>
            <p className="text-sm text-gray-600 mt-1">Family Health Organizer</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onEmergencyVault}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Emergency Info"
            >
              <AlertCircle className="w-6 h-6" />
            </button>
            <button
              onClick={onSettings}
              className="p-3 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-md"
              title="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Profiles */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Family Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => onSelectProfile(profile)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-indigo-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                    {profile.nickname && (
                      <p className="text-sm text-gray-500">"{profile.nickname}"</p>
                    )}
                    {profile.age && (
                      <p className="text-sm text-gray-600 mt-1">{profile.age} years old</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
            
            <button
              onClick={onAddProfile}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-dashed border-gray-300 hover:border-indigo-400 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-indigo-600"
            >
              <Plus className="w-8 h-8" />
              <span className="font-medium">Add New Profile</span>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
          <p className="text-sm text-gray-700 text-center">
            <strong>Organization tool only • Not medical advice</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
