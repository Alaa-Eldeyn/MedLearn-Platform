import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ShowAnswers({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  nextQuestion,
  prevQuestion,
  isFree,
}) {
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionIndex(0);
    }
  }, []);
  return (
    <div className="flex gap-x-12 py-20 container">
      <div className="rounded-xl bg-white p-5 border-2 border-[#EC8AB3] h-96 md:w-[460px] ">
        <h2 className="font-bold">Questions {`(${questions?.length || 0})`}</h2>

        <div className="space-y-2 overflow-auto h-72 mt-5 pr-2 pink-sc">
          {questions?.map((question, i) => (
            <div
              key={question?.id}
              onClick={() => setCurrentQuestionIndex(i)}
              className={`flex items-center gap-2 rounded-lg border-2 border-transparent bg-gray-50 py-3 px-2 cursor-pointer hover:bg-[#FFF4F9]
                  ${
                    currentQuestionIndex === i &&
                    "bg-[#FFF4F9] !border-[#EC8AB3]"
                  }
                  `}
            >
              <Icon
                icon="icon-park-outline:dot"
                className={`text-2xl !size-4 ${
                  question?.userAnswer ? "!text-[#EC8AB3]" : " !text-black"
                }`}
              />
              <p className="line-clamp-1 flex-1">
                {`${question?.id}. `} {question?.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {questions?.length > 0 && (
        <div className="flex-1">
          {/* Current Question and Answer Options */}
          <div>
            <h3 className="font-bold text-xl mb-3">
              {`${questions[currentQuestionIndex]?.id}. `}
              {questions[currentQuestionIndex]?.description}
            </h3>
            {questions[currentQuestionIndex]?.answers?.map((answer) => (
              <label
                key={answer?.id}
                className={`flex gap-3 py-2 ${
                  answer?.isCorrect
                    ? "text-green-500 accent-green-500"
                    : "text-red-500 accent-red-500"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questions[currentQuestionIndex]?.id}`}
                  value={answer.id}
                  checked={
                    questions[currentQuestionIndex]?.userAnswer === answer?.id
                  }
                />
                <span className="py-1">{answer?.description}</span>
              </label>
            ))}
          </div>

          {/* Answers */}
          <div>
            <h3 className="mt-3 font-bold">Answers: </h3>
            {questions[currentQuestionIndex]?.answers?.map((answer) => (
              <div key={answer?.id}>
                <label
                  className={`flex gap-3 pt-2 font-bold ${
                    answer?.isCorrect ? "text-primary accent-primary" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${questions[currentQuestionIndex]?.id}`}
                    value={answer.id}
                    checked={
                      questions[currentQuestionIndex]?.userAnswer === answer?.id
                    }
                  />
                  <span className="py-1">{answer?.description}</span>
                </label>
                <p className="pb-2">{answer?.reason}</p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="space-x-3 mt-5">
            <button
              disabled={currentQuestionIndex === questions?.length - 1}
              className="px-5 py-2 rounded-lg soft bg-[#984D9F] text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={nextQuestion}
            >
              Next Question
            </button>

            <button
              disabled={currentQuestionIndex === 0}
              className="px-5 py-2 rounded-lg soft text-[#984D9F] border border-[#984D9F] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={prevQuestion}
            >
              Prev Question
            </button>

            {currentQuestionIndex === questions?.length - 1 && (
              <Link
                to={isFree ? "/academy/free-exams" : "/academy/premium-exams"}
                className="px-8 py-3 rounded-lg soft bg-[#984D9F] text-white hover:bg-[#7D3B7F]"
              >
                Finish
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default ShowAnswers;
