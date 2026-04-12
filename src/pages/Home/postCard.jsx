import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/comments/${post._id}`
      );
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchComments();
    }, 5000);
    return () => clearInterval(interval);
  }, [post._id]);

  const handleLike = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/posts/like/${post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (result.message === "Liked") {
        setLikes((prev) => prev + 1);
      } else if (result.message === "Unliked") {
        setLikes((prev) => Math.max(prev - 1, 0));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    if (!commentText) return;

    try {
      await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({
          post_id: post._id,
          text: commentText,
        }),
      });

      setComments((prev) => [
        {
          _id: Date.now(),
          post_id: post._id,
          text: commentText,
          user_email: user?.email,
          created_at: new Date(),
        },
        ...prev,
      ]);

      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
      });

      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-base-100 shadow-md rounded-2xl overflow-hidden flex flex-col h-[500px]">

      {/* IMAGE */}
      <img
        src={post.image || "https://i.ibb.co/2kR6z6n/user.png"}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">

        {/* USER INFO */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.user_photo || "https://i.ibb.co/2kR6z6n/user.png"}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="text-sm font-semibold">{post.user_name}</h3>
            <p className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="font-bold text-lg line-clamp-1">
          {post.problem_name}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {post.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-1 mt-2">
          {post.tags?.slice(0, 3).map((tag, i) => (
            <span key={i} className="badge badge-outline text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* META */}
        <div className="text-xs text-gray-500 mt-2">
          👍 {likes} Likes • 💬 {comments.length} Comments
        </div>

        {/* ACTIONS */}
        <div className="mt-auto space-y-2">

          {/* LIKE + COMMENT */}
          <div className="flex gap-2 items-center">
            <button
              onClick={handleLike}
              className="btn btn-xs btn-outline"
            >
              👍 Like
            </button>

            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="input input-bordered input-xs w-full"
              placeholder="Comment..."
            />

            <button
              onClick={handleComment}
              className="btn btn-xs btn-primary"
            >
              Post
            </button>
          </div>

          {/* VIEW DETAILS BUTTON */}
          <Link to={`/post/${post._id}`}>
            <button className="btn btn-sm btn-primary w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;