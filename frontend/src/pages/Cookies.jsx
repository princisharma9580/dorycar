import React from "react";
import Footer from "../components/Footer"

const Cookies = () => {
  return (
    <>
        <div className="bg-white text-green-900 px-6 py-24 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Cookie Policy
        </h1>

        <p className="mb-6">
          To enhance your experience and ensure our website functions properly, we use cookies—small text files transferred to your browser or device. These cookies enable personalized features and help us improve our services. Below, we explain how cookies work and how you can manage them.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">What Are Cookies?</h2>
        <p className="mb-6">
          Cookies are text files containing a unique identifier (a random number) and details about their origin and lifespan. They are stored on your device when you visit a website. Cookies alone cannot personally identify you but allow sites to recognize your preferences or actions over time. For more details, visit{" "}
          <a
            href="https://www.allaboutcookies.org"
            className="text-green-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.allaboutcookies.org
          </a>.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">How We Use Cookies</h2>
        <p className="mb-4">We use cookies to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Enable core website functionality (e.g., maintaining your session).</li>
          <li>Analyze site usage to improve performance.</li>
          <li>Support marketing efforts.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Specific Cookies We Use:</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full table-auto border border-green-200 text-left text-sm">
            <thead className="bg-green-100 text-green-800 font-semibold">
              <tr>
                <th className="border border-green-200 px-4 py-2">Cookie Name</th>
                <th className="border border-green-200 px-4 py-2">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-green-900">
              <tr>
                <td className="border border-green-200 px-4 py-2">hl</td>
                <td className="border border-green-200 px-4 py-2">Saves your language/locale preference.</td>
              </tr>
              <tr>
                <td className="border border-green-200 px-4 py-2">fbm_*, fbsr_*</td>
                <td className="border border-green-200 px-4 py-2">Facilitates Facebook integration (e.g., logging in via Facebook Connect).</td>
              </tr>
              <tr>
                <td className="border border-green-200 px-4 py-2">PHPSESSID</td>
                <td className="border border-green-200 px-4 py-2">Temporarily identifies your browsing session on our server.</td>
              </tr>
              <tr>
                <td className="border border-green-200 px-4 py-2">marketing_hash, marketing_codes</td>
                <td className="border border-green-200 px-4 py-2">Tracks marketing campaigns and referral sources.</td>
              </tr>
              <tr>
                <td className="border border-green-200 px-4 py-2">WRUID</td>
                <td className="border border-green-200 px-4 py-2">Collects usability data via ClickTale analytics.</td>
              </tr>
              <tr>
                <td className="border border-green-200 px-4 py-2">__utma, __utmb, __utmc, __utmz</td>
                <td className="border border-green-200 px-4 py-2">Google Analytics cookies tracking visit frequency, session duration, and traffic sources (e.g., search terms).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Your Consent</h2>
        <p className="mb-6">
          Under privacy regulations, we require your consent to use non-essential cookies. A clear notice about cookies appears on our website. By continuing to browse, you consent to our use of cookies as described here.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Managing Cookies</h2>
        <p className="mb-6">
          You can adjust your browser settings to block cookies or receive alerts when they are sent. However, disabling cookies may limit access to certain features (e.g., logged-in areas or personalized content). To modify cookie settings, visit your browser’s "Advanced Preferences" or follow guidance at{" "}
          <a
            href="https://www.allaboutcookies.org/manage-cookies"
            className="text-green-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.allaboutcookies.org/manage-cookies
          </a>.
          For the best experience, we recommend keeping cookies enabled.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Cookies;
