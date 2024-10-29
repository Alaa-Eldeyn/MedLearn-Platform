import doc from "../assets/doc.png";
import Book from "../components/Books/Book";

const Books = () => {
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
              Explore Our Medical Book Collection
            </h2>
            <p className=" my-4 text-xs lg:text-lg font-light leading-relaxed">
              {`Access a comprehensive collection of medical books covering
              various specialties. Whether you're looking for textbooks,
              research publications, or practical guides, our medical books
              section provides valuable resources for healthcare professionals
              and students. Download books directly through our Telegram channel
              for convenient access.`}
            </p>
          </div>
        </div>
      </div>
      <Book />
    </>
  );
};

export default Books;
