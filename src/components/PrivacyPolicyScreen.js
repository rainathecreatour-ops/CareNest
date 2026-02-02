import React from 'react';
import { ChevronLeft, Shield } from 'lucide-react';

const PrivacyPolicyScreen = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-7 h-7 text-indigo-600" />
            Privacy Policy
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <div className="text-center pb-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">CareNest Privacy Policy</h2>
            <p className="text-gray-600">Last Updated: February 2026</p>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Your Privacy is Our Priority
            </h3>
            <p className="text-gray-700 leading-relaxed">
              CareNest is designed with privacy at its core. We believe your family's health information belongs to you and only you. That's why we've built CareNest to operate entirely within your own browser, with zero external data transmission.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">What Information Does CareNest Store?</h3>
            <div className="space-y-3 text-gray-700">
              <p>CareNest stores the following information <strong>locally on your device only</strong>:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Family member profiles (names, ages, notes)</li>
                <li>Daily health logs (symptoms, wellness metrics)</li>
                <li>Medication records</li>
                <li>Appointment notes</li>
                <li>Emergency information (allergies, contacts, hospital preferences)</li>
                <li>Your access code (encrypted)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Where Is Your Data Stored?</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-green-800">100% Local Storage:</strong> All your data is stored in your browser's local storage on your device. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-gray-700">
                <li><strong>No cloud storage</strong> - Your data never leaves your device</li>
                <li><strong>No servers</strong> - We don't have servers collecting your information</li>
                <li><strong>No accounts</strong> - No email registration or user accounts required</li>
                <li><strong>No tracking</strong> - We don't track your usage or behavior</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">What We DON'T Do With Your Data</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-gray-900">No Data Collection</p>
                  <p className="text-gray-700">We don't collect, access, or view any of your health information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-gray-900">No Third-Party Sharing</p>
                  <p className="text-gray-700">We don't share data with advertisers, analytics companies, or anyone else</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-gray-900">No Selling Data</p>
                  <p className="text-gray-700">We will never sell your health information to anyone</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-gray-900">No External Transmission</p>
                  <p className="text-gray-700">Your data is never transmitted over the internet</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">How Is Your Data Protected?</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Access Code Protection:</strong> Your data is protected by the access code you create. Only someone with your access code can view the information in CareNest.</p>
              <p><strong>Browser Security:</strong> Your data benefits from your browser's built-in security features and is isolated to your device.</p>
              <p><strong>No Network Exposure:</strong> Since data never leaves your device, it's not exposed to network security risks.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">You Have Complete Control</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li>✅ <strong>Delete anytime:</strong> You can delete profiles and data whenever you want</li>
                <li>✅ <strong>Export your data:</strong> Generate summaries to take to your doctor</li>
                <li>✅ <strong>No account deletion needed:</strong> Just clear your browser data to remove everything</li>
                <li>✅ <strong>Change access code:</strong> Update your security settings anytime</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Important Limitations to Understand</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3 text-gray-700">
              <p><strong>Device-Specific:</strong> Your data is stored only on the device and browser you're using. If you switch devices or browsers, your data won't transfer automatically.</p>
              <p><strong>Browser Data Clearing:</strong> If you clear your browser's data/cache, your CareNest data will be deleted. Make sure to export important information first.</p>
              <p><strong>No Backup Service:</strong> We don't provide cloud backup. You're responsible for backing up important information.</p>
              <p><strong>Shared Device Risk:</strong> If others can access your device and know your access code, they can view your data. Keep your code private.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Medical Disclaimer</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                CareNest is an organizational tool only and does not provide medical advice, diagnosis, or treatment. All health information you enter is for your personal record-keeping. For medical concerns, always consult qualified healthcare professionals. In emergencies, contact your local emergency services immediately.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">Privacy Summary</h3>
            <p className="text-gray-800 font-medium mb-3">
              CareNest is built on a simple principle: <strong>Your health data belongs to you, stays with you, and is never shared with anyone.</strong>
            </p>
            <p className="text-gray-700">
              We can't access your data because we never receive it. We can't share your data because we don't have it. We can't lose your data in a breach because it never leaves your device. This is privacy by design.
            </p>
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              CareNest v1.0 • Privacy Policy Last Updated: February 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyScreen;
