import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-purple-800 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Terms of Service</h1>
        <p className="text-lg leading-relaxed">
          By using Echoes of Insight, you agree to the following terms and conditions:
        </p>
        <ul className="list-disc list-inside space-y-2 leading-relaxed">
          <li>Users are responsible for the content they share and must respect the diverse perspectives of others.</li>
          <li>Content must not include hate speech, explicit material, or violate any laws.</li>
          <li>We reserve the right to moderate and remove content that violates community guidelines.</li>
          <li>Users may post anonymously, but we still expect respectful and sincere participation.</li>
        </ul>
        <p className="leading-relaxed">
          Continued use of the platform means you accept these terms. For questions, reach out through our Contact page.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
