import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "./postCard";
import CreatePostBox from "./createPostBox";
import CardSkeleton from "../../components/CardSekelton/CardSkeleton";



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
    return <CardSkeleton></CardSkeleton>
  }

  return (
    <div className=" mx-auto py-6 px-6 space-y-6 grid gap-6 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
      <CreatePostBox></CreatePostBox>
    </div>
  );
};

export default Home;