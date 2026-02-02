import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import storage from '../storage';

const MedicationScreen = ({ profile, onBack }) => {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', time: '', notes: '' });

  useEffect(() => {
    loadMedications();
  }, [profile.id]);

  const loadMedications = () => {
    const stored = storage.get(`meds-${profile.id}`);
    if (stored) setMedications(stored);
  };

  const saveMedications = (meds) => {
    storage.set(`meds-${profile.id}`, meds);
    setMedications(meds);
  };

  const addMedication = () => {
    if (formData.name.trim()) {
      const newMed = {
        id: Date.now().toString(),
        ...formData,
        taken: false
      };
      saveMedications([...medications, newMed]);
      setFormData({ name: '', time: '', notes: '' });
      setShowForm(false);
    }
  };

  const toggleTaken = (id) => {
    const updated = medications.map(m => 
      m.id === id ? { ...m, taken: !m.taken } : m
    );
    saveMedications(updated);
  };

  const deleteMed = (id) => {
    const updated = medications.filter(m => m.id !== id);
    saveMedications(updated);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Medications - {profile.name}</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-800">
            <strong>⚠️ Important:</strong> Enter only medications prescribed by your healthcare provider. CareNest does not recommend or suggest medications.
          </p>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Add Medication</h3>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Medication name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="Usual time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="2"
            />
            <button
              onClick={addMedication}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Medication
            </button>
          </div>
        )}

        <div className="space-y-3">
          {medications.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              No medications added yet. Click the + button to add one.
            </div>
          ) : (
            medications.map(med => (
              <div key={med.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{med.name}</h3>
                    {med.time && <p className="text-sm text-gray-600">Usual time: {med.time}</p>}
                    {med.notes && <p className="text-sm text-gray-500 mt-1">{med.notes}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTaken(med.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        med.taken 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {med.taken ? '✓ Taken' : '✗ Missed'}
                    </button>
                    <button
                      onClick={() => deleteMed(med.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-6">
          <p className="text-xs text-gray-700 text-center">
            Organization tool only • Not medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicationScreen;
