import doc from "../assets/doc.png";
import Blog from "../components/Blogs/Blog";

const Blogs = () => {
  return (
    <>
      <div className="relative center h-[406px]">
        <img
          src={doc}
          alt="Banner image"
          className="object-cover w-full h-full z-0"
        />
        <div className="absolute z-10 text-center max-w-5xl mt-10 text-white mx-auto px-5">
          <div>
            <h2 className="lg:text-4xl mt-5 font-bold text-lg  text-secondary">
              Medical Insights & Articles
            </h2>
            <p className=" my-4 text-xs lg:text-lg font-light leading-relaxed">
              {`Explore expert articles on a wide range of medical topics. Our blog is categorized by specialty, ensuring that you can easily find the information you're interested in. Whether you're a student or a healthcare professional, these articles provide in-depth knowledge to enhance your medical expertise.`}
            </p>
          </div>
        </div>
      </div>
      <Blog />
    </>
  );
};

export default Blogs;
