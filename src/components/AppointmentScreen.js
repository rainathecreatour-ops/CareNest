import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import storage from '../storage';

const AppointmentScreen = ({ profile, onBack }) => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    provider: '',
    reason: '',
    notes: '',
    tests: '',
    followUp: ''
  });

  useEffect(() => {
    loadAppointments();
  }, [profile.id]);

  const loadAppointments = () => {
    const stored = storage.get(`appointments-${profile.id}`);
    if (stored) setAppointments(stored);
  };

  const saveAppointments = (appts) => {
    storage.set(`appointments-${profile.id}`, appts);
    setAppointments(appts);
  };

  const addAppointment = () => {
    if (formData.date && formData.provider) {
      const newAppt = {
        id: Date.now().toString(),
        ...formData
      };
      saveAppointments([newAppt, ...appointments]);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        provider: '',
        reason: '',
        notes: '',
        tests: '',
        followUp: ''
      });
      setShowForm(false);
    }
  };

  const deleteAppt = (id) => {
    const updated = appointments.filter(a => a.id !== id);
    saveAppointments(updated);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Appointments - {profile.name}</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Add Appointment</h3>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              placeholder="Provider name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Reason for visit"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes from visit"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
            <input
              type="text"
              value={formData.tests}
              onChange={(e) => setFormData({ ...formData, tests: e.target.value })}
              placeholder="Tests ordered"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              value={formData.followUp}
              onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
              placeholder="Follow-up date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={addAppointment}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Appointment
            </button>
          </div>
        )}

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              No appointments recorded yet. Click the + button to add one.
            </div>
          ) : (
            appointments.map(appt => (
              <div key={appt.id} className="bg-white rounded-xl shadow-md p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-500">{appt.date}</p>
                    <h3 className="font-semibold text-gray-900 text-lg">{appt.provider}</h3>
                    {appt.reason && <p className="text-gray-700 mt-1">{appt.reason}</p>}
                  </div>
                  <button
                    onClick={() => deleteAppt(appt.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {appt.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700">Notes:</p>
                    <p className="text-sm text-gray-600 mt-1">{appt.notes}</p>
                  </div>
                )}
                {appt.tests && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Tests ordered:</p>
                    <p className="text-sm text-gray-600 mt-1">{appt.tests}</p>
                  </div>
                )}
                {appt.followUp && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Follow-up: {appt.followUp}</p>
                  </div>
                )}
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

export default AppointmentScreen;
