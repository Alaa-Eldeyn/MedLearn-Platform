import { Icon } from "@iconify/react/dist/iconify.js";

const TestDone = ({
  scorePercentage,
  correctAnswersCount,
  questions,
  resetTest,
  setSubscriptionModal,
  isFree,
}) => {
  return (
    <>
      <div className="flex justify-center items-center min-h-[500px] py-20 text-center container">
        {scorePercentage >= 50 ? (
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-3xl font-bold text-[#E2508D]">
              Congratulations! You&apos;ve Completed the Exam
            </h2>
            <p className="text-md text-center">
              You have successfully completed the test. Your score is{" "}
              <span className="font-bold text-[#EC8AB3]">
                {scorePercentage.toFixed(2)}%
              </span>
            </p>
            <div className="relative center size-32 rounded-full bg-gray-200">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#842A8C ${scorePercentage}%, #e0e0e0 0)`,
                }}
              >
                <div className="absolute inset-0 rounded-full m-3 bg-white center">
                  <span className="text-2xl font-bold text-[#CC775D]">
                    {correctAnswersCount}/{questions.length}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-center max-w-[600px]">
              Great job on reaching this milestone!
              <br /> But why stop here? Unlock the full question bank and
              challenge yourself even further by upgrading to the premium plan.
              With access to hundreds more questions, you&apos;ll strengthen
              your knowledge and boost your confidence even more. Keep up the
              momentum and take your learning to the next level!
            </p>
            <div className="flex gap-3">
              <button className="px-5 py-2 rounded-lg soft bg-[#984D9F] text-white">
                Got it
              </button>
              <button
                onClick={() => resetTest()}
                className="px-5 py-2 rounded-lg soft bg-[#FAEBF1]"
              >
                Retake the Exam
              </button>
            </div>
            {isFree && (
              <button
                onClick={() => setSubscriptionModal(true)}
                className="group text-[#E2508D] center !gap-2 font-bold"
              >
                Upgrade for More Questions
                <Icon
                  icon="icon-park-outline:arrow-right"
                  className=" group-hover:translate-x-2 soft"
                />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-3xl font-bold text-[#E2508D]">
              Keep going—you’re closer to success than you think!
            </h2>
            <p className="text-md text-center">
              You have successfully completed the test. Your score is{" "}
              <span className="font-bold text-[#EC8AB3]">
                {scorePercentage.toFixed(2)}%
              </span>
            </p>
            <div className="relative center size-32 rounded-full bg-gray-200">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#842A8C ${scorePercentage}%, #e0e0e0 0)`,
                }}
              >
                <div className="absolute inset-0 rounded-full m-3 bg-white center">
                  <span className="text-2xl font-bold text-[#CC775D]">
                    {correctAnswersCount}/{questions.length}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-center max-w-[600px]">
              But don&apos;t get discouraged! Every step is progress, and
              you&apos;re already on your way to improving. To help you reach
              your goal, why not unlock the full question bank by upgrading to
              the premium plan? With access to hundreds more questions, you can
              practice, refine your knowledge, and come back stronger than ever.
            </p>
            <div className="flex gap-3">
              <button className="px-5 py-2 rounded-lg soft bg-[#984D9F] text-white">
                Got it
              </button>
              <button
                onClick={() => resetTest()}
                className="px-5 py-2 rounded-lg soft bg-[#FAEBF1]"
              >
                Retake the Exam
              </button>
            </div>
            {isFree && (
              <button
                onClick={() => setSubscriptionModal(true)}
                className="group text-[#E2508D] center !gap-2 font-bold"
              >
                Upgrade for More Questions
                <Icon
                  icon="icon-park-outline:arrow-right"
                  className=" group-hover:translate-x-2 soft"
                />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TestDone;
