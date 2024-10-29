import { Link } from "react-router-dom";
import hero from "../../assets/hero.svg";
const Hero = () => {
  return (
    <section
      className="w-full"
      style={{
        backgroundImage: `
          radial-gradient(circle at 3%, #AC59FF4D 0, transparent 20%),
          radial-gradient(circle at 96%, #AC59FF4D 0, transparent 20%),
          radial-gradient(circle at center bottom, #AC59FF4D 0, transparent 25%)`,
        backgroundColor: "#1E0C2F",
      }}
    >
      <div className="min-h-[750px] grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className=" pr-2 mb-8 lg:mb-0 py-10 md:py-0">
            <p className="text-sm lg:text-[16px] text-white mb-3">
              Boost Your Medical Career with Expert-Led Courses and Insights!
            </p>
            <h1 className="mb-6 text-white text-xl lg:text-4xl leading-normal">
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
                to="#contact"
                className="px-8 py-3 text-sm md:text-md  text-white bg-[#7548A1] rounded-2xl "
              >
                Join Our Community
              </Link>
              <Link
                to="/button"
                className="px-8 py-3 text-sm md:text-md  text-white rounded-2xl border-2 border-white"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
