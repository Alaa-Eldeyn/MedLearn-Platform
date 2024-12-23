import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPassSchema, resetPassword } from "../../utils/auth";
import forget from "../../assets/forget.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ResetPass = () => {
  const [isDone, setIsDone] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPassSchema),
  });
  const handleResetPass = async (data) => {
    let res = await resetPassword({ ...data, email, token });
    if (res?.isSuccess) {
      setIsDone(true);
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setEmail(searchParams.get("email"));
    setToken(searchParams.get("token"));
  }, []);
  return (
    <>
      <div className="min-h-screen center bg-slate-100 py-4 sm:py-0">
        <div className="rounded-3xl grid gap-5 grid-cols-1 md:grid-cols-2 items-center p-5 bg-white container max-w-[60rem] w-full">
          <div className="rounded-3xl p-4 !hidden md:!flex center bg-gradient-to-b from-[#59248E] to-99% to-[#AC59FF] w-full h-full">
            <img src={forget} alt="" />
            <div className="absolute bg-[#0f0f0f28] w-80 h-5 rounded-full blur bottom-40"></div>
          </div>
          {isDone ? (
            <div className="center min-h-[60vh] flex-col px-5">
              <h3 className="text-primary text-2xl font-bold max-md:text-center">
                Congratulations!
              </h3>
              <p>
                Your password has been successfully changed. You can now use
                your new password to log in to your account and continue
                enjoying our services.
              </p>
              <Link
                to="/"
                className="w-full py-3 px-6 text-lg text-center tracking-wide font-bold rounded-xl text-white bg-primary focus:outline-none soft"
              >
                Go To Homepage
              </Link>
            </div>
          ) : (
            <form className="py-10 px-5 w-full my-5">
              <div className="text-center w-full mx-auto">
                <h3 className="text-primary text-2xl font-bold max-md:text-center">
                  Reset Your Password!
                </h3>
                <p className="text-start mt-4">
                  You’ve successfully verified your identity. Now you can reset
                  your password.
                </p>
              </div>
              <div className="my-6 grid lg:grid-cols-1 gap-6">
                <div>
                  <label className="text-base font-normal mb-2 block text-primary">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      {...register("password")}
                      className={`bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-bgColor ${
                        errors?.password ? "border-red-500" : ""
                      }`}
                      placeholder="Enter New Password"
                    />
                  </div>
                  {errors?.password && (
                    <p className="text-red-600 mt-1 text-sm">
                      {errors?.password?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="my-6 grid lg:grid-cols-1 gap-6">
                <div>
                  <label className="text-base font-normal mb-2 block text-primary">
                    Confirm New Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      className={`bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-bgColor ${
                        errors?.confirmPassword ? "border-red-500" : ""
                      }`}
                      placeholder="Confirm New Password"
                    />
                  </div>
                  {errors?.confirmPassword && (
                    <p className="text-red-600 mt-1 text-sm">
                      {errors?.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSubmit(handleResetPass)}
                  className="w-full py-3 px-6 text-lg tracking-wide font-bold rounded-xl text-white bg-primary focus:outline-none soft"
                  disabled={!email || !token || isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPass;
