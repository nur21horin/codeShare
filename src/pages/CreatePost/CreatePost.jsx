import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreatePost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload image to ImgBB
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

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire("Error", "Please login first", "error");
    }

    if (!title || !description) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    try {
      setLoading(true);

      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImageToImageBB();
      }

      const tagArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const postData = {
        problem_name: title,
        description,
        image: imageUrl,
        tags: tagArray,
      };

      console.log("Sending post:", postData);

      // ✅ NO manual token needed
      const res = await axiosSecure.post("/posts", postData);

      if (res.data.insertedId) {
        Swal.fire("Success 🚀", "Post created successfully!", "success");

        setTitle("");
        setDescription("");
        setTags("");
        setImage(null);
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            🚀 Create New Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">

            <input
              type="text"
              placeholder="Problem Title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write your problem / solution..."
              className="textarea textarea-bordered w-full"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="input input-bordered w-full"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}

            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Posting..." : "Create Post"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default CreatePost;