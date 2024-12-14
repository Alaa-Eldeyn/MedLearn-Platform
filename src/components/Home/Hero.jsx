import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
const Hero = () => {
  return (
    <section className="w-full bg-[#1E0C2F] bg-[radial-gradient(circle_at_3%,#AC59FF4D_0,transparent_20%),radial-gradient(circle_at_96%,#AC59FF4D_0,transparent_20%),radial-gradient(circle_at_center_bottom,#AC59FF4D_0,transparent_25%)]">
      <div className="min-h-[800px] flex items-center justify-between max-w-screen-xl container pt-20 pb-8 lg:gap-8">
        <div className="">
          <div className=" pr-2 mb-8 lg:mb-0 py-10 md:py-0">
            <p className="text-sm md:text-[16px] text-white mb-3">
              Boost Your Medical Career with Expert-Led Courses and Insights!
            </p>
            <h1 className="mb-6 text-white text-xl md:text-4xl">
              Access a wide range of
              <span className="p-1 w-full text-[#C29CE8] font-bold">
                {" "}
                medical <br /> courses, research materials, and <br /> industry
                insights{" "}
              </span>
              to help you <br /> excel in your career.
            </h1>
            <div className="flex flex-wrap items-center gap-5 mt-4">
              <Link
                to="/sign-up"
                className="px-8 py-3 text-sm md:text-md  text-white bg-[#7548A1] rounded-2xl "
              >
                Join Our Community
              </Link>
              <Link
                to="/academy/courses"
                className="px-8 py-3 text-sm md:text-md  text-white rounded-2xl border-2 border-white"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden  lg:flex">
          <img src={hero} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
