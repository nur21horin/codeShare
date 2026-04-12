import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // NOT FOUND
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-error font-semibold">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300"
      >

        {/* IMAGE */}
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={post.image || "https://i.ibb.co/2kR6z6n/user.png"}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 space-y-4">

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-primary">
            {post.problem_name}
          </h1>

          {/* META */}
          <p className="text-sm text-base-content/60">
            👤 {post.user_name} •{" "}
            {new Date(post.created_at).toLocaleString()}
          </p>

          {/* DESCRIPTION */}
          <p className="text-base-content/80 leading-relaxed">
            {post.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                className="badge badge-outline badge-primary"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* DETAILS BOX */}
          <div className="bg-base-200 p-4 rounded-xl border border-base-300">
            <h2 className="font-semibold mb-2">📌 Details</h2>
            <p className="text-sm text-base-content/70">
              This solution is shared for learning competitive programming
              techniques, optimization strategies, and algorithmic thinking.
            </p>
          </div>

          {/* RELATED SECTION (UI ONLY) */}
          <div>
            <h2 className="font-semibold text-lg mb-2">
              🔗 Related Posts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="h-24 bg-base-200 rounded-xl animate-pulse"></div>
              <div className="h-24 bg-base-200 rounded-xl animate-pulse"></div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default PostDetails;