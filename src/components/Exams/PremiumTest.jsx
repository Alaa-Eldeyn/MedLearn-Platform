import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TestDone from "./TestDone";
import { useParams } from "react-router-dom";
import { getTestQuestions } from "../../utils/Exams";
import ShowAnswers from "./ShowAnswers";
import CircularTimer from "./Timer";

const PremiumTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testDone, setTestDone] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);
  const params = useParams();
  const duration = params?.duration || 0;
  const [showAnswers, setShowAnswers] = useState(false);
  // const [filter, setFilter] = useState("all");
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAnswer = (answerId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return { ...question, userAnswer: answerId };
        }
        return question;
      })
    );
  };

  // const filteredQuestions = questions.filter((q) => {
  //   if (filter === "answered") return q.userAnswer !== undefined;
  //   if (filter === "unanswered") return q.userAnswer === undefined;
  //   return true;
  // });

  const calculateResult = async () => {
    const unansweredQuestions = questions.filter(
      (question) => question.userAnswer === undefined
    );

    if (unansweredQuestions.length > 0) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    });

    if (result.isConfirmed) {
      let correctCount = 0;

      questions.forEach((question) => {
        const selectedAnswer = question.answers.find(
          (answer) => answer.id === question.userAnswer
        );

        if (selectedAnswer && selectedAnswer.isCorrect) {
          correctCount += 1;
        }
      });
      const scorePercentage = (correctCount / questions.length) * 100;

      setCorrectAnswersCount(correctCount);
      setScorePercentage(scorePercentage);
      setTestDone(true);

      return {
        success: true,
        correctAnswersCount: correctCount,
        scorePercentage,
      };
    }
  };
  const resetTest = () => {
    setTestDone(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    setScorePercentage(0);
    setQuestions(
      questions.map((question) => {
        return { ...question, userAnswer: undefined };
      })
    );
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getTestQuestions(params?.id);
      setQuestions(res?.data);
    };
    fetchQuestions();
  }, [params?.id]);
  return (
    <div className="bg-gray-50">
      <div className="h-[70px] bg-[#1E0C2F]" />
      {testDone ? (
        <TestDone
          {...{
            scorePercentage,
            correctAnswersCount,
            questions,
            resetTest,
            isFree: false,
            setShowAnswers,
            setTestDone,
          }}
        />
      ) : showAnswers ? (
        <ShowAnswers
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          isFree={false}
        />
      ) : (
        <>
          <div className="flex gap-12 flex-col md:flex-row py-10 container w-full">
            <div className="rounded-xl bg-white p-5 border-2 border-[#EC8AB3] h-96 md:w-[460px] ">
              <h2 className="font-bold">
                Questions {`(${questions?.length || 0})`}
              </h2>
              {/* Filter Buttons */}
              {/* <div className="space-x-2 pb-5 pt-2 text-xs">
            <button
              className={`px-3 py-1 rounded-lg soft hover:text-white bg-[#FFF4F9] hover:bg-[#EC8AB3] ${
                filter == "all" && "!bg-[#EC8AB3] !text-white"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-lg soft hover:text-white bg-[#FFF4F9] hover:bg-[#EC8AB3] ${
                filter == "answered" && "!bg-[#EC8AB3] !text-white"
              }`}
              onClick={() => setFilter("answered")}
            >
              Answered Questions
            </button>
            <button
              className={`px-3 py-1 rounded-lg soft hover:text-white bg-[#FFF4F9] hover:bg-[#EC8AB3] ${
                filter == "unanswered" && "!bg-[#EC8AB3] !text-white"
              }`}
              onClick={() => setFilter("unanswered")}
            >
              Unanswered Questions
            </button>
          </div> */}

              {/* Question List with Indicator Circles */}
              <div className="space-y-2 overflow-auto h-72 mt-5 pr-2 pink-sc">
                {questions?.map((question, i) => (
                  <div
                    key={question?.id}
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={`flex items-center gap-2 rounded-lg border-2 border-transparent bg-gray-50 py-3 px-2 cursor-pointer hover:bg-[#FFF4F9]
                ${
                  currentQuestionIndex === i && "bg-[#FFF4F9] !border-[#EC8AB3]"
                }
                `}
                  >
                    <Icon
                      icon="icon-park-outline:dot"
                      className={`text-2xl !size-4 ${
                        question?.userAnswer
                          ? "!text-[#EC8AB3]"
                          : " !text-black"
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
                {/* Current Question and Answer Options */}
                <div>
                  <h3 className="font-bold text-xl mb-3">
                    {`${currentQuestionIndex + 1}. `}
                    {questions[currentQuestionIndex]?.description}
                  </h3>
                  {questions[currentQuestionIndex]?.answers?.map((answer) => (
                    <label
                      key={answer?.id}
                      className="flex gap-3 py-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${questions[currentQuestionIndex]?.id}`}
                        value={answer.id}
                        checked={
                          questions[currentQuestionIndex]?.userAnswer ===
                          answer?.id
                        }
                        onChange={() => handleAnswer(answer?.id)}
                      />
                      <span className="py-1">{answer?.description}</span>
                    </label>
                  ))}
                </div>
                {/* Navigation Buttons */}
                <div className="space-x-3 mt-5">
                  {currentQuestionIndex === questions?.length - 1 ? (
                    <button
                      className="px-5 py-2 rounded-lg soft bg-[#984D9F] text-white"
                      onClick={() => {
                        calculateResult();
                      }}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      disabled={currentQuestionIndex === questions?.length - 1}
                      className="px-5 py-2 rounded-lg soft bg-[#984D9F] text-white"
                      onClick={nextQuestion}
                    >
                      Next Question
                    </button>
                  )}
                  <button
                    disabled={currentQuestionIndex === 0}
                    className="px-5 py-2 rounded-lg soft text-[#984D9F] border border-[#984D9F]"
                    onClick={prevQuestion}
                  >
                    Prev Question
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <CircularTimer
                duration={duration * 60}
                redirectPath="/academy/premium-exams"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PremiumTest;
