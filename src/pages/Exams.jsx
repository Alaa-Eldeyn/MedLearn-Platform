import doc from "../assets/doc.png";
import Exam from "../components/Exams/Exam";

const Exams = () => {
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
              Test Your Knowledge with MedLearn Hub
            </h2>
            <p className=" my-4 text-xs lg:text-lg font-light leading-relaxed">
              At MedLearn Hub, we believe in continuous learning and assessment
              to help you master your field. Our Tests and Questions section is
              designed to evaluate your knowledge across various medical
              subjects through structured multiple-choice questions (MCQs).
              Whether you’re a medical professional or a student, our tests help
              you gauge your understanding and track your progress.
            </p>
          </div>
        </div>
      </div>
      <Exam />
    </>
  );
};

export default Exams;
