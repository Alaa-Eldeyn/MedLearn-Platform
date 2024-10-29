import { Link } from "react-router-dom";
import { forgetPass } from "../../utils/auth";
import forget from "../../assets/forget.svg";
import { useForm } from "react-hook-form";

const ForgetPass = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const handleForgetPass = async () => {
    let res = await forgetPass(getValues("email"));
    if (!res?.isSuccess) {
      console.log("Error:", res);
      return;
    }
  };
  return (
    <div className="min-h-screen center bg-slate-100 py-4 sm:py-0">
      <div className="rounded-3xl grid gap-5 grid-cols-1 md:grid-cols-2 items-center p-5 bg-white container max-w-[60rem] w-full">
        <div className="rounded-3xl p-4 !hidden md:!flex center bg-gradient-to-b from-[#59248E] to-99% to-[#AC59FF] w-full h-full">
          <img src={forget} alt="" />
          <div className="absolute bg-[#0f0f0f28] w-60 h-5 rounded-full blur bottom-40"></div>
        </div>
        <form className="py-10 px-5 w-full">
          <div className="text-center my-10 w-full mx-auto ">
            <h3 className="text-primary text-2xl font-extrabold text-center">
              Forget Password?
            </h3>
            <span className="text-secondary">Don’t Worry</span>
          </div>
          <p>
            Please enter the email address associated with your account, and you
            will receive a request to reset your password.
          </p>

          <div className="mt-4">
            <label className="text-base font-normal mb-2 block text-primary">
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              name="email"
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-bgColor"
              placeholder="user@example.com"
            />
            {errors?.email && (
              <span className="text-red-600 text-sm">
                {errors?.email?.message}
              </span>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              onClick={handleSubmit(handleForgetPass)}
              className="w-full py-3 px-6 tracking-wide rounded-xl text-white font-bold text-lg bg-primary focus:outline-none transition-all"
            >
              Send
            </button>
            <Link className="block mt-5" to={"/sign-in"}>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
