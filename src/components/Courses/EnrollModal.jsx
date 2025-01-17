import { useState } from "react";
import paypal from "../../assets/image.svg";
import card from "../../assets/twemoji_credit-card.svg";
import { toast } from "react-toastify";

const EnrollModal = ({
  setEnrollModal,
  enrollPrice,
  setReceipt,
  handleLocalPayment,
  handlePaypalPayment,
  setPaypalEmail,
  paypalEmail,
  receipt,
}) => {
  const [method, setMethod] = useState("");
  const [step, setStep] = useState(0); // 0: choose method, 1: paypal, 2: local
  const [tooltip, setTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setEnrollModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-10 py-6 rounded-3xl w-[90vw] max-w-lg text-center ">
          {step === 0 && (
            <>
              <h2 className="text-2xl font-bold text-[#E2508D]">
                Choose Payment Method
              </h2>
              <div className="center my-5">
                <div
                  className={`border-2 border-transparent bg-[#FFF4F8] rounded-xl p-3 cursor-pointer w-32 h-36 center flex-col !gap-2 text-sm ${
                    method === "paypal" ? "!border-secondary " : ""
                  }`}
                  onClick={() => setMethod("paypal")}
                >
                  <img src={paypal} alt="" className="size-20 flex-1" />
                  Paypal
                </div>
                <div className="center my-5">
                  <div
                    className={`border-2 border-transparent bg-[#FFF4F8] rounded-xl p-3 cursor-pointer w-32 h-36 center flex-col !gap-2 text-sm ${
                      method === "local" ? "!border-secondary " : ""
                    }`}
                    onClick={() => setMethod("local")}
                  >
                    <img src={card} alt="" className="size-14 flex-1" />
                    Local Payment
                  </div>
                </div>
              </div>
              <div className="center">
                <button
                  className="bg-white text-primary border border-primary  rounded-full px-8 py-3"
                  onClick={() => setEnrollModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-white rounded-full px-8 py-3"
                  onClick={() => {
                    if (method === "paypal") {
                      setStep(1);
                    } else if (method === "local") {
                      setStep(2);
                    } else {
                      setStep(0);
                    }
                  }}
                >
                  Pay {enrollPrice}$
                </button>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-[#E2508D]">
                Pay with Paypal
              </h2>
              <div className="bg-[#FFF4F8] px-5 py-2 my-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="with-corner-hint"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <span
                    className="block relative mb-2 text-sm text-white bg-[#E2508D] rounded-full px-2 cursor-pointer select-none"
                    title="make sure to use the same email you used for your paypal"
                    onClick={() => setTooltip(!tooltip)}
                  >
                    {tooltip && (
                      <span className="absolute bg-gray-500 p-1 rounded-lg w-56 bottom-5 right-0 opacity-90">
                        - PAYPAL ADD 6% FEE.
                        <br />- Make sure to use the same email you used for
                        your paypal.
                      </span>
                    )}
                    ?
                  </span>
                </div>
                <input
                  type="email"
                  id="with-corner-hint"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="you@example.com"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
              </div>
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
                    if (paypalEmail.length === 0) {
                      toast.error("Please enter your email");
                      return;
                    }
                    if (paypalEmail) {
                      setIsLoading(true);
                      await handlePaypalPayment();
                      setIsLoading(false);
                      setEnrollModal(false);
                    }
                  }}
                >
                  {isLoading ? "Loading..." : "Pay"}
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-[#E2508D]">
                Pay with local payment Method
              </h2>
              <div className="text-center bg-[#FFF4F8] rounded-xl px-8 py-4 mt-5">
                If you’d like to pay using Vodafone Cash or InstaPay, please
                attach a payment receipt (Transaction Image) here and contact
                the admin at for assistance.
                <a
                  href="https://wa.me/+201015800248"
                  className=" font-bold text-[#E2508D] block mt-3"
                >
                  201015800248
                </a>
              </div>
              <label htmlFor="file" className="text-start block my-1">
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
                    await handleLocalPayment();
                    setIsLoading(false);
                    setEnrollModal(false);
                  }}
                >
                  {isLoading ? "Loading..." : "Pay"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollModal;
