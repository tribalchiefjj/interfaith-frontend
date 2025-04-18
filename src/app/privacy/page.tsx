import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-purple-800 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Privacy Policy</h1>
        <p className="text-lg leading-relaxed">
          We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with the Echoes of Insight platform.
        </p>
        <p className="leading-relaxed">
          Information collected may include your name (if provided), email address (if submitted), and any content you choose to post or interact with. We do not sell or share your personal information with third parties.
        </p>
        <p className="leading-relaxed">
          Your data is stored securely and used only to improve your experience and ensure a safe, respectful community. For more details, please contact us directly.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
