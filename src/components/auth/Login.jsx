import { Link } from "react-router-dom";
import login from "../../assets/login.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logIn, signInSchema } from "../../utils/auth";
import { addToken, addUser } from "../../utils/LocalStorage";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const handleLogin = async (data) => {
    let res = await logIn(data);
    if (res?.isSuccess) {
      addUser(res?.data);
      addToken(res?.token);
      window.location.href = "/";
    }
  };
  return (
    <>
      <div className="min-h-screen center bg-slate-100 py-4 sm:py-0">
        <div className="rounded-3xl grid gap-5 grid-cols-1 md:grid-cols-2 items-center p-5 bg-white container max-w-[60rem] w-full">
          <div className="rounded-3xl p-4 !hidden md:!flex center bg-gradient-to-b from-[#59248E] to-99% to-[#AC59FF] w-full h-full">
            <img src={login} alt="hero image" />
            <div className="absolute bg-[#0f0f0f28] w-36 h-5 rounded-full blur bottom-40"></div>
          </div>
          <form className="py-10 w-full">
            <div className="text-center w-full mx-auto">
              <span className="text-secondary">Welcome to</span>
              <h3 className="text-primary text-2xl font-bold max-md:text-center">
                Practice 2 Pass 
              </h3>
            </div>
            <div className="my-6">
              <div>
                <label className="text-base font-normal mb-2 block text-primary">
                  Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
                  placeholder="Enter Email"
                />
                {errors?.email && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="text-base font-normal mb-2 block text-primary">
                Password *
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("password")}
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-primary"
                  placeholder="Enter Password"
                />
              </div>
              {errors?.password && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <Link to={"/Forget-pass"} className=" block mt-5 font-bold">
              Forget Password?
            </Link>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit(handleLogin)}
                disabled={isSubmitting}
                className="w-full py-2 px-6 text-lg tracking-wide font-bold rounded-xl text-white bg-primary focus:outline-none soft"
              >
                Sign In
              </button>
              <div className="w-full flex justify-center my-6 font-bold text-lg">
                <span>
                  Don’t have an account?
                  <Link
                    to={"/sign-up"}
                    className="ml-2 font-bold underline text-primary"
                  >
                    Join Now
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
