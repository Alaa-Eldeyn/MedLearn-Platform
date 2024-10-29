const EditLessonModal = ({
  setEditLessonModal,
  setNewLesson,
  newLesson,
  handleEditLesson,
}) => {
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setEditLessonModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-10 py-6 rounded-3xl w-[90vw] max-w-lg ">
          <form className="space-y-2">
            <h2 className="text-2xl font-bold text-center text-primary">
              Edit Lesson
            </h2>
            <div>
              <label htmlFor="title">Title</label>
              <input
                className="input"
                id="title"
                type="text"
                placeholder="Enter title"
                value={newLesson.Title}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, Title: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="input"
                id="description"
                placeholder="Enter description"
                value={newLesson.Description}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, Description: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="file">Upload Video</label>
              <input
                id="file"
                type="file"
                accept="video/*"
                multiple={false}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, Video: e.target.files[0] })
                }
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 cursor-pointer focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none file:bg-primary file:cursor-pointer file:border-0 file:me-4 file:py-3 file:px-4 file:text-white"
              />
            </div>
            <div className="center">
              <button
                className="grow border border-primary rounded-xl text-primary p-3 mx-auto mt-3"
                type="button"
                onClick={() => setEditLessonModal(false)}
              >
                Cancel
              </button>
              <button
                className="grow bg-primary rounded-xl text-white p-3 mx-auto mt-3"
                type="button"
                onClick={() => {
                  handleEditLesson();
                  setEditLessonModal(false);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditLessonModal;
