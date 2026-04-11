import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreatePost = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
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

      //const res = await axiosSecure.post("/posts", postData); 
      const res=await fetch("http://localhost:5000/posts",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const result = await res.json();

      if (result.insertedId) {
        Swal.fire("Success 🚀", "Post created!", "success");

        setTitle("");
        setDescription("");
        setTags("");
        setImage(null);
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingPost(false);
    }
    console.log("TOKEN:", await user.getIdToken());
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">

        <input
          className="input input-bordered w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="file"
          className="file-input w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="btn btn-primary w-full">
          {loadingPost ? "Posting..." : "Create Post"}
        </button>

      </form>
    </div>
  );
};

export default CreatePost;