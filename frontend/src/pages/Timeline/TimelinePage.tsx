import { PostList } from "../../components/post/PostList";
import { Footer } from "../../components/ui/Footer";
import { Navbar } from "../../components/ui/Navbar";

const TimelinePage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-9 flex justify-center min-h-screen">
        <div className="flex flex-col max-w-160 w-full">
          <PostList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TimelinePage;
