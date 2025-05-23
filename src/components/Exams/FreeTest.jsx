import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TestDone from "./TestDone";
import EnrollModal from "../Courses/EnrollModal";
import { getUser } from "../../utils/LocalStorage";
import {
  requestLocalPaypalSubscription,
  requestLocalSubscription,
} from "../../utils/courses";
import { useParams } from "react-router-dom";
import { getTestQuestions } from "../../utils/Exams";
import ShowAnswers from "./ShowAnswers";
import CircularTimer from "./Timer";

const FreeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testDone, setTestDone] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [paypalEmail, setPaypalEmail] = useState("");
  const params = useParams();
  const duration = params?.duration || 0;
  const [showAnswers, setShowAnswers] = useState(false);
  // const [filter, setFilter] = useState("all");
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions?.length - 1)
    );
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAnswer = (answerId) => {
    setQuestions((prevQuestions) =>
      prevQuestions?.map((question, index) => {
        if (index === currentQuestionIndex) {
          return { ...question, userAnswer: answerId };
        }
        return question;
      })
    );
  };
  const handleLocalPayment = async () => {
    let { id } = getUser();
    let data = {
      UserId: id,
      TransactionImage: receipt,
    };
    let res = await requestLocalSubscription(data);
    if (res?.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Enroll Request Sent",
        text: res.message,
        timer: 2000,
      });
    } else {
      toast.error(res.message);
    }
  };
  const handlePaypalPayment = async () => {
    let user = getUser();
    let data = {
      userId: user?.id,
      subscriberEmail: paypalEmail,
      subscriberFirstName: user?.firstName,
      subscriberLastName: user?.lastName,
    };
    let res = await requestLocalPaypalSubscription(data);

    if (res?.isSuccess) {
      const approveLink = res.data.links.find((link) => link.rel === "approve");
      if (approveLink && approveLink.href) {
        window.location.href = approveLink.href;
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } else {
      toast.error(res.message);
    }
  };
  // const filteredQuestions = questions?.filter((q) => {
  //   if (filter === "answered") return q.userAnswer !== undefined;
  //   if (filter === "unanswered") return q.userAnswer === undefined;
  //   return true;
  // });

  const calculateResult = async () => {
    const unansweredQuestions = questions?.filter(
      (question) => question?.userAnswer === undefined
    );

    if (unansweredQuestions?.length > 0) {
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

      questions?.forEach((question) => {
        const selectedAnswer = question?.answers.find(
          (answer) => answer.id === question?.userAnswer
        );

        if (selectedAnswer && selectedAnswer.isCorrect) {
          correctCount += 1;
        }
      });
      const scorePercentage = (correctCount / questions?.length) * 100;

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
      questions?.map((question) => {
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
      {subscriptionModal && (
        <EnrollModal
          setEnrollModal={setSubscriptionModal}
          enrollPrice={100}
          setReceipt={setReceipt}
          handleLocalPayment={handleLocalPayment}
          handlePaypalPayment={handlePaypalPayment}
          setPaypalEmail={setPaypalEmail}
          paypalEmail={paypalEmail}
          receipt={receipt}
        />
      )}
      <div className="h-[70px] bg-[#1E0C2F]" />
      {testDone ? (
        <TestDone
          {...{
            scorePercentage,
            correctAnswersCount,
            questions,
            resetTest,
            setSubscriptionModal,
            isFree: true,
            setTestDone,
            setShowAnswers,
          }}
        />
      ) : showAnswers ? (
        <ShowAnswers
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          isFree={true}
        />
      ) : (
        <>
          <div className="flex gap-5 flex-wrap pt-10 pb-20 container !select-none">
            <div className="flex justify-between items-center flex-col md:flex-row gap-5 bg-white p-5 rounded-xl shadow mb-10">
              <div>
                <p className="font-bold">Unlock Your Full Potential!</p>
                <p className="mt-1 text-sm">
                  Upgrade to the premium plan and gain access to more than 500
                  questions in Anatomy. Test your knowledge with an expanded
                  question bank and ensure you&apos;re fully prepared.
                </p>
              </div>
              <button
                onClick={() => setSubscriptionModal(true)}
                className="px-5 py-3 rounded-lg soft bg-[#CC775D] text-white w-56"
              >
                Upgrade Now
              </button>
            </div>
            <div className="flex gap-12 flex-col md:flex-row w-full">
              <div className="rounded-xl bg-white p-5 border-2 border-[#EC8AB3] h-96 md:w-[460px] ">
                <h2 className="font-bold">
                  Questions {`(${questions?.length || 0})`}
                </h2>
                <div className="space-y-2 overflow-auto h-72 mt-5 pr-2 pink-sc">
                  {questions?.map((question, i) => (
                    <div
                      key={question?.id}
                      onClick={() => setCurrentQuestionIndex(i)}
                      className={`flex items-center gap-2 rounded-lg border-2 border-transparent bg-gray-50 py-3 px-2 cursor-pointer hover:bg-[#FFF4F9]
                ${currentQuestionIndex === i && "bg-[#FFF4F9] !border-[#EC8AB3]"
                        }
                `}
                    >
                      <Icon
                        icon="icon-park-outline:dot"
                        className={`text-2xl !size-4 ${question?.userAnswer
                            ? "!text-[#EC8AB3]"
                            : " !text-black"
                          }`}
                      />
                      <p className="line-clamp-1 flex-1">
                        {`${i + 1}. `} {question?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {questions?.length > 0 && (
                <div className="flex-1 ">
                  {/* Current Question and Answer Options */}
                  <div>
                    <h3 className="font-bold text-xl mb-3">
                      {`${currentQuestionIndex + 1}. `}
                      {questions[currentQuestionIndex]?.description}
                    </h3>
                    {questions[currentQuestionIndex]?.answers.map((answer) => (
                      <label
                        key={answer.id}
                        className="flex gap-3 py-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${questions[currentQuestionIndex]?.id}`}
                          value={answer.id}
                          checked={
                            questions[currentQuestionIndex]?.userAnswer ===
                            answer.id
                          }
                          onChange={() => handleAnswer(answer.id)}
                        />
                        <span className="py-1">{answer.description}</span>
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
                        disabled={
                          currentQuestionIndex === questions?.length - 1
                        }
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
                  redirectPath="/academy/free-exams"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FreeTest;
