import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const PostCard = ({ post }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [likes, setLikes] = useState(post.likes?.length||0);
  const [comments,setComments]=useState(post.comments?.length||0);
  const [commentText,setCommentText]=useState("");
  

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:5000/posts/like/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          
        },
        //body: JSON.stringify({ userId: "dummyUserId" })

      });
      const result = await res.json();

    if (result.message === "Liked") {
      setLikes((prev) => prev + 1);
    } else if (result.message === "Unliked") {
      setLikes((prev) => Math.max(prev - 1, 0));
    } else {
      console.log("Error liking/unliking post:", result.message);
    }
      //setLikes(prev => prev + 1);
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