import { Route, Routes } from "react-router-dom";
import { AllCourses, Blogs, Books, Exams, Home, MyCourses } from "./pages";
import { ForgetPass, Login, Register, ResetPass } from "./components/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedLayout from "./components/SharedLayout";
import Privacy from "./pages/Privacy";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import { Details, EditCourse, ViewCourse } from "./components/Courses";
import ViewBlog from "./components/Blogs/ViewBlog";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route
          path="/academy"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="courses" element={<AllCourses />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="my-courses/:id" element={<ViewCourse />} />
          <Route path="courses/:id" element={<Details />} />
          <Route path="update-course/:id" element={<EditCourse />} />
          <Route path="books" element={<Books />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<ViewBlog />} />
          <Route path="exams" element={<Exams />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
