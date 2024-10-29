const NewQuestionModal = ({
  setNewQuestionModal,
  questionTitle,
  setQuestionTitle,
  answers,
  setAnswers,
  correctAnswer,
  setCorrectAnswer,
  handleAddQuestion,
}) => {
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setNewQuestionModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-10 py-6 rounded-3xl w-[90vw] max-w-lg ">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">
            New Question
          </h2>
          <label className="text-primary mb-1 block text-sm" htmlFor="question">
            Question
          </label>
          <input
            type="text"
            id="question"
            placeholder="Enter Question here"
            className="input"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <p className="mt-3 mb-2 text-primary text-sm">Available Options</p>
          {Object.keys(answers).map((key, index) => (
            <div key={key} className="flex gap-5">
              <div className="pt-3">{key}</div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder={`option ${index + 1}`}
                  className="input mb-3"
                  value={answers[key].description}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [key]: {
                        ...answers[key],
                        description: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
          <p className="mt-3 mb-2 text-primary text-sm">Correct Answer</p>
          <div className="flex gap-5 select-none">
            {Object.keys(answers).map((key) => (
              <label key={key} className=" cursor-pointer">
                <input
                  type="radio"
                  className="cursor-pointer"
                  value={key}
                  checked={correctAnswer === key}
                  onChange={() => {
                    setCorrectAnswer(key);
                    setAnswers({
                      A: { ...answers.A, isCorrect: key === "A" },
                      B: { ...answers.B, isCorrect: key === "B" },
                      C: { ...answers.C, isCorrect: key === "C" },
                      D: { ...answers.D, isCorrect: key === "D" },
                    });
                  }}
                />{" "}
                {key}
              </label>
            ))}
          </div>
          <div className="center mt-4">
            <button
              className="grow border border-primary rounded-xl text-primary p-3 mx-auto mt-3"
              type="button"
              onClick={() => {
                setQuestionTitle("");
                setAnswers({
                  A: { description: "", reason: "", isCorrect: false },
                  B: { description: "", reason: "", isCorrect: false },
                  C: { description: "", reason: "", isCorrect: false },
                  D: { description: "", reason: "", isCorrect: false },
                });
                setCorrectAnswer(null);
                setNewQuestionModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="grow bg-primary rounded-xl text-white p-3 mx-auto mt-3"
              type="button"
              onClick={() => {
                handleAddQuestion();
                setNewQuestionModal(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewQuestionModal;
