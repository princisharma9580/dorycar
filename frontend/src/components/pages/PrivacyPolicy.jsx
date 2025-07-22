import React from "react";
import Footer from "../Footer";

const PrivacyPolicy = () => {
  return (
    <>
        <div className="bg-white text-green-900 px-6 py-24 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Privacy Policy for Dorycar.com
        </h1>

        <p className="italic mb-6 text-sm text-green-700">
          Last Updated: 2 Feb 2025
        </p>

        <p className="mb-6">
          This Privacy Policy explains how Dorycar Pvt Ltd ("Dorycar," "we," "us," or "our") collects, uses, shares, and protects your personal information when you use our website, www.dorycar.com (the "Site"), and related services (collectively, the "Service"). By accessing or using the Service, you agree to this Privacy Policy and our Terms and Conditions.
        </p>

        <p className="mb-6">
          Your privacy is important to us. This policy is designed to help you understand how we handle your personal data in compliance with Indian laws, including the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">1. Information We Collect</h2>

        <p className="font-semibold mb-2">We collect personal information that you provide directly to us and automatically through your use of the Service.</p>

        <p className="font-semibold mb-2">1.1 Information You Provide</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Account Information:</strong> When you create a User Account, we collect your name, email address, phone number, age, and other details necessary for registration.
          </li>
          <li>
            <strong>Trip-Related Information:</strong> Car Owners provide vehicle details (e.g., registration number, make, model), trip details (e.g., date, time, route), and Cost Contribution amounts. Co-Travelers provide booking and payment details.
          </li>
          <li>
            <strong>Verification Information:</strong> We may collect government-issued IDs (e.g., Aadhaar, PAN card) and phone numbers for verification purposes.
          </li>
          <li>
            <strong>Communications:</strong> Messages exchanged between Members, customer support inquiries, and feedback.
          </li>
        </ul>

        <p className="font-semibold mb-2">1.2 Information Collected Automatically</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Usage Data:</strong> We collect information about your interactions with the Site, such as pages visited, time spent, and features used.</li>
          <li><strong>Device Information:</strong> We collect details about your device, including IP address, browser type, operating system, and mobile network information.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience, analyze usage, and serve targeted ads. You can manage cookie preferences through your browser settings.</li>
        </ul>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Service Delivery:</strong> To facilitate car-sharing, process bookings, and manage User Accounts.</li>
          <li><strong>Verification and Security:</strong> To verify identities, prevent fraud, and ensure the safety of Members.</li>
          <li><strong>Communication:</strong> To send booking confirmations, updates, and customer support responses.</li>
          <li><strong>Improvement and Analytics:</strong> To analyze usage patterns, improve the Service, and develop new features.</li>
          <li><strong>Legal Compliance:</strong> To comply with legal obligations, including tax reporting and regulatory requirements.</li>
          <li><strong>Marketing:</strong> With your consent, to send promotional offers and updates about Dorycar.</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">3. How We Share Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>With Other Members:</strong> To facilitate car-sharing, we share limited information (e.g., name, phone number) between Car Owners and Co-Travelers.</li>
          <li><strong>Service Providers:</strong> We use third-party vendors for services like payment processing, data hosting, and customer support. These providers are contractually bound to protect your data.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information to comply with laws, respond to legal requests, or protect our rights.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred to the new entity.</li>
          <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated data for research or statistical purposes.</li>
        </ul>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">4. Data Security</h2>
        <p className="mb-6">
          We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. These measures include encryption, access controls, and secure servers. However, no system is completely secure, and we cannot guarantee absolute protection. You are responsible for maintaining the confidentiality of your account credentials.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">5. Your Rights and Choices</h2>
        <p className="mb-4">
          Under Indian law, you have the following rights regarding your personal data.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> Request deletion of your data, subject to legal retention requirements.</li>
          <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format.</li>
          <li><strong>Objection:</strong> Object to the processing of your data for certain purposes, such as marketing.</li>
          <li><strong>Withdraw Consent:</strong> If we rely on your consent to process data, you may withdraw it at any time.</li>
        </ul>
        <p className="mb-6">
          To exercise these rights, contact us at <strong>[insert contact email]</strong>. We will respond to your request within 30 days.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">6. Data Retention</h2>
        <p className="mb-6">
          We retain your personal information for as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce our agreements. Typically, account data is retained for <strong>[insert period, e.g., 7 years]</strong> after account closure, in line with tax and regulatory requirements.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">7. International Data Transfers</h2>
        <p className="mb-6">
          Your data may be transferred to and processed in countries outside India, including for hosting or analytics purposes. We ensure that such transfers comply with Indian data protection laws and that appropriate safeguards are in place, such as standard contractual clauses.
        </p>

        {/* Section 8 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">8. Children’s Privacy</h2>
        <p className="mb-6">
          The Service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware of such data, we will take steps to delete it.
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">9. Third-Party Links and Services</h2>
        <p className="mb-6">
          The Site may contain links to third-party websites or services. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any personal information.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">10. Cookies and Tracking Technologies</h2>
        <p className="mb-6">
          We use cookies to improve your experience, analyze usage, and serve ads. You can control cookies through your browser settings or by opting out of targeted advertising. However, disabling cookies may affect the functionality of the Service.
        </p>

        {/* Section 11 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">11. Changes to This Privacy Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. Changes will be posted on the Site, and significant updates will be communicated via email. Your continued use of the Service after changes indicates acceptance of the revised policy.
        </p>

        {/* Section 12 */}
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">12. Contact Us</h2>
        <p className="mb-1">If you have questions or concerns about this Privacy Policy or your personal data, please contact us at:</p>
        <div className="mt-4 space-y-1 font-medium">
          <p>Dorycar</p>
          <p>2nd Floor, Opposite Bharat Petorl Pump, Sirouli Kalan, Kichha, Udham Singh Nagar Uttarakhand, India  263148</p>
          <p>Email: <span className="text-green-700 font-semibold">contact@dorycar.com</span></p>
        </div>
      </div>
       
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
