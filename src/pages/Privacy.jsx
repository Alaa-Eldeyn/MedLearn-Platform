import { Link } from "react-router-dom";
import privacy from "../assets/privacy.png";
import { Footer, Header } from "../components/Home";
import ScrollUp from "../components/ScrollUp";
const Privacy = () => {
  return (
    <>
      <ScrollUp />
      <Header />
      <div className="relative bg-gray-300 flex items-center justify-center h-[251px] mb-14">
        <div className="absolute inset-0 bg-[#1F0C30E5] opacity-90 z-10"></div>
        <img
          src={privacy}
          alt="Banner image"
          className="object-cover w-full h-full z-0"
        />
        <h1 className="text-lg absolute mt-20 text-center lg:text-3xl font-bold text-white z-20">
          Privacy Policy for Practice 2 Pass
        </h1>
      </div>

      <div className="container leading-relaxed space-y-3">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p>
          At Practice 2 Pass, we prioritize the privacy of our users. This
          Privacy Policy outlines how we collect, use, and safeguard your
          personal information when you use our platform, including our website
          and services.
        </p>

        <h2 className="text-xl font-bold">1. Information We Collect</h2>
        <p>
          We collect personal data to improve our services and provide you with
          a customized learning experience. The types of information we may
          collect include:
        </p>
        <span> a. Personal Information</span>
        <ul className="list-disc list-inside">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Password</li>
          <li>Profession (optional)</li>
          <li>Phone Number (optional)</li>
        </ul>

        <span>b. Usage Data</span>
        <p>
          We collect information about your interaction with our platform,
          including:
        </p>
        <ul className="list-disc list-inside">
          <li>Courses enrolled in and completed</li>
          <li>Test results</li>
          <li>Progress tracking data</li>
          <li>Blog interaction (e.g., comments and likes)</li>
          <li>IP address, browser type, and device information</li>
        </ul>

        <h2 className="text-xl font-bold">2. How We Use Your Information</h2>
        <p> The information collected is used for </p>
        <ul className="list-disc list-inside">
          <li>Managing and improving your user experience</li>
          <li>Personalizing course recommendations and content</li>
          <li>Providing customer support</li>
          <li>
            Sending important notifications, such as course updates, payment
            confirmations, or system alerts
          </li>
          <li>Generating course completion certificates</li>
          <li>
            Offering access to our blog, medical books, and other learning tools
          </li>
          <li>
            Safeguarding your account by enabling features like password
            recovery
          </li>
        </ul>

        <h2 className="text-xl font-bold">3. Sharing Your Information</h2>
        <p>
          We do not sell or share your personal data with third parties, except
          in the following cases:
        </p>
        <ul className="list-disc list-inside">
          <li>To comply with legal requirements</li>
          <li>With your explicit consent</li>
          <li>
            To third-party service providers, such as hosting or email services,
            strictly for the purpose of operating our platform
          </li>
        </ul>

        <h2 className="text-xl font-bold">4. Security of Your Information</h2>
        <p>
          We implement industry-standard security measures to protect your data.
          This includes:
        </p>
        <ul className="list-disc list-inside">
          <li>Encrypting sensitive data such as passwords</li>
          <li>
            Protecting course content from unauthorized access or duplication
          </li>
          <li>Secure data storage</li>
        </ul>
        <p>
          However, no method of transmission over the Internet or electronic
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-bold">5. Cookies</h2>
        <p>
          Our platform uses cookies to improve functionality, track usage, and
          provide a personalized user experience. You may choose to disable
          cookies via your browser settings, though this may affect some
          platform functionalities
        </p>

        <h2 className="text-xl font-bold">6. User Rights</h2>
        <p> As a user, you have the right to: </p>
        <ul className="list-disc list-inside">
          <li>Access and update your personal information</li>
          <li>
            Delete your account and associated data (except when required by
            law)
          </li>
          <li>Opt-out of marketing communications at any time</li>
        </ul>

        <h2 className="text-xl font-bold">7. Third-Party Links</h2>
        <p>
          Our platform may contain links to third-party websites (e.g., for
          downloading medical books via Telegram). We are not responsible for
          the privacy practices or content of these external sites.
        </p>

        <h2 className="text-xl font-bold">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices or legal requirements. We will notify users of any
          significant changes via email or platform notifications.
        </p>

        <h2 className="text-xl font-bold">9. Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, feel
          free to contact us at:
        </p>
        <ul className="list-disc list-inside">
          <li>Practice 2 Pass Support</li>
          <li>Email: support@medlearnhub.com</li>
          <li>Phone: +201015800248</li>
        </ul>
        <Link
          to={`/`}
          className="rounded-full px-14 py-3 bg-primary text-white font-bold w-fit mx-auto block text-xl !mt-10 !mb-20"
        >
          Got it
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
