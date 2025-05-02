import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#1E0C2F]">
      <div className="container py-20 px-4 sm:px-6 text-gray-800 flex justify-between flex-col md:flex-row gap-y-10 gap-5">
        <div className="w-56">
          <div className="font-bold text-xl text-[#F799C0] mb-3">
            Quick Links:
          </div>
          <ul className="space-y-3 text-white text-[16px] font-normal">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/academy/courses">Our Courses</Link>
            </li>
            <li>
              <Link to="/academy/free-exams">Exams (Q&A)</Link>
            </li>
            <li>
              <Link to="/academy/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/academy/books">Medical Books</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-[#F799C0] mb-3">
            About Practice 2 Pass:
          </h3>
          <p className="text-white text-sm mb-5 leading-relaxed">
            Practice 2 Pass is an online platform offering medical courses,
            tests, a blog, and Link collection of medical books. The platform is
            designed for medical professionals and students, providing them with
            valuable learning resources and tools to enhance their knowledge.
            This documentation serves as Link comprehensive guide for developers
            and clients, outlining the core features and functionalities of the
            platform.
          </p>
          <div className="flex gap-3 items-start">
            <Link
              to="/sign-up"
              className="border-2 border-transparent bg-primary text-white py-2 px-3 rounded-lg text-sm"
            >
              Join Our Community
            </Link>
            <Link
              to="/academy/courses"
              className="border-2 border-white text-white py-2 px-3 rounded-lg text-sm "
            >
              Browse Courses
            </Link>
          </div>
        </div>
        <div className="w-56 mt-10">
          <ul className="space-y-3 text-white">
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of service</Link>
            </li>
            <li className="flex gap-4">
              <Link
              target="_blank" 
                to={`https://www.instagram.com/practice2pass/profilecard/?igsh=MXdqNjFzaWp0bmJ5Nw==`}
              >
                <Icon icon="skill-icons:instagram" className="size-6" />
              </Link>
              <Link 
              target="_blank" to={`https://t.me/practice2pass`}>
                <Icon icon="logos:telegram" className="size-6" />
              </Link>
              <Link 
              target="_blank" to={`https://x.com/practise2pass`}>
                <Icon icon="bi:twitter-x" className="text-white size-6" />
              </Link>
              <Link 
              target="_blank" to={`https://www.facebook.com/share/g/1XvpthZaMt/`}>
                <Icon icon="logos:facebook" className="size-6" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex py-5 m-auto text-white text-sm flex-col items-center border-t border-[#E2508D] max-w-screen-xl">
        <div className="my-1">
          &copy; {new Date().getFullYear()} Practice2Pass. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
