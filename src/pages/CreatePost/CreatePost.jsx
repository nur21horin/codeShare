import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreatePost = () => {
  const { user, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const uploadImageToImageBB = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire("Error", "Please login first", "error");
    }

    try {
      setLoadingPost(true);

      let imageUrl = "";
      if (image) imageUrl = await uploadImageToImageBB();

      const postData = {
        problem_name: title,
        description,
        image: imageUrl,
        tags: tags.split(",").map((t) => t.trim()),
      };

      const res = await fetch(
        "https://codesharebackend-1.onrender.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
          body: JSON.stringify(postData),
        }
      );

      const result = await res.json();

      if (result.insertedId) {
        Swal.fire("Success 🚀", "Post created successfully!", "success");

        setTitle("");
        setDescription("");
        setTags("");
        setImage(null);

        navigate("/");
      } else {
        Swal.fire("Error", "Failed to create post", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-card border border-muted shadow-lg rounded-2xl p-6 space-y-5"
      >

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center text-primary">
          Create CP Solution Post 🚀
        </h1>

        {/* TITLE */}
        <input
          className="w-full px-3 py-2 rounded-lg bg-bg border border-muted text-text placeholder:text-muted focus:outline-none"
          placeholder="Problem Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          className="w-full px-3 py-2 rounded-lg bg-bg border border-muted text-text placeholder:text-muted h-32 focus:outline-none"
          placeholder="Explain your solution / approach..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* TAGS */}
        <input
          className="w-full px-3 py-2 rounded-lg bg-bg border border-muted text-text placeholder:text-muted focus:outline-none"
          placeholder="Tags (e.g. dp, graph, greedy)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-sm text-muted"
        />

        {/* TIP BOX */}
        <div className="p-4 rounded-xl bg-bg border border-muted text-sm text-muted">
          💡 Tip: Add clear explanation, edge cases, and optimized approach.
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loadingPost}
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          {loadingPost ? "Publishing..." : "Publish Post"}
        </motion.button>

      </motion.div>

    </div>
  );
};

export default CreatePost;