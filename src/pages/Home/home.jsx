import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "./postCard";
import CreatePostBox from "./createPostBox";
import CardSkeleton from "../../components/CardSekelton/CardSkeleton";
import { motion } from "framer-motion";
import SortDropdown from "./Options";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const options = [
  { label: "Newest", value: "newest" },

  { label: "Popular", value: "popular" },

];

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [notFound, setNotFound] = useState(false);

  const [sortBy, setSortBy] = useState("newest");
  const [tag, setTag] = useState("");
  const [dateSort, setDateSort] = useState("");

  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // fetch
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page,
          limit: 8,
          search: debouncedSearch,
          sortBy,
          tag,
          dateSort,
        });

        const res = await fetch(
          `https://codesharebackend-1.onrender.com/posts?${query.toString()}`
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
  }, [page, debouncedSearch, sortBy, tag, dateSort]);

  if (loading) return <CardSkeleton />;

  return (
    <div className="min-h-screen bg-bg text-text px-4 py-6">

      {/* SEARCH */}
      <div className="mb-4">
        <CreatePostBox
          search={search}
          setSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
          setPage={setPage}
          loading={loading}
        />
      </div>

      {/* SORT + FILTER */}
      <div className="flex gap-2 mb-6">

  {options.map((opt) => (
    <button
      key={opt.value}
      onClick={() => {
        setSortBy(opt.value);
        setPage(1);
      }}
      className={`
        px-4 py-2 rounded-full text-sm transition
        border border-muted
        ${
          sortBy === opt.value
            ? "bg-primary text-white shadow-md"
            : "bg-card text-text hover:bg-muted"
        }
      `}
    >
      {opt.label}
    </button>
  ))}
  

</div>

      {/* EMPTY */}
      {notFound && !loading && (
        <div className="text-center py-12 text-muted">
          🔍 No posts found
        </div>
      )}

      {/* POSTS */}
      {!notFound && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
              className="bg-card  rounded-xl p-3 hover:shadow-amber-900 transition"
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* PAGINATION */}
    <div className="flex justify-center mt-8 items-center gap-3">

  {/* PREV BUTTON */}
  <motion.button
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
    className="
      flex items-center gap-1
      px-3 py-2 rounded-lg
      bg-card text-text border border-muted
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-muted transition
    "
  >
    <FaChevronLeft />
    Prev
  </motion.button>

  {/* PREVIOUS PAGE NUMBER */}
  {page > 1 && (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setPage(page - 1)}
      className="
        px-3 py-2 rounded-lg
        border border-muted
        bg-card text-text
        hover:bg-muted transition
      "
    >
      {page - 1}
    </motion.button>
  )}

  {/* CURRENT PAGE */}
  <motion.button
    animate={{ scale: 1.1 }}
    className="
      px-3 py-2 rounded-lg
      bg-primary text-white shadow-lg
    "
  >
    {page}
  </motion.button>

  {/* NEXT PAGE NUMBER */}
  {page < totalPages && (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setPage(page + 1)}
      className="
        px-3 py-2 rounded-lg
        border border-muted
        bg-card text-text
        hover:bg-muted transition
      "
    >
      {page + 1}
    </motion.button>
  )}

  {/* NEXT BUTTON */}
  <motion.button
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    disabled={page === totalPages}
    onClick={() => setPage((p) => p + 1)}
    className="
      flex items-center gap-1
      px-3 py-2 rounded-lg
      bg-card text-text border border-muted
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-muted transition
    "
  >
    Next
    <FaChevronRight />
  </motion.button>

</div>

    </div>
  );
};

export default Home;