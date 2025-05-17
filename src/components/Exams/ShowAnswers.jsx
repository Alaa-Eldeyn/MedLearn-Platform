import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, memo } from "react";
import { Link } from "react-router-dom";


const NavigationButton = memo(({ onClick, disabled, children, primary }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-5 py-2 rounded-lg soft ${
      primary
        ? "bg-[#984D9F] text-white hover:bg-[#7D3B7F]"
        : "text-[#984D9F] border border-[#984D9F]"
    } disabled:cursor-not-allowed disabled:opacity-50`}
  >
    {children}
  </button>
));
NavigationButton.displayName = "NavigationButton";

const AnswerOption = memo(({ answer, isSelected, name, isAnswer }) => (
  <label
    className={`flex gap-3 py-2 pointer-events-none ${
      answer?.isCorrect
        ? isAnswer
          ? "text-primary accent-primary"
          : "text-green-600 accent-green-600"
        : isAnswer
        ? "text-black"
        : "text-red-600 accent-red-600"
    }`}
  >
    <input
      type="radio"
      name={name}
      value={answer.id}
      checked={isSelected}
      className=" "
    />
    <p className="py-1">{answer?.description}</p>
  </label>
));
AnswerOption.displayName = "AnswerOption";

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
  }, [questions]);

  return (
    <div className="py-10 container flex gap-12 flex-col md:flex-row w-full">
      <div className="rounded-xl bg-white p-5 border-2 border-[#EC8AB3] h-96 md:w-[460px]">
        <h2 className="font-bold">Questions ({questions?.length || 0})</h2>

        <div className="space-y-2 overflow-auto h-72 mt-5 pr-2 pink-sc">
          {questions?.map((question, i) => (
            <div
              key={question?.id}
              onClick={() =>
                currentQuestionIndex !== i && setCurrentQuestionIndex(i)
              }
              className={`flex items-center gap-2 rounded-lg border-2 border-transparent bg-gray-50 py-3 px-2 cursor-pointer hover:bg-[#FFF4F9] ${
                currentQuestionIndex === i && "bg-[#FFF4F9] !border-[#EC8AB3]"
              }`}
            >
              <Icon
                icon="icon-park-outline:dot"
                className={`text-2xl !size-4 ${
                  question?.userAnswer ? "!text-[#EC8AB3]" : "!text-black"
                }`}
              />
              <p className="line-clamp-1 flex-1">
                  {`${i+1}. `} {question?.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {questions?.length > 0 && (
        <div className="flex-1">
          <div>
            <h3 className="font-bold text-xl mb-3">
              {`${currentQuestionIndex + 1}. `}
              {questions[currentQuestionIndex]?.description}
            </h3>
            {questions[currentQuestionIndex]?.answers?.map((answer) => (
              <AnswerOption
                key={answer?.id}
                answer={answer}
                isSelected={
                  questions[currentQuestionIndex]?.userAnswer === answer?.id
                }
                name={`question-${questions[currentQuestionIndex]?.id}`}
                isAnswer={false}
              />
            ))}
          </div>

          <div>
            <h3 className="mt-3 font-bold">Answers:</h3>
            {questions[currentQuestionIndex]?.answers?.map((answer) => (
              <div key={answer?.id}>
                <AnswerOption
                  answer={answer}
                  isSelected={
                    questions[currentQuestionIndex]?.userAnswer === answer?.id
                  }
                  name={`questionAnswer-${questions[currentQuestionIndex]?.id}`}
                  isAnswer={true}
                />
                <p className="pb-2">{answer?.reason}</p>
              </div>
            ))}
          </div>

          <div className="space-x-3 mt-5">
            <NavigationButton
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Prev Question
            </NavigationButton>
            <NavigationButton
              onClick={nextQuestion}
              disabled={currentQuestionIndex === questions?.length - 1}
              primary
            >
              Next Question
            </NavigationButton>

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

export default memo(ShowAnswers);
