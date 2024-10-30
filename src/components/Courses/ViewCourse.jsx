import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../utils/LocalStorage";
import { getCourseQuestions, getJoinedCourses } from "../../utils/courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";

const ViewCourse = () => {
  const params = useParams();
  const { id } = getUser();
  const [course, setCourse] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentLesson, setCurrentLesson] = useState({});
  const [testMode, setTestMode] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerChange = (questionId, answerId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerId,
    });
  };

  const calculateScore = () => {
    // Check if user answered all questions
    const allAnswered = questions.every((question) => userAnswers[question.id]);

    if (!allAnswered) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please answer all questions!",
      });
      return;
    }
    let correctAnswers = 0;
    questions.forEach((question) => {
      const correctAnswer = question.answers.find((ans) => ans.isCorrect);
      if (userAnswers[question.id] === correctAnswer.id) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);

    if ((correctAnswers / questions.length) * 100 >= 50) {
      Swal.fire({
        icon: "success",
        title: "Congratulations on Completing the Course!",
        text: "Well done! You’ve successfully completed the course",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Keep Going!",
        text: "You’ve completed the course [Course Name], but don’t worry if you didn’t pass the final exam this time. Every learning journey comes with challenges, and this is just one step toward your success. Review the material and try again when you're ready — we believe in your ability to succeed!",
      });
    }
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      let res = await getJoinedCourses(id);
      let myCourse = res?.data.find((course) => course.id == params?.id);
      if (myCourse) {
        setCourse(myCourse);
      } else {
        setCourse({});
      }
    };
    fetchUserCourses();
  }, [params?.id]);
  useEffect(() => {
    if (testMode) {
      const fetchQuestions = async () => {
        let res = await getCourseQuestions(params?.id);
        setQuestions(res?.data);
      };
      fetchQuestions();
    }
  }, [testMode]);

  return (
    <>
      <div className="h-[70px] bg-[#1E0C2F]" />
      <div className="bg-gray-50 ">
        <div className="container py-16">
          <h1 className="text-2xl font-bold text-primary mb-4">
            {course?.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
            <div className="flex flex-col gap-4 ">
              <div className="bg-white rounded-xl p-3 space-y-2 pink-sc h-[400px] shadow overflow-auto ">
                {course?.videos?.map((video, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setCurrentLesson(video);
                      setSelectedLesson(i);
                      setTestMode(false);
                    }}
                    className={`border ${
                      selectedLesson === i
                        ? "border-[#E2508D] text-[#E2508D]"
                        : ""
                    } hover:border-[#E2508D] cursor-pointer h-10 w-full rounded-xl soft flex items-center gap-2 p-2`}
                  >
                    <Icon
                      icon="mage:tag-check-fill"
                      className="text-[#E2508D]"
                    />
                    Lesson {i + 1} : {video.title}
                  </div>
                ))}
              </div>
              <div
                onClick={() => setTestMode(true)}
                className={`border ${
                  testMode && "border-[#E2508D] text-[#E2508D]"
                } hover:border-[#E2508D] cursor-pointer h-10 w-full rounded-xl soft flex items-center gap-2 p-2`}
              >
                <Icon icon="mage:tag-check" />
                Course Test
              </div>
            </div>
            <div className="col-span-2 ">
              {testMode ? (
                <div className="flex flex-col gap-4">
                  <div className="w-full rounded-xl bg-white p-5 h-[400px] overflow-auto shadow pink-sc">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {course?.title}
                    </h2>
                    {questions.map((question, i) => (
                      <div key={question.id} className="w-full mb-4">
                        <h3 className="font-bold mb-1">
                          {i + 1}. {question.description}
                        </h3>
                        {question.answers.map((answer) => (
                          <label
                            key={answer.id}
                            className={`flex items-center p-2 mb-2 cursor-pointer text-black hover:bg-gray-50 soft rounded-lg ${
                              userAnswers[question.id] === answer.id
                                ? "!bg-gray-100"
                                : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={answer.id}
                              onChange={() =>
                                handleAnswerChange(question.id, answer.id)
                              }
                              className="mr-2"
                            />
                            {answer.description}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-5 items-center justify-between ">
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-lg h-10"
                      onClick={calculateScore}
                    >
                      Submit
                    </button>
                    {score !== null && (
                      <p>
                        Your Score: {score} / {questions.length}
                        <span
                          className={`${
                            (score / questions.length) * 100 >= 50
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {" "}
                          ({((score / questions.length) * 100).toFixed(2)}%)
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full rounded-xl">
                  <video className="w-full h-full rounded-xl" controls>
                    <source
                      // src="https://www.w3schools.com/html/mov_bbb.mp4"
                      src={`http://localhost:5000${currentLesson?.videoURL}`}
                    />
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
