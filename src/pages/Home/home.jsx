import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "./postCard";
import CreatePostBox from "./createPostBox";
import CardSkeleton from "../../components/CardSekelton/CardSkeleton";



const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   axiosSecure.get("/posts")
  //     .then(res => {
  //       setPosts(res.data);
  //     })
  //     .catch(err => console.log(err))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
  setLoading(true);

  fetch(`http://localhost:5000/posts?page=${page}&limit=8`)
    .then(res => res.json())
    .then(data => {
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setLoading(false);
    });
}, [page]);

  if (loading) {
    return <CardSkeleton></CardSkeleton>
  }

  return (
    <div>
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
    <div className="flex justify-center mt-6 gap-2">

  {/* PREV */}
  <button
    disabled={page === 1}
    onClick={() => setPage(prev => prev - 1)}
    className="btn btn-sm"
  >
    Prev
  </button>

  {/* PAGE NUMBERS */}
  {[...Array(totalPages).keys()].map(num => (
    <button
      key={num}
      onClick={() => setPage(num + 1)}
      className={`btn btn-sm ${
        page === num + 1 ? "btn-primary" : ""
      }`}
    >
      {num + 1}
    </button>
  ))}

  {/* NEXT */}
  <button
    disabled={page === totalPages}
    onClick={() => setPage(prev => prev + 1)}
    className="btn btn-sm"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default Home;