import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "./postCard";
import CreatePostBox from "./createPostBox";
import CardSkeleton from "../../components/CardSekelton/CardSkeleton";
import { motion } from "framer-motion";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [notFound, setNotFound] = useState(false);

  // debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  // fetch posts (FIXED)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5000/posts?page=${page}&limit=8&search=${debouncedSearch}`
        );

        const data = await res.json();

        const safePosts = Array.isArray(data.posts) ? data.posts : [];

        setPosts(safePosts);
        setTotalPages(data.totalPages || 1);

        setNotFound(safePosts.length === 0);
      } catch (err) {
        console.log(err);
        setPosts([]);
        setNotFound(true);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [page, debouncedSearch]);

  if (loading) return <CardSkeleton />;

  return (
    <div>

      {/* SEARCH UI */}
      <CreatePostBox
        search={search}
        setSearch={(value) => {
          setPage(1);      // reset page on search
          setSearch(value);
        }}
        setPage={setPage}
        loading={loading}
      />

      {/* EMPTY STATE */}
      {notFound && !loading && (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🔍</div>
          <h2 className="text-xl font-semibold">No posts found</h2>
          <p className="text-gray-500 mt-2">
            Try different keywords
          </p>
        </div>
      )}

      {/* POSTS */}
      {!notFound && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="btn btn-sm"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Home;