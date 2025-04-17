import { useState } from "react";
import { toast } from "react-toastify";

const AddUserModal = ({
  setEnrollModal,
  setReceipt,
  studentEmail,
  setStudentEmail,
  handleRequest,
  receipt,
}) => {
    const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setEnrollModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-5 px-8 rounded-xl bg-white w-[90vw] max-w-[500px]">
        <h2 className="text-2xl font-bold text-[#E2508D] mb-5">
          Add Student to this Course
        </h2>

        <label htmlFor="userEmail" className="text-start block my-1">
          Student Email
        </label>
        <input
          id="userEmail"
          type="email"
          placeholder="Enter Student email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="input"
        />

        <label htmlFor="file" className="text-start block mb-1 mt-3">
          Upload a receipt
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          multiple={false}
          onChange={(e) => setReceipt(e.target.files[0])}
          className="block w-full border mb-8 border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 cursor-pointer focus:border-[#E2508D] focus:ring-[#E2508D] disabled:opacity-50 disabled:pointer-events-none file:bg-[#E2508D] file:cursor-pointer file:border-0 file:me-4 file:py-3 file:px-4 file:text-white"
        />
        <div className="center">
          <button
            className="bg-white text-[#E2508D] border border-[#E2508D]  rounded-full px-8 py-3"
            onClick={() => setEnrollModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#E2508D] text-white rounded-full px-10 py-3"
            disabled={isLoading}
            onClick={async () => {
              if (!receipt) {
                toast.error("Please upload the receipt");
                return;
              }
              setIsLoading(true);
              await handleRequest();
              setIsLoading(false);
              setEnrollModal(false);
            }}
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </div>
    </>
  );
};
export default AddUserModal;
