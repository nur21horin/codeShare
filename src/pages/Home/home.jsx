import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH POSTS ----------------
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await axiosSecure.get("/posts");

      setPosts(res.data);
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to load posts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ---------------- LIKE POST ----------------
  const handleLike = async (postId) => {
    try {
      await axiosSecure.patch(`/posts/like/${postId}`);
      fetchPosts(); // refresh
    } catch (err) {
      Swal.fire("Error", "Like failed", "error");
    }
  };

  // ---------------- UI ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        📰 News Feed
      </h1>

      {/* EMPTY STATE */}
      {posts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No posts yet. Be the first to post 🚀
        </div>
      )}

      {/* POSTS */}
      <div className="space-y-6 max-w-2xl mx-auto">

        {posts.map((post) => (
          <div
            key={post._id}
            className="card bg-base-100 shadow-xl"
          >

            {/* USER INFO */}
            <div className="flex items-center gap-3 p-4 border-b">
              <img
                src={
                  post.user_photo ||
                  "https://i.ibb.co/2s3zLZP/default-avatar.png"
                }
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold">
                  {post.user_name || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-3">

              <h2 className="text-xl font-bold">
                {post.problem_name}
              </h2>

              <p className="text-gray-700">
                {post.description}
              </p>

              {/* IMAGE */}
              {post.image && (
                <img
                  src={post.image}
                  className="rounded-lg w-full max-h-[400px] object-cover"
                />
              )}

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="badge badge-outline"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-between pt-3 border-t">

                <button
                  onClick={() => handleLike(post._id)}
                  className="btn btn-sm btn-outline"
                >
                  ❤️ Like ({post.likes?.length || 0})
                </button>

                <button className="btn btn-sm btn-primary">
                  💬 Comment
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;
