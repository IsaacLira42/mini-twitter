import { PostList } from "../../components/post/PostList";

const TimelinePage = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col max-w-160 w-full">
        <PostList />
      </div>
    </div>
  );
};

export default TimelinePage;
