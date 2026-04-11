import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

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

  // ADD COMMENT
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

      // instant UI update
      setComments((prev) => [
        {
          _id: Date.now(), // temp id
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

  // DELETE COMMENT
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
      {/* DESCRIPTION + IMAGE */}
      <p>{post.description}</p>
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
      <div className="mt-4 border-t pt-3">

        {/* LIKE + INPUT */}
        <div className="flex gap-2 items-center">
          <button
            onClick={handleLike}
            className="btn btn-sm btn-outline"
          >
            👍 Like ({likes})
          </button>

          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Write a comment..."
          />

          <button
            onClick={handleComment}
            className="btn btn-sm btn-primary"
          >
            Post
          </button>
        </div>

        {/* COMMENT COUNT */}
        <p className="text-sm mt-2 font-semibold">
          Comments: {comments?.length}
        </p>

        {/* COMMENT LIST */}
        <div className="mt-3 space-y-2">
          {loading ? (
            <p className="text-sm text-gray-400">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-400">No comments yet</p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="bg-base-200 p-2 rounded flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">{c.text}</p>
                  <p className="text-xs text-gray-500">
                    {c.user_email}
                  </p>
                </div>

                {c.user_email === user?.email && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;