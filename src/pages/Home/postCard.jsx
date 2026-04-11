import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PostCard = ({ post }) => {
  const axiosSecure = useAxiosSecure();
  const [likes, setLikes] = useState(post.likes.length);

  const handleLike = async () => {
    try {
      await axiosSecure.patch(`/posts/like/${post._id}`);
      setLikes(prev => prev + 1); // simple update
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-base-100 shadow-md rounded-xl p-4 space-y-3">

      {/* USER INFO */}
      <div className="flex items-center gap-3">
        <img
          src={post.user_photo || "https://i.ibb.co/2kR6z6n/user.png"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{post.user_name}</h3>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-bold">{post.problem_name}</h2>

      {/* DESCRIPTION */}
      <p>{post.description}</p>

      {/* IMAGE */}
      {post.image && (
        <img
          src={post.image}
          className="w-full rounded-lg max-h-96 object-cover"
        />
      )}

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag, i) => (
          <span key={i} className="badge badge-outline">
            #{tag}
          </span>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center pt-2 border-t">

        <button
          onClick={handleLike}
          className="btn btn-sm btn-outline"
        >
          👍 Like ({likes})
        </button>

        <button className="btn btn-sm btn-outline">
          💬 Comment
        </button>

      </div>
    </div>
  );
};

export default PostCard;