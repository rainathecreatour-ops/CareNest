import React from 'react';
import { ChevronLeft, Edit2, FileText, Pill, Calendar, Download } from 'lucide-react';

const ProfileScreen = ({ profile, onBack, onEdit, onLogToday, onAddMed, onAddAppointment, onGenerateSummary }) => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <button onClick={onEdit} className="p-2 hover:bg-white rounded-lg transition-colors">
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              {profile.nickname && (
                <p className="text-gray-600">Nickname: {profile.nickname}</p>
              )}
              {profile.age && (
                <p className="text-gray-600">{profile.age} years old</p>
              )}
              {profile.notes && (
                <p className="text-sm text-gray-500 mt-2">{profile.notes}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={onLogToday}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-indigo-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Log Today</h3>
                <p className="text-sm text-gray-600">Record symptoms and wellness</p>
              </div>
            </div>
          </button>

          <button
            onClick={onAddMed}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-indigo-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Medications</h3>
                <p className="text-sm text-gray-600">Track medications</p>
              </div>
            </div>
          </button>

          <button
            onClick={onAddAppointment}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-indigo-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Appointments</h3>
                <p className="text-sm text-gray-600">Log care visits</p>
              </div>
            </div>
          </button>

          <button
            onClick={onGenerateSummary}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Generate Summary</h3>
                <p className="text-sm text-indigo-100">Doctor-ready report</p>
              </div>
            </div>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 text-center">
            <strong>Organization tool only • Not medical advice</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
