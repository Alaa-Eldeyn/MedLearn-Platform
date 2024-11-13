import { useEffect, useState } from "react";
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
import { getLatestItems } from "../utils/Home";
import ScrollUp from "../components/ScrollUp";

const Home = () => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    const fetchItems = async () => {
      let res = await getLatestItems();
      if (res?.isSuccess) {
        setItems(res?.data);
      }
    };
    fetchItems();
  }, []);
  return (
    <div className="bg-gray-50">
      <ScrollUp />
      <Header />
      <Hero />
      <WhyUs />
      <Courses courses={items?.recentCoursesDTOs} />
      <Quizzes />
      <Blogs blogs={items?.recentblogsDTOs} />
      <Books books={items?.recentBooksDTOs} />
      <Footer />
    </div>
  );
};

export default Home;
