import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import doc from "../../assets/doc.png";
import {
  addCourseQuestion,
  deleteQuestion,
  deleteVideo,
  editCourse,
  editCourseQuestion,
  editLesson,
  getCourseQuestions,
  getOneCourse,
  schema,
  uploadLesson,
} from "../../utils/courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllSubCategories } from "../../utils/categories";
import NewLessonModal from "./NewLessonModal";
import EditLessonModal from "./EditLessonModal";
import NewQuestionModal from "./NewQuestionModal";
import EditQuestionModal from "./EditQuestionModal";

const EditCourse = () => {
  const params = useParams();
  const currentReq = useRef();
  const currentObj = useRef();
  const [course, setCourse] = useState({});
  const [isPaid, setIsPaid] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [editInfo, setEditInfo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [newLessonModal, setNewLessonModal] = useState(false);
  const [editLessonModal, setEditLessonModal] = useState(false);
  const [newQuestionModal, setNewQuestionModal] = useState(false);
  const [editQuestionModal, setEditQuestionModal] = useState(false);
  const [newLesson, setNewLesson] = useState({
    CourseId: params?.id,
    Title: "",
    Description: "",
    Video: "",
  });
  const [questions, setQuestions] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [answers, setAnswers] = useState({
    A: { description: "", reason: "", isCorrect: false },
    B: { description: "", reason: "", isCorrect: false },
    C: { description: "", reason: "", isCorrect: false },
    D: { description: "", reason: "", isCorrect: false },
  });
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const handleEditCourse = async () => {
    let data = {
      CourseID: +params?.id,
      Price: isPaid ? +getValues("price") : 0,
      Type: isPaid ? 1 : 0,
      Title: getValues("title"),
      DurationInhours: +getValues("duration"),
      Preview: getValues("preview"),
      Thumbnail: getValues("thumbnail")?.[0],
      SubCategoryId: +getValues("subCategoryID"),
      Requirements: requirements,
      Objectives: objectives,
    };
    let res = await editCourse(data);
    if (res?.isSuccess) {
      setEditInfo(false);
    }
  };
  const addToRequirements = (e) => {
    e.preventDefault();
    if (!currentReq.current.value) return;
    setRequirements([...requirements, currentReq.current.value]);
    currentReq.current.value = "";
  };
  const addToObjectives = (e) => {
    e.preventDefault();
    if (!currentObj.current.value) return;
    setObjectives([...objectives, currentObj.current.value]);
    currentObj.current.value = "";
  };
  const handleDeleteVideo = async (videoId) => {
    let res = await deleteVideo(videoId);
    if (res?.isSuccess) {
      let newVideos = course?.videos?.filter((video) => video?.id !== videoId);
      setCourse({ ...course, videos: newVideos });
    }
  };
  const handleEditLesson = async () => {
    if (!videoId) return;
    newLesson.VideoId = videoId;
    let res = await editLesson(newLesson, setUploadProgress);
    if (res?.isSuccess) {
      let resp = await getOneCourse(params?.id);
      setCourse(resp?.data);
    }
  };
  const handleUpload = async () => {
    if (!newLesson?.CourseId) return;
    if (!newLesson?.Video) return;
    let res = await uploadLesson(newLesson, setUploadProgress);
    if (res?.isSuccess) {
      let resp = await getOneCourse(params?.id);
      setCourse(resp?.data);
      console.log("resp", resp);
      
    }
  };
  const fetchQuestions = async () => {
    let res = await getCourseQuestions(params?.id);
    if (res?.isSuccess) {
      setQuestions(res?.data);
    }
  };
  const handleAddQuestion = async () => {
    const data = {
      description: questionTitle,
      answers: Object.values(answers),
    };
    let res = await addCourseQuestion(params?.id, data);
    if (res?.isSuccess) {
      fetchQuestions();
      setNewQuestionModal(false);
      setQuestionTitle("");
      setAnswers({
        A: { description: "", reason: "", isCorrect: false },
        B: { description: "", reason: "", isCorrect: false },
        C: { description: "", reason: "", isCorrect: false },
        D: { description: "", reason: "", isCorrect: false },
      });
      setCorrectAnswer(null);
    }
  };
  const handleDeleteQuestion = async (questionId) => {
    let res = await deleteQuestion(questionId);
    if (res?.isSuccess) {
      setQuestions(questions.filter((question) => question?.id !== questionId));
    }
  };
  const handleEditQuestion = async () => {
    let data = {
      description: questionTitle,
      answers: Object.values(answers),
    };
    let res = await editCourseQuestion(questionId, data);
    if (res?.isSuccess) {
      fetchQuestions();
      setEditQuestionModal(false);
      setQuestionTitle("");
      setAnswers({
        A: { description: "", reason: "", isCorrect: false },
        B: { description: "", reason: "", isCorrect: false },
        C: { description: "", reason: "", isCorrect: false },
        D: { description: "", reason: "", isCorrect: false },
      });
      setCorrectAnswer(null);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      let res = await getOneCourse(params?.id);
      if (res?.isSuccess) {
        setCourse(res?.data);
        setValue("title", res?.data?.title);
        setIsPaid(res?.data?.type === 1);
        setValue("duration", res?.data?.durationInhours?.toString());
        setValue("price", res?.data?.price?.toString());
        setValue("preview", res?.data?.preview);
        setRequirements(res?.data?.requirements);
        setObjectives(res?.data?.objectives);
        let subs = await getAllSubCategories("Courses");
        setSubCategories(subs?.data);
        setValue("subCategoryID", res?.data?.subCategoryId?.toString());
        fetchQuestions();
      }
    };
    fetchCourse();
  }, [params?.id]);

  return (
    <>
      <div className="relative center h-[300px]">
        <img
          src={doc}
          alt="Banner image"
          className="object-cover w-full h-full z-0"
        />
        <div className="absolute z-10 text-center max-w-5xl mt-10 text-white mx-auto px-5">
          <div>
            <h1 className="lg:text-4xl mt-5 font-bold text-lg  text-secondary">
              Edit Your Course
            </h1>
            <p className=" my-4 text-xs lg:text-lg font-light leading-relaxed">
              You Can Add, Edit videos and questions of Your Course from Here
            </p>
          </div>
        </div>
      </div>
      <div className="container py-10">
        <h2 className="lg:text-2xl mb-10 text-center font-bold text-lg  text-secondary">
          Course Information
        </h2>
        <form className="bg-gray-50 p-5 rounded-lg">
          <div className="space-y-5 overflow-auto pink-sc pr-3">
            <div className="center flex-col sm:flex-row">
              <div className="flex-1 w-full">
                <label htmlFor="title" className="text-primary">
                  Course Title
                </label>
                <input
                  className="input"
                  id="title"
                  placeholder="Add Course Title here"
                  {...register("title")}
                  disabled={!editInfo}
                />
                {errors && errors?.title && (
                  <span className="text-red-500 text-sm">
                    {errors?.title?.message}
                  </span>
                )}
              </div>
              <div className="w-full sm:max-w-[40%]">
                <label htmlFor="sub" className="text-primary">
                  Sub Category
                </label>
                <select
                  id="sub"
                  className="input"
                  defaultValue={""}
                  {...register("subCategoryID")}
                  disabled={!editInfo}
                >
                  <option value="" hidden disabled>
                    Choose a sub Category
                  </option>
                  {subCategories?.map((subCategory) => (
                    <option
                      key={subCategory.id}
                      value={subCategory.id}
                      className="bg-white "
                    >
                      {subCategory.name}
                    </option>
                  ))}
                </select>
                {errors && errors?.subCategoryID && (
                  <span className="text-red-500 text-sm">
                    {errors?.subCategoryID?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="center flex-col sm:flex-row">
              <div className="flex-1 w-full">
                <label htmlFor="duration" className="text-primary">
                  Duration ( Hours )
                </label>
                <input
                  type="number"
                  id="duration"
                  placeholder="Enter Duration in Hours"
                  className={`input`}
                  step={0.5}
                  {...register("duration")}
                  disabled={!editInfo}
                />
                {errors && errors?.duration && (
                  <span className="text-red-500 text-sm">
                    {" "}
                    {errors?.duration?.message}
                  </span>
                )}
              </div>
              <div className="mx-5">
                <div className="center mt-8">
                  <label className="relative inline-block w-10 mr-2">
                    <input
                      disabled={!editInfo}
                      type="checkbox"
                      checked={isPaid}
                      onChange={() => setIsPaid(!isPaid)}
                      className="hidden"
                    />
                    <span
                      className={`block w-10 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                        isPaid ? "bg-primary" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 w-4 h-4 m-1 bg-white rounded-full shadow-md soft ${
                          isPaid ? "translate-x-4" : ""
                        }`}
                      />
                    </span>
                  </label>
                  <span
                    onClick={() => {
                      if (!editInfo) return;
                      setIsPaid(!isPaid);
                    }}
                    className="select-none cursor-pointer"
                  >
                    Course is {isPaid ? "Paid" : "Free"}
                  </span>
                </div>
              </div>
              <div className={`flex-1 ${!isPaid && "invisible"} w-full`}>
                <label htmlFor="price" className="text-primary">
                  Paid Subscription ( $ )
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter Price"
                  className={`input`}
                  {...register("price")}
                  disabled={!editInfo}
                />
                {errors && errors?.price && (
                  <span className="text-red-500 text-sm">
                    {errors?.price?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="center flex-col sm:flex-row">
              <div className="flex-1 w-full">
                <label htmlFor="preview" className="text-primary">
                  Course Introduction
                </label>
                <input
                  id="preview"
                  className="input"
                  type="url"
                  placeholder="Link for preview video"
                  {...register("preview")}
                  disabled={!editInfo}
                />
                {errors && errors?.preview && (
                  <span className="text-red-500 text-sm">
                    {errors?.preview?.message}
                  </span>
                )}
              </div>
              <div className="flex-1 w-full">
                <label htmlFor="thumbnail" className="text-primary">
                  Course Cover
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  {...register("thumbnail")}
                  disabled={!editInfo}
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 cursor-pointer focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none file:bg-primary file:cursor-pointer file:border-0 file:me-4 file:py-3 file:px-4 file:text-white"
                />
                {errors && errors?.thumbnail && (
                  <span className="text-red-500 text-sm">
                    {errors?.thumbnail?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-5 flex-col sm:flex-row">
              <div className="center flex-col flex-1">
                <div className="w-full">
                  <label htmlFor="req" className="text-primary">
                    Requirements
                  </label>
                  <input
                    id="req"
                    className="input"
                    placeholder="Add Requirements here"
                    ref={currentReq}
                    disabled={!editInfo}
                  />
                </div>
                <div className="">
                  <button
                    className="w-30 bg-primary rounded-xl text-white p-3"
                    disabled={!editInfo}
                    onClick={(e) => addToRequirements(e)}
                  >{`Add to requirements`}</button>
                </div>
                <div className="flex-1 overflow-auto rounded-xl w-full border pink-sc p-2 bg-white">
                  <ul className="space-y-1 h-40">
                    {requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex justify-between rounded-lg border font-bold border-primary py-2 px-4 text-primary"
                      >
                        <span>{req}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setRequirements(
                              requirements.filter((_, index) => index !== i)
                            );
                          }}
                        >
                          <Icon
                            icon="solar:close-square-bold"
                            className="text-2xl"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="center flex-col flex-1">
                <div className="w-full">
                  <label htmlFor="obj" className="text-primary">
                    Objectives
                  </label>
                  <input
                    id="obj"
                    className="input"
                    placeholder="Add Objectives here"
                    ref={currentObj}
                    disabled={!editInfo}
                  />
                </div>
                <div className="">
                  <button
                    className="w-30 bg-primary rounded-xl text-white p-3"
                    disabled={!editInfo}
                    onClick={(e) => addToObjectives(e)}
                  >{`Add to Objectives`}</button>
                </div>
                <div className="flex-1 overflow-auto rounded-xl w-full border pink-sc p-2 bg-white">
                  <ul className="space-y-1 h-40">
                    {objectives.map((obj, i) => (
                      <li
                        key={i}
                        className="flex justify-between rounded-lg border font-bold border-primary py-2 px-4 text-primary"
                      >
                        <span>{obj}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setObjectives(
                              objectives.filter((_, index) => index !== i)
                            );
                          }}
                        >
                          <Icon
                            icon="solar:close-square-bold"
                            className="text-2xl"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="center mt-4">
            {editInfo ? (
              <button
                className="w-40 bg-primary rounded-xl text-white p-3"
                type="button"
                onClick={handleSubmit(handleEditCourse)}
                disabled={isSubmitting}
              >
                Save Edits
              </button>
            ) : (
              <button
                className="w-40 bg-primary rounded-xl text-white p-3"
                type="button"
                onClick={() => setEditInfo(true)}
              >
                Edit Course Info
              </button>
            )}
          </div>
        </form>
        <hr className="my-10" />
        <div>
          {newLessonModal && (
            <NewLessonModal
              setNewLessonModal={setNewLessonModal}
              setNewLesson={setNewLesson}
              newLesson={newLesson}
              handleUpload={handleUpload}
            />
          )}
          {editLessonModal && (
            <EditLessonModal
              setEditLessonModal={setEditLessonModal}
              setNewLesson={setNewLesson}
              newLesson={newLesson}
              handleEditLesson={handleEditLesson}
              videoId={videoId}
            />
          )}
          <h2 className="lg:text-2xl mb-10 text-center font-bold text-lg text-secondary">
            Course Content
          </h2>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary">Course Content</h3>
            <button
              onClick={() => setNewLessonModal(true)}
              className="bg-primary text-white p-3 rounded-xl"
            >
              Add a Lesson
            </button>
          </div>
          <div className="mt-5 space-y-2">
            {course?.videos?.map((video, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#FFF9FB] shadow hover:bg-[#fcf0f4] py-2 px-4 rounded-xl soft"
              >
                <div className="flex-1">
                  <h4 className="text-primary font-bold">{video?.title}</h4>
                </div>
                <div className=" center !gap-3">
                  <button
                    onClick={() => {
                      setVideoId(video?.id);
                      setNewLesson({
                        CourseId: params?.id,
                        Title: video?.title,
                        Description: video?.description,
                      });
                      setEditLessonModal(true);
                    }}
                    className="bg-primary text-white p-2 rounded-xl"
                  >
                    <Icon icon="bx:edit" />
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(video?.id)}
                    className="bg-red-500 text-white p-2 rounded-xl"
                  >
                    <Icon icon="fluent:delete-16-regular" />
                  </button>
                </div>
              </div>
            ))}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="flex justify-between items-center bg-[#FFF9FB] shadow hover:bg-[#fcf0f4] py-2 px-4 rounded-xl soft">
                <div className="flex-1">
                  <h4 className="text-primary font-bold">
                    Upload Progress: {uploadProgress}%
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="my-10" />
        <div>
          {newQuestionModal && (
            <NewQuestionModal
              setNewQuestionModal={setNewQuestionModal}
              questionTitle={questionTitle}
              setQuestionTitle={setQuestionTitle}
              answers={answers}
              setAnswers={setAnswers}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              handleAddQuestion={handleAddQuestion}
            />
          )}
          {editQuestionModal && (
            <EditQuestionModal
              setEditQuestionModal={setEditQuestionModal}
              questionTitle={questionTitle}
              setQuestionTitle={setQuestionTitle}
              answers={answers}
              setAnswers={setAnswers}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              handleEditQuestion={handleEditQuestion}
            />
          )}
          <h2 className="lg:text-2xl mb-10 text-center font-bold text-lg text-secondary">
            Course Questions
          </h2>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary">Course Questions</h3>
            <button
              onClick={() => setNewQuestionModal(true)}
              className="bg-primary text-white p-3 rounded-xl"
            >
              Add a Question
            </button>
          </div>
          <div className="mt-5 space-y-2">
            {questions?.map((question, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#FFF9FB] shadow hover:bg-[#fcf0f4] py-2 px-4 rounded-xl soft"
              >
                <div className="flex-1">
                  <h4 className="text-primary font-bold">
                    {question.description}
                  </h4>
                </div>
                <div className=" center !gap-3">
                  <button
                    onClick={() => {
                      setQuestionId(question?.id);
                      setQuestionTitle(question?.description);
                      setAnswers({
                        A: question?.answers[0],
                        B: question?.answers[1],
                        C: question?.answers[2],
                        D: question?.answers[3],
                      });
                      const answerMap = { 0: "A", 1: "B", 2: "C", 3: "D" };
                      const correctAnswerKey = Object.keys(answerMap).find(
                        (key) => question?.answers[key]?.isCorrect
                      );
                      setCorrectAnswer(answerMap[correctAnswerKey]);
                      setEditQuestionModal(true);
                    }}
                    className="bg-primary text-white p-2 rounded-xl"
                  >
                    <Icon icon="bx:edit" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question?.id)}
                    className="bg-red-500 text-white p-2 rounded-xl"
                  >
                    <Icon icon="fluent:delete-16-regular" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
