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
      <div className="min-h-screen flex items-center justify-center bg-base-200">
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
      {
        method: "POST",
        body: formData,
      }
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
      if (image) {
        imageUrl = await uploadImageToImageBB();
      }

      const postData = {
        problem_name: title,
        description,
        image: imageUrl,
        tags: tags.split(",").map((t) => t.trim()),
      };

      const res = await fetch("https://codesharebackend-1.onrender.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify(postData),
      });

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
      console.log(err);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300"
      >

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Create CP Solution Post 🚀
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            className="input input-bordered w-full"
            placeholder="Problem Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* DESCRIPTION */}
          <textarea
            className="textarea textarea-bordered w-full h-32"
            placeholder="Explain your solution / approach..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* TAGS */}
          <input
            className="input input-bordered w-full"
            placeholder="Tags (e.g. dp, graph, greedy)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* IMAGE */}
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* PREVIEW CARD */}
          <div className="p-4 bg-base-200 rounded-xl text-sm text-base-content/70">
            💡 Tip: Add clear explanation, edge cases, and optimized approach.
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loadingPost}
            className="btn btn-primary w-full"
          >
            {loadingPost ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Publish Post"
            )}
          </motion.button>

        </form>

      </motion.div>
    </div>
  );
};

export default CreatePost;