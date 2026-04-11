import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "./postCard";
import CreatePostBox from "./createPostBox";



const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
      <CreatePostBox></CreatePostBox>
    </div>
  );
};

export default Home;