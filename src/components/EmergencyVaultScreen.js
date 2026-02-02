import React, { useState, useEffect } from 'react';
import { ChevronLeft, AlertCircle, X, Trash2 } from 'lucide-react';
import storage from '../storage';

const EmergencyVaultScreen = ({ profile, profiles, onBack }) => {
  const [selectedProfileId, setSelectedProfileId] = useState(profile?.id || profiles[0]?.id);
  const [emergencyData, setEmergencyData] = useState({
    allergies: [],
    contacts: [],
    hospital: '',
    insurance: ''
  });
  const [newAllergy, setNewAllergy] = useState('');
  const [newContact, setNewContact] = useState({ name: '', relationship: '', phone: '' });

  useEffect(() => {
    if (selectedProfileId) {
      loadEmergencyData();
    }
  }, [selectedProfileId]);

  const loadEmergencyData = () => {
    const stored = storage.get(`emergency-${selectedProfileId}`);
    if (stored) setEmergencyData(stored);
    else setEmergencyData({ allergies: [], contacts: [], hospital: '', insurance: '' });
  };

  const saveEmergencyData = (data) => {
    storage.set(`emergency-${selectedProfileId}`, data);
    setEmergencyData(data);
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      saveEmergencyData({
        ...emergencyData,
        allergies: [...emergencyData.allergies, newAllergy.trim()]
      });
      setNewAllergy('');
    }
  };

  const removeAllergy = (index) => {
    saveEmergencyData({
      ...emergencyData,
      allergies: emergencyData.allergies.filter((_, i) => i !== index)
    });
  };

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      saveEmergencyData({
        ...emergencyData,
        contacts: [...emergencyData.contacts, { ...newContact, id: Date.now().toString() }]
      });
      setNewContact({ name: '', relationship: '', phone: '' });
    }
  };

  const removeContact = (id) => {
    saveEmergencyData({
      ...emergencyData,
      contacts: emergencyData.contacts.filter(c => c.id !== id)
    });
  };

  const selectedProfile = profiles.find(p => p.id === selectedProfileId);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
              <AlertCircle className="w-7 h-7" />
              Emergency Information
            </h1>
          </div>
        </div>

        {profiles.length > 1 && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Profile</label>
            <select
              value={selectedProfileId}
              onChange={(e) => setSelectedProfileId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-800 text-center font-medium">
            ⚠️ In a medical emergency, call 911 immediately. This information is for reference only.
          </p>
        </div>

        {selectedProfile && (
          <div className="space-y-6">
            {/* Allergies */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Allergies</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add allergy"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                />
                <button
                  onClick={addAllergy}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {emergencyData.allergies.length === 0 ? (
                  <p className="text-gray-500 text-sm">No allergies recorded</p>
                ) : (
                  emergencyData.allergies.map((allergy, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-red-50 px-4 py-2 rounded-lg">
                      <span className="text-gray-800">{allergy}</span>
                      <button
                        onClick={() => removeAllergy(idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Contact name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="Relationship"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="Phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={addContact}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Add Contact
                </button>
              </div>
              <div className="space-y-2">
                {emergencyData.contacts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No emergency contacts added</p>
                ) : (
                  emergencyData.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-start justify-between bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        {contact.relationship && <p className="text-sm text-gray-600">{contact.relationship}</p>}
                        <p className="text-sm text-gray-700 mt-1">{contact.phone}</p>
                      </div>
                      <button
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Preferred Hospital */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Preferred Hospital</h3>
              <textarea
                value={emergencyData.hospital}
                onChange={(e) => saveEmergencyData({ ...emergencyData, hospital: e.target.value })}
                placeholder="Hospital name, address, phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows="3"
              />
            </div>

            {/* Insurance Notes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Insurance Notes</h3>
              <textarea
                value={emergencyData.insurance}
                onChange={(e) => saveEmergencyData({ ...emergencyData, insurance: e.target.value })}
                placeholder="Insurance provider, policy number, notes"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows="3"
              />
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-6">
          <p className="text-xs text-gray-700 text-center">
            This information is for reference only • Not medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyVaultScreen;
