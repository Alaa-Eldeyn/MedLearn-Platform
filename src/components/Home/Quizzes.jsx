import quiz from "../../assets/quiz.svg"
const Quizzes = () => {
  return (
    <section className="border-y-[5px] border-dashed border-white bg-[#842A8C] text-white">
      <div className="flex items-center justify-between gap-20  min-h-[400px] container">
        <div>
          <h3 className="text-2xl text-[#FFAACE] font-bold leading-tight mb-4">
            Test Your Medical Knowledge with Interactive Quizzes
          </h3>
          <p className="text-lg font-normal mb-8 line-clamp-6">
            Enhance your medical knowledge through interactive multiple-choice
            quizzes (MCQs) organized by subject. Test yourself on various topics
            with the ability to navigate between questions and reveal correct
            answers. Try the free plan with up to 50 questions per subject, or
            unlock unlimited access with our premium subscription plans.
          </p>
          <a
            href="#"
            className="bg-[#E2508D] mb-6 font-bold text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl soft"
          >
            Get Start Your Free Test Now
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:flex relative">
          <div className="w-[347px] h-[429px] ">
            <img
              src={quiz}
              alt="quiz image"
              className="absolute -top-16 hidden lg:flex "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quizzes