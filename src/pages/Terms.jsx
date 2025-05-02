import { Link } from "react-router-dom";
import privacy from "../assets/privacy.png";
import { Footer, Header } from "../components/Home";
import ScrollUp from "../components/ScrollUp";

const TermsOfService = () => {
  return (
    <>
      <ScrollUp />
      <Header />
      {/* Banner */}
      <div className="relative bg-gray-300 flex items-center justify-center h-[251px] mb-14">
        <div className="absolute inset-0 bg-[#1F0C30E5] opacity-90 z-10"></div>
        <img
          src={privacy}
          alt="Banner"
          className="object-cover w-full h-full z-0"
        />
        <h1 className="text-lg absolute mt-20 text-center lg:text-3xl font-bold text-white z-20">
          Terms of Service for Practice 2 Pass
        </h1>
      </div>

      {/* Content */}
      <div className="container text-lg pb-3">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Terms of Services
        </h1>
        <ul className="space-y-4">
          <li>
            <strong>1. Educational Purpose Only:</strong> Our content, guidance,
            and materials are intended for educational purposes. We do not
            guarantee exam results, as success depends on individual effort and
            external examination standards.
          </li>
          <li>
            <strong>2. Use of Materials:</strong> All study resources, guides,
            and strategies provided by Practice 2 Pass are copyrighted and
            intended for personal, non-commercial use only. Redistribution
            without permission is prohibited.
          </li>
          <li>
            <strong>3. No Medical Advice:</strong> While our foundation supports
            medical education, we do not offer personal medical or clinical
            advice. Our services are not a substitute for professional training
            or clinical experience.
          </li>
          <li>
            <strong>4. Privacy:</strong> Any personal information shared with us
            (e.g., for enrollment or communication) is treated with
            confidentiality and will not be shared without consent.
          </li>
          <li>
            <strong>5. Changes to Services:</strong> We reserve the right to
            update or modify our services, materials, or these terms at any time
            to improve quality or ensure compliance.
          </li>
          <li className="text-primary">
            <strong>6. Payment Policy:</strong> Once a subscription to Practice
            2 Pass services is completed, the payment is non-refundable under
            any circumstances. Please ensure the service meets your needs before
            making a payment.
          </li>
        </ul>
        <p className="mt-8 text-primary">
          By continuing to use Practice 2 Pass, you acknowledge and accept these
          terms. If you have any questions, feel free to contact us directly.
        </p>
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

export default TermsOfService;
