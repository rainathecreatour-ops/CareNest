import React, { useState } from 'react';
import { ChevronLeft, Save } from 'lucide-react';
import storage from '../storage';

const DailyLogScreen = ({ profile, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    symptoms: '',
    intensity: 5,
    sleep: 3,
    appetite: 3,
    mood: 3,
    hydration: 0,
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = `log-${profile.id}-${Date.now()}`;
    storage.set(key, { ...formData, profileId: profile.id });
    onSave();
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Daily Log - {profile.name}</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
            <textarea
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="3"
              placeholder="Describe any symptoms..."
            />
          </div>

          {formData.symptoms && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensity: {formData.intensity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.intensity}
                onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Daily Wellness</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Quality: {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.sleep - 1]}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.sleep}
                onChange={(e) => setFormData({ ...formData, sleep: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appetite: {['Very Low', 'Low', 'Normal', 'Good', 'Very High'][formData.appetite - 1]}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.appetite}
                onChange={(e) => setFormData({ ...formData, appetite: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mood: {['Very Low', 'Low', 'Neutral', 'Good', 'Great'][formData.mood - 1]}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hydration (glasses): {formData.hydration}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hydration: Math.max(0, formData.hydration - 1) })}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hydration: formData.hydration + 1 })}
                  className="px-4 py-2 bg-indigo-100 rounded-lg hover:bg-indigo-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Triggers and Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="3"
              placeholder="Any triggers, context, or additional notes..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Log
          </button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-gray-700 text-center">
              Organization tool only • Not medical advice
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailyLogScreen;
