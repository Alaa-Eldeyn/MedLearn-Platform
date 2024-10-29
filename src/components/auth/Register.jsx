import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp, SignupSchema } from "../../utils/auth";
import signup from "../../assets/signup.svg";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const RegisterUser = async (data) => {
    let res = await signUp(data);
    console.log(res);
  };
  return (
    <div className="min-h-screen center bg-slate-100 py-4 sm:py-0">
      <div className="rounded-3xl grid gap-5 grid-cols-1 md:grid-cols-2 items-center p-3 bg-white container max-w-[70rem] w-full">
        <div className="rounded-3xl p-4 !hidden md:!flex center bg-gradient-to-b from-[#59248E] to-99% to-[#AC59FF] w-full h-full">
          <img src={signup} alt="hero image" className=" drop-shadow-xl" />
          <div className="absolute bg-[#0f0f0f28] w-80 h-5 rounded-full blur bottom-40"></div>
        </div>
        <form className={`p-4 w-full space-y-4`}>
          <div className="text-center w-full mx-auto">
            <span className="text-secondary">Welcome to</span>
            <h3 className="text-primary text-[24px] font-bold max-md:text-center">
              MedLearn Hub
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <div>
              <label className="text-base font-normal mb-2 block text-primary">
                First Name *
              </label>
              <input
                {...register("firstName")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
                placeholder="First Name"
              />
              {errors?.firstName && (
                <p className="text-red-500 text-sm">
                  {errors?.firstName?.message}
                </p>
              )}
            </div>
            <div className="">
              <label className="text-base font-normal mb-2 block text-primary">
                Last Name *
              </label>
              <input
                {...register("lastName")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
                placeholder="Last Name"
              />
              {errors?.lastName && (
                <p className="text-red-500 text-sm">
                  {errors?.lastName?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-base font-normal mb-2 block text-primary">
              Phone Number *
            </label>
            <input
              {...register("phoneNumber")}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
              placeholder="Ex : 010 15 800 24 8"
            />
            {errors?.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors?.phoneNumber?.message}
              </p>
            )}
          </div>
          <div className="">
            <label className="text-base font-normal mb-2 block text-primary">
              Email *
            </label>
            <input
              {...register("email")}
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
              placeholder="Your Email here"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors?.email?.message}</p>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="text-base font-normal mb-2 block text-primary">
                Password *
              </label>
              <input
                {...register("password")}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
                placeholder="***************"
              />
              {errors?.password && (
                <p className="text-red-500 text-sm">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-base font-normal mb-2 block text-primary">
                Confirm Password *
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
                placeholder="***************"
              />
              {errors?.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0  mt-1"
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm cursor-pointer"
            >
              By creating an account on MedLearn Hub, you agree to our{" "}
              <a href="/sign-up" className="font-bold text-primary underline">
                Privacy Policy
              </a>
              . Please read these terms carefully.
            </label>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit(RegisterUser)}
              disabled={isSubmitting}
              className="w-full py-2 px-6 text-lg tracking-wide font-bold rounded-md text-white bg-primary"
            >
              {isSubmitting ? "Signing up..." : "Join Now"}
            </button>
          </div>
          <div className="w-full flex justify-center mt-2">
            <span>
              Do you have an account?
              <Link
                to={"/sign-in"}
                className="ml-2 font-bold underline text-primary"
              >
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
