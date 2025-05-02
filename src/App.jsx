import { Route, Routes } from "react-router-dom";
import {
  AboutUs,
  AllCourses,
  Blogs,
  Books,
  Exams,
  Home,
  MyCourses,
  Profile,
  TermsOfService,
} from "./pages";
import { ForgetPass, Login, Register, ResetPass } from "./components/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedLayout from "./components/SharedLayout";
import Privacy from "./pages/Privacy";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import { Details, EditCourse, ViewCourse } from "./components/Courses";
import ViewBlog from "./components/Blogs/ViewBlog";
import { FreeTest, PremiumTest } from "./components/Exams";

function App() {
  const location = useLocation();
  //preline config
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
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/about-us" element={<AboutUs />} />
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
          <Route path="courses/:name/:id" element={<Details />} />
          <Route path="update-course/:id" element={<EditCourse />} />
          <Route path="books" element={<Books />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<ViewBlog />} />
          <Route path="free-exams" element={<Exams isFree={true} />} />
          <Route path="free-exams/:id/:duration" element={<FreeTest />} />
          <Route path="premium-exams" element={<Exams isFree={false} />} />
          <Route path="premium-exams/:id/:duration" element={<PremiumTest />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
