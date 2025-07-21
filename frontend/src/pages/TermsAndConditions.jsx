import React from "react";
import Footer from "../components/Footer"

const TermsAndConditions = () => {
  return (
    <>
      <div className="bg-white text-green-900 px-6 py-24 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Terms and Conditions for Dorycar.com
        </h1>

        <p className="mb-6">
          These Terms and Conditions ("Conditions") govern your use of the Dorycar platform ("Site"), operated by YHNSERVICES Private limited ("Dorycar"), an Indian startup providing a car-sharing service. By accessing or using the Site, you ("Member") agree to be bound by these Conditions. If you do not agree, you must not use the Site.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">1. General Conditions of Use</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">1.1 Scope and Definitions</h3>
        <p className="mb-4">These Conditions apply to all services provided by Dorycar through the Site, including www.dorycar.com and any related websites or sub-sites.</p>
        <p className="mb-4 font-semibold">Key Definitions</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Dorycar:</strong> Dorycar is registered trademark, of yhnservices private limited in India.</li>
          <li><strong>Car Sharing:</strong> The act of sharing a vehicle for a trip, where a Car Owner transports a Co-Traveller in exchange for a Cost Contribution.</li>
          <li><strong>Conditions:</strong> These Terms and Conditions, including the Good Conduct Charter and Privacy Policy.</li>
          <li><strong>Cost Contribution:</strong> The amount agreed between the Car Owner and Co-Traveller to share trip expenses (e.g., fuel, tolls).</li>
          <li><strong>Co-Traveller or Passenger:</strong> A Member who books a seat with a Car Owner for a trip.</li>
          <li><strong>Car Owner or Driver:</strong> A Member who offers to share a car journey with a Co-Traveller for a Cost Contribution.</li>
          <li><strong>Member:</strong> A registered user of the Site.</li>
          <li><strong>Service:</strong> Any service provided by Dorycar through the Site.</li>
          <li><strong>Site:</strong> www.dorycar.com and any related websites operated by Dorycar.</li>
          <li><strong>Trip:</strong> A journey agreed upon by a Car Owner and Co-Traveller via the Site.</li>
          <li><strong>User Account:</strong> An account created by a Member to access the Service.</li>
          <li><strong>Vehicle:</strong> The vehicle offered by a Car Owner for Car Sharing.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">1.2 Acceptance of Conditions</h3>
        <p className="mb-6">
          By accessing or using the Site, you accept these Conditions in full. No access to the Service is allowed without complete acceptance. Dorycar may suspend or terminate your access if you fail to comply with these Conditions. These Conditions form a binding agreement under the Indian Contract Act, 1872.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">1.3 Variation of Conditions, Site, and Service</h3>
        <p className="mb-6">
          Dorycar may update these Conditions, the Site, or the Service at any time. Changes will be posted on the Site, and significant updates will be notified via email. Your continued use of the Site after changes means you accept the revised Conditions. Changes do not affect bookings made before the update.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">2. Use of the Service</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.1 User Account and Accuracy of Information</h3>
        <p className="mb-6">
          To use the Service, you must create a User Account with accurate details, including your name, age (must be over 18), valid phone number, and email. You are responsible for keeping this information current and accurate. Dorycar does not verify this data and is not liable for any false or misleading information you provide. Each Member is limited to one User Account and may not impersonate others or create accounts for others.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.2 No Commercial Activity and Status of Dorycar</h3>
        <p className="mb-6">
          The Site is for private car-sharing only. You may not use it for commercial purposes, profit, hire, or reward. Car Owners must not profit from the Cost Contribution—it should only cover trip costs. Dorycar is a communication platform, not a transport provider, and is not a party to agreements between Members. Dorycar is not responsible for any Trip-related issues, such as cancellations or disputes. Breaching this rule may lead to account suspension.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.3 Types of Booking and Payment</h3>
        <p className="mb-6">
          Dorycar provides an online booking system. Car Owners list trip details (e.g., date, time, route, Cost Contribution), and Co-Travellers book seats by selecting "Book." A confirmation email is sent to both parties, creating a binding agreement between them. Payments are handled directly between the Car Owner and Co-Traveller during the Trip—Dorycar does not process payments or mediate payment disputes. Dorycar may modify or discontinue the booking service at any time.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">3. Obligations</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.1 Car Owner Obligations</h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Ensure the Trip is lawful and not for profit.</li>
          <li>Maintain comprehensive insurance covering occupants and third-party liability.</li>
          <li>Arrive on time at the agreed pickup point with the specified Vehicle.</li>
          <li>Notify Co-Travellers of any Trip changes (if unacceptable, the Co-Traveller gets a full refund).</li>
          <li>Follow the Good Conduct Charter.</li>
          <li>Wait at least 30 minutes for the Co-Traveller at the pickup point.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.2 Co-Traveller Obligations</h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Ensure the Trip is lawful and not for commercial use.</li>
          <li>Arrive on time at the agreed pickup point.</li>
          <li>Notify the Car Owner or Dorycar of cancellations.</li>
          <li>Follow the Good Conduct Charter.</li>
          <li>Wait at least 30 minutes for the Car Owner at the pickup point.</li>
          <li>Pay the Cost Contribution to the Car Owner as agreed.</li>
        </ul>
        <p className="mb-6">Non-compliance may result in account suspension.</p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">4. Insurance</h2>
        <p className="mb-6">
          Car Owners must have comprehensive insurance covering third-party liability, occupants, and the Trip, along with a valid driving license, vehicle ownership/authority, and a PUC certificate. You must provide proof of these upon request. Dorycar does not verify insurance and is not liable if coverage is inadequate or invalidated (e.g., due to profit-making). It’s your responsibility to ensure compliance.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">5. Management of Disputes Between Members</h2>
        <p className="mb-6">
          Dorycar may offer a non-binding dispute resolution service at its discretion but is not required to resolve conflicts between Members. This service may be withdrawn anytime.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">6. Verification of IDs and Phone Number</h2>
        <p className="mb-6">
          For trust and safety, Members consent to Dorycar collecting and verifying IDs (e.g., Aadhaar, PAN card) and phone numbers. Phone verification is free, though your mobile operator may charge fees.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">7. International Trips and Bookings</h2>
        <p className="mb-6">
          For Trips crossing international borders, Car Owners must ensure their insurance and Vehicle comply with the laws of all relevant countries.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">8. Messages Between Members</h2>
        <p className="mb-6">
          Dorycar may monitor and moderate messages between Members to prevent fraud, ensure compliance, or assist with support. You must not send offensive, misleading, or copyrighted content. Violations may lead to account suspension.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">9. Contacting Members</h2>
        <p className="mb-6">
          Dorycar may contact you via phone, SMS, or email for updates, training, or quality assurance. These communications may be recorded.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">10. Disclaimer of Liability</h2>
        <p className="mb-6">
          Dorycar is not responsible for: <br />
          - Inaccurate or misleading information from Members. <br />
          - Trip cancellations, delays, or payment disputes. <br />
          - Losses or damages caused by Members’ actions or inactions. <br />
          - Business, financial, or indirect losses. <br />
          <br />
          Dorycar’s liability is limited to INR 1,00 per Trip, and claims must be reported within One Hour of the Trip.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">11. Indemnity and Release</h2>
        <p className="mb-6">
          You agree to indemnify Dorycar against any claims, losses, or penalties arising from your breach of these Conditions or violation of laws. You release Dorycar from liability related to your actions.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">12. General Terms</h2>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>12.1 Relationship:</strong> No agency, partnership, or employment relationship exists between Members and Dorycar.</li>
          <li><strong>12.2 Suspension or Withdrawal of Site Access:</strong> Dorycar may suspend or terminate your access for non-compliance with these Conditions.</li>
          <li><strong>12.3 Intellectual Property:</strong> All Site content is owned by Dorycar or its licensors and protected by Indian copyright and trademark laws. Unauthorized reproduction is prohibited.</li>
          <li><strong>12.4 Content of the Site Provided by Members:</strong> You grant Dorycar a license to use content you submit. You are responsible for ensuring it’s legal and appropriate.</li>
          <li><strong>12.5 Partner Sites:</strong> Dorycar may share Site information with partner platforms.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">13. Law and Jurisdiction</h2>
        <p className="mb-6">
          These Conditions are governed by Indian law. Disputes will be resolved in the courts of Nainital High Court.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">14. Data Protection and Privacy</h2>
        <p className="mb-6">
          Your personal data is handled per Dorycar’s Privacy Policy, which explains how data is collected, used, and safeguarded.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">15. Amendments</h2>
        <p className="mb-6">
          Dorycar may amend these Conditions anytime. Updates will be posted on the Site, with major changes emailed to you.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">16. Severability</h2>
        <p className="mb-6">
          If any part of these Conditions is invalid, the remaining provisions remain enforceable.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default TermsAndConditions;
