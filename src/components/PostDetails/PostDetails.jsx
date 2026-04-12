import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* IMAGE GALLERY */}
      <img src={post.image} className="w-full rounded-xl mb-4" />

      {/* TITLE */}
      <h1 className="text-2xl font-bold">{post.problem_name}</h1>

      {/* META */}
      <p className="text-gray-500 text-sm">
        By {post.user_name} | {new Date(post.created_at).toLocaleString()}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-4">{post.description}</p>

      {/* EXTRA SECTION */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg">Details</h2>
        <p>Tags: {post.tags?.join(", ")}</p>
      </div>

      {/* RELATED POSTS (optional) */}
      <div className="mt-8">
        <h2 className="font-semibold">Related Posts</h2>
      </div>
    </div>
  );
};

export default PostDetails;