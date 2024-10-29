import {
  Blogs,
  Books,
  Courses,
  Footer,
  Header,
  Hero,
  Quizzes,
  WhyUs,
} from "../components/Home";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <Hero />
      <WhyUs />
      <Courses />
      <Quizzes />
      <Blogs />
      <Books />
      <Footer />
    </div>
  );
};

export default Home;
