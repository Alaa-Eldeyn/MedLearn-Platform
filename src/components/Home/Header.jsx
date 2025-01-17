import { Link, useNavigate } from "react-router-dom";
import { getToken, getUser, removeUser } from "../../utils/LocalStorage";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    if (checkUser()) {
      removeUser();
      setUser(null);
    } else {
      setUser(getUser());
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const checkUser = () => {
    if (!token) return true;

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) return true;

    const payload = JSON.parse(atob(tokenParts[1]));

    const expirationDate = payload.exp * 1000;

    const currentDate = Date.now();

    return currentDate > expirationDate;
  };

  const handleLogout = () => {
    removeUser();
    setUser(null);
    navigate("/");
  };

  return (
    <header
      className={`fixed flex flex-wrap sm:justify-start sm:flex-nowrap w-full z-50 text-sm min-h-18 soft ${
        isScrolled ? "bg-[#1E0C2F]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[85rem] w-full mx-auto px-4 py-4 flex flex-wrap basis-full items-center justify-between gap-y-3">
        <Link
          className="order-0 flex-none text-lg sm:text-3xl font-extrabold focus:outline-none focus:opacity-80 text-[#8347be]"
          to="/"
        >
          {`Practice 2 Pass`}
        </Link>
        <div className="md:order-3 flex items-center gap-x-2 relative">
          {user ? (
            <>
              <button
                type="button"
                className="flex items-center gap-x-2 text-sm font-medium rounded-lg text-white shadow-sm focus:outline-none"
                onClick={toggleDropdown}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
              >
                {user?.imageUrl ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${user.imageUrl}`}
                    alt="User"
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <Icon icon="gridicons:user-circle" className="w-7 h-7" />
                )}
                <span className="text-xs sm:text-md">
                  {user?.firstName} {user?.lastName}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>

              {/* قائمة الخيارات */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg transition-all duration-300 ${
                  isDropdownOpen
                    ? "!opacity-100 !translate-y-20 !visible"
                    : "!opacity-0 !translate-y-24 !invisible"
                }`}
                role="menu"
              >
                <div className="p-1">
                  <Link
                    to="/academy/profile"
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-gray-50 focus:outline-none"
                  >
                    <Icon
                      icon="solar:user-linear"
                      className="bg-purple-100 w-8 h-8 p-1 rounded-lg"
                    /> 
                    My Profile
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-50 focus:outline-none"
                    onClick={handleLogout}
                  >
                    <Icon
                      icon="hugeicons:logout-03"
                      className="bg-red-100 w-8 h-8 p-1 rounded-lg"
                    />Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="py-2 px-3 hidden lg:inline-flex items-center gap-x-2 text-lg font-medium rounded-lg border border-transparent text-white shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="py-2 px-3 hidden lg:inline-flex items-center gap-x-2 text-lg font-medium rounded-lg border border-secondary text-secondary shadow-sm  focus:outline-none  disabled:opacity-50 disabled:pointer-events-none"
              >
                Get Started
              </Link>
            </>
          )}

          <button
            type="button"
            className="md:hidden hs-collapse-toggle relative size-8 center !gap-x-2 rounded-lg border border-gray-200 bg-[#1E0C2F] text-white shadow-sm  focus:outline-none  disabled:opacity-50 disabled:pointer-events-none"
            id="hs-navbar-alignment-collapse"
            aria-expanded="false"
            aria-controls="hs-navbar-alignment"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-navbar-alignment"
          >
            <svg
              className="hs-collapse-open:hidden shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              className="hs-collapse-open:block hidden shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Toggle</span>
          </button>
        </div>
        <div
          id="hs-navbar-alignment"
          className={`hs-collapse hidden overflow-hidden soft basis-full grow sm:grow-0 sm:basis-auto rounded-lg md:block sm:order-2 text-lg bg-primary sm:bg-transparent`}
          aria-labelledby="hs-navbar-alignment-collapse"
        >
          <div className="flex flex-col gap-5 xl:gap-10 sm:flex-row sm:items-center sm:mt-0 sm:ps-5 p-5 sm:p-0">
            <Link
              className="font-medium text-white focus:outline-none"
              to="/"
              aria-current="page"
            >
              Home
            </Link>
            <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] ">
              <button
                id="hs-navbar-example-dropdown"
                type="button"
                className="hs-dropdown-toggle flex items-center w-full text-gray-300 hover:text-gray-100 focus:outline-none focus:text-gray-100 font-medium"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Mega Menu"
              >
                Courses
                <svg
                  className="hs-dropdown-open:rotate-180 ml-2 size-4 soft"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] ease-in-out duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-primary sm:shadow-md rounded-lg p-1 space-y-1 before:absolute top-full sm:border border-transparent before:-top-5 before:start-0 before:w-full before:h-5 hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-navbar-example-dropdown"
              >
                <Link
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-white hover:bg-[#543277] focus:outline-none"
                  to="/academy/courses"
                >
                  All Courses
                </Link>

                <Link
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-white hover:bg-[#543277] focus:outline-none"
                  to="/academy/my-courses"
                >
                  My Courses
                </Link>
              </div>
            </div>
            <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] ">
              <button
                id="hs-navbar-example-dropdown"
                type="button"
                className="hs-dropdown-toggle flex items-center w-full text-gray-300 focus:outline-none font-medium"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Mega Menu"
              >
                Exams (Q&A)
                <svg
                  className="hs-dropdown-open:rotate-180 ml-2 size-4 soft"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] ease-in-out duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-primary sm:shadow-md rounded-lg p-1 space-y-1 before:absolute top-full sm:border border-transparent before:-top-5 before:start-0 before:w-full before:h-5 hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-navbar-example-dropdown"
              >
                <Link
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-white hover:bg-[#543277] focus:outline-none focus:bg-[#543277]"
                  to="/academy/free-exams"
                >
                  Free Exams
                </Link>

                <Link
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-white hover:bg-[#543277] focus:outline-none focus:bg-[#543277]"
                  to="/academy/premium-exams"
                >
                  Premium Exams
                </Link>
              </div>
            </div>
            <Link
              className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none focus:text-gray-100"
              to="/academy/blogs"
            >
              Blogs
            </Link>
            <Link
              className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none focus:text-gray-100"
              to="/academy/books"
            >
              Medical Books
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
