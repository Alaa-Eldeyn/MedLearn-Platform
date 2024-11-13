import { whyUs } from "../../data/data";
import MainTitle from "./MainTitle";

const WhyUs = () => {
  return (
    <>
      <div className="w-10/12 sm:w-full mx-auto my-32">
        <MainTitle
          title={"Why Choose Us?"}
          desc={"What distinguishes Practice 2 Pass"}
        />
        <div className="w-fit container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-6 my-16">
          {whyUs.map((item, index) => (
            <div
              key={index}
              className=" group h-[210px] bg-white rounded-[40px] border shadow-lg relative hover:ring hover:ring-secondary soft hover:scale-[102%] hover:shadow-xl"
            >
              <div
                style={{ backgroundColor: item.iconColor }}
                className="flex justify-center items-center size-[125px] rounded-full absolute mx-auto right-0 left-0 -top-16  border-[13px] border-gray-50 soft"
              >
                <span className="text-4xl md:text-[50px] text-white soft">
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center mt-10 p-4">
                <h2
                  className="text-xl font-bold  my-2"
                  style={{ color: item.iconColor }}
                >
                  {item.title}
                </h2>
                <p className="text-center text-md font-normal">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhyUs;
