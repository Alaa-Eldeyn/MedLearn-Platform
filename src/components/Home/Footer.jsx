import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#1E0C2F]">
      <div className="container py-20 px-4 sm:px-6 text-gray-800 flex justify-between flex-col md:flex-row gap-y-10 gap-5">
        <div className=" w-56">
          <div className="font-bold text-xl text-[#F799C0] mb-3">
            Quick Links:
          </div>
          <ul className="space-y-3">
            <li>
              <a className="text-white text-[16px] font-normal" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="text-white text-[16px] font-normal" href="#">
                Our Courses
              </a>
            </li>
            <li>
              <a className="text-white text-[16px] font-normal" href="#">
                Exams (Q&A)
              </a>
            </li>
            <li>
              <a className="text-white text-[16px] font-normal" href="#">
                Blogs
              </a>
            </li>
            <li>
              <a className="text-white text-[16px] font-normal" href="#">
                Medical Books
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-[#F799C0] mb-3">
            About MedLearn Hub:
          </h3>
          <p className="text-white text-sm mb-5 leading-relaxed">
            MedLearn Hub is an online platform offering medical courses, tests,
            a blog, and a collection of medical books. The platform is designed
            for medical professionals and students, providing them with valuable
            learning resources and tools to enhance their knowledge. This
            documentation serves as a comprehensive guide for developers and
            clients, outlining the core features and functionalities of the
            platform.
          </p>
          <div className="flex gap-3 items-start">
            <a
              href="#"
              className="border-2 border-transparent bg-primary text-white py-2 px-3 rounded-lg text-sm"
            >
              Join Our Community
            </a>
            <a
              href="#"
              className="border-2 border-white text-white py-2 px-3 rounded-lg text-sm "
            >
              Browse Courses
            </a>
          </div>
        </div>
        <div className="w-56 mt-10">
          <ul className="space-y-3">
            <li>
              <Link to="" className="text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/pages/Privacy-Policy" className="text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/pages/Privacy-Policy" className="text-white">
                Terms of service
              </Link>
            </li>
            <li className="flex gap-4">
              <Link to={``}>
                <Icon icon="skill-icons:instagram" className="size-6" />
              </Link>
              <Link to={``}>
                <Icon icon="logos:telegram" className="size-6" />
              </Link>
              <Link to={``}>
                <Icon icon="bi:twitter-x" className="text-white size-6" />
              </Link>
              <Link to={``}>
                <Icon icon="logos:facebook" className="size-6" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex py-5 m-auto text-white text-sm flex-col items-center border-t border-[#E2508D] max-w-screen-xl">
        <div className="my-1">© 2024 Medlearnhub. All Rights Reserved</div>
      </div>
    </div>
  );
};

export default Footer;
