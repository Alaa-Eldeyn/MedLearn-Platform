import { Link } from "react-router-dom";
import privacy from "../assets/privacy.png";
import logo from "../assets/Picture1.png";
import ehab from "../assets/ehab.png";
import { Footer, Header } from "../components/Home";
import ScrollUp from "../components/ScrollUp";
import { Icon } from "@iconify/react/dist/iconify.js";

const AboutUs = () => {
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
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items- gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-gray-200 rounded-lg overflow-hidden w-64 h-64 border-dashed cursor-pointer border-2 soft hover:-translate-y-2 hover:border-solid border-primary object-cover flex items-center justify-center">
              <img src={logo} className="w-full h-full" />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Practice 2 Pass
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {`We're more than just a foundation — we're your launchpad to
              medical success. Whether you're preparing for the USMLE, NPTE, or
              any other essential medical exam, we offer expert guidance, proven
              strategies, and comprehensive resources tailored to help you pass
              with confidence.`}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {`Our mission is to empower future healthcare professionals with the
              tools and support they need to turn hard work into achievement.
              With Practice 2 Pass, you're not just studying — you're practicing
              with purpose, and preparing to pass.`}
            </p>
          </div>
        </div>
        <hr />
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items- gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="bg-gray-200 rounded-lg overflow-hidden cursor-pointer object-cover flex items-center justify-center">
                <img src={ehab} className="w-full h-full" />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Cofounder
              </h1>
              <Link
                to="https://www.linkedin.com/in/ehab-naser-a1a7211a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary underline font-medium text-lg"
              >
                Dr.Ehab Naser
              </Link>
              <p className="text-gray-600 mb-6 mt-3">
                Medical education specialist with a passion for helping students
                succeed in their licensing exams.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://www.linkedin.com/in/ehab-naser-a1a7211a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 soft text-2xl"
                >
                  <Icon icon="pajamas:linkedin" />
                </a>
                <a
                  target="_blank"
                  href="https://x.com/EhabNaser59"
                  className="text-gray-400 hover:text-black soft text-2xl"
                >
                  <Icon icon="prime:twitter" />
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com/ehab.naser.798"
                  className="text-sky-600 hover:text-sky-800 soft text-2xl"
                >
                  <Icon icon="devicon-plain:facebook" />
                </a>
                <a target="_blank" href="https://www.instagram.com/ehabnaser1903/" className="text-2xl">
                  <Icon icon="skill-icons:instagram" />
                </a>
              </div>
              <div className="mt-8">
                <a
                  href="https://www.facebook.com/share/g/1XvpthZaMt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary text-white font-bold py-2 px-6 rounded-lg inline-block transition duration-200"
                >
                  Join our community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
